import { useState, useEffect } from 'react'
import { TrendingDown, Calendar, Users, Zap, Receipt, IndianRupee } from 'lucide-react'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/currency'
import { db } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [householdSize, setHouseholdSize] = useState(4) // Default to 4

  useEffect(() => {
    if (user) {
      loadBills()
      loadHousehold()
    }
  }, [user])

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

  const loadHousehold = async () => {
    try {
      const household = await db.households.get(user.id)
      if (household && household.members) {
        setHouseholdSize(household.members)
      }
    } catch (error) {
      console.error('Error loading household:', error)
    }
  }

  // Calculate stats from bills
  const totalExpenses = bills.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0)
  
  // Get bills due this week
  const now = new Date()
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const billsDueThisWeek = bills.filter(bill => {
    if (bill.status !== 'pending') return false
    const dueDate = new Date(bill.due_date)
    return dueDate >= now && dueDate <= oneWeekFromNow
  })
  
  const upcomingBills = bills
    .filter(bill => bill.status === 'pending')
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 3)

  // Calculate category breakdown from real data
  const categoryData = bills.reduce((acc, bill) => {
    const existing = acc.find(item => item.name === bill.category)
    if (existing) {
      existing.value += parseFloat(bill.amount || 0)
    } else {
      acc.push({
        name: bill.category,
        value: parseFloat(bill.amount || 0),
        color: getCategoryColor(bill.category)
      })
    }
    return acc
  }, [])

  // Calculate monthly trend from real bills (group by month)
  const monthlyTrend = bills.reduce((acc, bill) => {
    const date = new Date(bill.due_date)
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const monthKey = date.toLocaleDateString('en-US', { month: 'short' })
    
    const existing = acc.find(item => item.month === monthKey)
    if (existing) {
      existing.amount += parseFloat(bill.amount || 0)
    } else {
      acc.push({
        month: monthKey,
        amount: parseFloat(bill.amount || 0),
        fullDate: date
      })
    }
    return acc
  }, [])
  .sort((a, b) => a.fullDate - b.fullDate)
  .slice(-6) // Last 6 months

  // Calculate potential savings based on Smart Insights logic
  const calculatePotentialSavings = () => {
    let totalSavings = 0
    const categoryAverages = {}
    
    // Calculate average per category
    bills.forEach(bill => {
      if (!categoryAverages[bill.category]) {
        categoryAverages[bill.category] = { total: 0, count: 0 }
      }
      categoryAverages[bill.category].total += parseFloat(bill.amount)
      categoryAverages[bill.category].count += 1
    })
    
    // Calculate savings potential based on category-specific percentages
    Object.entries(categoryAverages).forEach(([category, data]) => {
      const avgAmount = data.total / data.count
      let savingsPercent = 0
      
      switch(category) {
        case 'Electricity':
          savingsPercent = 0.15 // 15% with LED bulbs
          break
        case 'Water':
          savingsPercent = 0.30 // 30% with efficient fixtures
          break
        case 'Gas':
          savingsPercent = 0.10 // 10% with efficient heating
          break
        case 'Internet':
          savingsPercent = 0.20 // 20% by reviewing plans
          break
        default:
          savingsPercent = 0.10 // 10% general savings
      }
      
      totalSavings += avgAmount * savingsPercent
    })
    
    return totalSavings
  }

  const potentialSavings = calculatePotentialSavings()

  // Calculate last month expenses for comparison
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
  
  const lastMonthExpenses = bills
    .filter(bill => {
      const billDate = new Date(bill.due_date)
      return billDate >= lastMonth && billDate <= lastMonthEnd
    })
    .reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0)

  const savingsPercent = lastMonthExpenses > 0 
    ? ((lastMonthExpenses - totalExpenses) / lastMonthExpenses * 100).toFixed(1)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header - Responsive */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">Dashboard</h1>
        <p className="text-sm sm:text-base text-neutral-500 mt-1">Welcome back! Here's your household overview</p>
      </div>

      {/* Stats Cards - Responsive Grid with Interactive Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="stat-card group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Expenses</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{formatCurrency(totalExpenses)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-secondary transition-transform group-hover:scale-110" />
                <span className="text-sm text-secondary font-medium">{savingsPercent}% vs last month</span>
              </div>
            </div>
            <div className="stat-icon w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="stat-card group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Upcoming Bills</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{billsDueThisWeek.length}</p>
              <p className="text-sm text-neutral-500 mt-2">Due this week</p>
            </div>
            <div className="stat-icon w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="stat-card group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Cost per Resident</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{formatCurrency(totalExpenses / householdSize)}</p>
              <p className="text-sm text-neutral-500 mt-2">{householdSize} resident{householdSize !== 1 ? 's' : ''}</p>
            </div>
            <div className="stat-icon w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary to-secondary-dark text-white group cursor-pointer hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Potential Savings</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(potentialSavings)}</p>
              <p className="text-sm text-white/80 mt-2">Based on insights</p>
            </div>
            <div className="stat-icon w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Monthly Trend - Real Data */}
        <div className="card lg:col-span-2">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-3 sm:mb-4">Monthly Trend</h3>
          {monthlyTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <LineChart data={monthlyTrend}>
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-16 text-neutral-500">
              <p>No data available yet</p>
              <p className="text-sm mt-2">Add bills to see your monthly trend</p>
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-3 sm:mb-4">Category Breakdown</h3>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 sm:mt-4 space-y-2">
                {categoryData.slice(0, 3).map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-neutral-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-neutral-800">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-neutral-500">No data available</div>
          )}
        </div>
      </div>

      {/* Upcoming Bills - Responsive with Enhanced Interactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800">Upcoming Bills</h3>
          <button className="link-animated text-xs sm:text-sm text-primary hover:text-primary-dark font-medium">
            View All
          </button>
        </div>
        {upcomingBills.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {upcomingBills.map((bill) => (
              <div 
                key={bill.id} 
                className="card-clickable flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-neutral-50 rounded-lg hover:bg-white transition-all duration-300 gap-3 sm:gap-4 group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Receipt className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-800 text-sm sm:text-base truncate">{bill.category} - {bill.provider}</p>
                    <p className="text-xs sm:text-sm text-neutral-500">Due: {bill.due_date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <p className="font-semibold text-neutral-800 text-base sm:text-lg">{formatCurrency(bill.amount)}</p>
                  <span className="badge inline-block px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">No upcoming bills</div>
        )}
      </div>
    </div>
  )
}

function getCategoryColor(category) {
  const colors = {
    'Electricity': '#2563EB',
    'Water': '#3B82F6',
    'Gas': '#60A5FA',
    'Internet': '#93C5FD',
    'Rent': '#DBEAFE',
    'Groceries': '#10B981',
    'Maintenance': '#6B7280'
  }
  return colors[category] || '#6B7280'
}
