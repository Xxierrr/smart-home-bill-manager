import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Download, Calendar } from 'lucide-react'
import { formatCurrency } from '../utils/currency'
import { db } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

export default function Analytics() {
  const { user } = useAuth()
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('6months') // '6months', '1year', 'all'
  const [analytics, setAnalytics] = useState({
    averageMonthly: 0,
    highestCategory: { name: '', amount: 0 },
    totalSaved: 0,
    monthlyComparison: [],
    categoryBreakdown: [],
    categoryTrends: []
  })

  useEffect(() => {
    if (user) {
      loadBills()
    }
  }, [user])

  useEffect(() => {
    if (bills.length > 0) {
      calculateAnalytics()
    }
  }, [bills, timeRange])

  const loadBills = async () => {
    try {
      const data = await db.bills.getAll(user.id)
      setBills(data || [])
    } catch (error) {
      console.error('Error loading bills:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = () => {
    if (bills.length === 0) {
      setLoading(false)
      return
    }

    // Get date range
    const now = new Date()
    const monthsToShow = timeRange === '6months' ? 6 : timeRange === '1year' ? 12 : 24
    
    // Group bills by month
    const billsByMonth = {}
    const billsByCategory = {}
    
    bills.forEach(bill => {
      const billDate = new Date(bill.due_date)
      const monthKey = `${billDate.getFullYear()}-${String(billDate.getMonth() + 1).padStart(2, '0')}`
      const monthName = billDate.toLocaleDateString('en-US', { month: 'short' })
      
      // Group by month
      if (!billsByMonth[monthKey]) {
        billsByMonth[monthKey] = { month: monthName, total: 0, bills: [] }
      }
      billsByMonth[monthKey].total += parseFloat(bill.amount)
      billsByMonth[monthKey].bills.push(bill)
      
      // Group by category
      if (!billsByCategory[bill.category]) {
        billsByCategory[bill.category] = { category: bill.category, total: 0, count: 0, months: {} }
      }
      billsByCategory[bill.category].total += parseFloat(bill.amount)
      billsByCategory[bill.category].count += 1
      
      if (!billsByCategory[bill.category].months[monthName]) {
        billsByCategory[bill.category].months[monthName] = 0
      }
      billsByCategory[bill.category].months[monthName] += parseFloat(bill.amount)
    })
    
    // Calculate monthly comparison (last 6 months)
    const monthlyData = Object.values(billsByMonth)
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-monthsToShow)
    
    // Calculate average monthly
    const totalAmount = monthlyData.reduce((sum, m) => sum + m.total, 0)
    const averageMonthly = monthlyData.length > 0 ? totalAmount / monthlyData.length : 0
    
    // Find highest category
    const categoryData = Object.values(billsByCategory)
      .sort((a, b) => b.total - a.total)
    const highestCategory = categoryData[0] || { category: 'N/A', total: 0, count: 0 }
    
    // Calculate category breakdown for pie chart
    const categoryBreakdown = categoryData.map(cat => ({
      name: cat.category,
      value: cat.total,
      count: cat.count
    }))
    
    // Calculate savings (compare with previous period)
    const currentPeriodTotal = monthlyData.slice(-3).reduce((sum, m) => sum + m.total, 0)
    const previousPeriodTotal = monthlyData.slice(-6, -3).reduce((sum, m) => sum + m.total, 0)
    const totalSaved = previousPeriodTotal - currentPeriodTotal
    
    setAnalytics({
      averageMonthly,
      highestCategory: {
        name: highestCategory.category,
        amount: highestCategory.total / highestCategory.count
      },
      totalSaved,
      monthlyComparison: monthlyData,
      categoryBreakdown,
      categoryTrends: categoryData
    })
  }

  const handleExportReport = () => {
    // Create CSV content
    let csvContent = "SmartHome Bill Manager - Analytics Report\n\n"
    csvContent += "Generated on: " + new Date().toLocaleDateString('en-IN') + "\n\n"
    
    // Monthly Comparison
    csvContent += "Monthly Expenses\n"
    csvContent += "Month,Amount (₹)\n"
    analytics.monthlyComparison.forEach(row => {
      csvContent += `${row.month},${row.total.toFixed(2)}\n`
    })
    
    csvContent += "\n"
    
    // Category Breakdown
    csvContent += "Category Breakdown\n"
    csvContent += "Category,Total (₹),Count,Average (₹)\n"
    analytics.categoryTrends.forEach(row => {
      const avg = row.total / row.count
      csvContent += `${row.category},${row.total.toFixed(2)},${row.count},${avg.toFixed(2)}\n`
    })
    
    csvContent += "\n"
    
    // Summary
    const totalExpenses = analytics.monthlyComparison.reduce((sum, m) => sum + m.total, 0)
    
    csvContent += "Summary\n"
    csvContent += `Total Expenses,₹${totalExpenses.toFixed(2)}\n`
    csvContent += `Average Monthly,₹${analytics.averageMonthly.toFixed(2)}\n`
    csvContent += `Highest Category,${analytics.highestCategory.name}\n`
    csvContent += `Total Bills,${bills.length}\n`
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `analytics-report-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading analytics...</div>
      </div>
    )
  }

  if (bills.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Analytics</h1>
          <p className="text-neutral-500 mt-1">Detailed insights into your spending patterns</p>
        </div>
        <div className="card text-center py-12">
          <TrendingUp className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">No data available</h3>
          <p className="text-neutral-500">Add some bills to see analytics</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Analytics</h1>
          <p className="text-neutral-500 mt-1">Detailed insights into your spending patterns</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Last 6 Months
          </button>
          <button 
            onClick={handleExportReport}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-neutral-500">Average Monthly</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">{formatCurrency(analytics.averageMonthly)}</p>
          <div className="flex items-center gap-1 mt-3">
            {analytics.totalSaved >= 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-secondary" />
                <span className="text-sm text-secondary font-medium">
                  {formatCurrency(Math.abs(analytics.totalSaved))} saved
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500 font-medium">
                  {formatCurrency(Math.abs(analytics.totalSaved))} more
                </span>
              </>
            )}
          </div>
        </div>

        <div className="card">
          <p className="text-sm text-neutral-500">Highest Category</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">{analytics.highestCategory.name}</p>
          <p className="text-sm text-neutral-500 mt-3">{formatCurrency(analytics.highestCategory.amount)}/bill average</p>
        </div>

        <div className="card">
          <p className="text-sm text-neutral-500">Total Bills</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">{bills.length}</p>
          <p className="text-sm text-neutral-500 mt-3">{analytics.categoryBreakdown.length} categories</p>
        </div>
      </div>

      {/* Monthly Expenses Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={analytics.monthlyComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
              formatter={(value) => formatCurrency(value)}
            />
            <Bar dataKey="total" fill="#2563EB" name="Amount" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6">Category Details</h3>
          <div className="space-y-4">
            {analytics.categoryTrends.map((cat, index) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <p className="font-medium text-neutral-800">{cat.category}</p>
                    <p className="text-sm text-neutral-500">{cat.count} bills</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-800">{formatCurrency(cat.total)}</p>
                  <p className="text-sm text-neutral-500">{formatCurrency(cat.total / cat.count)}/bill</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



