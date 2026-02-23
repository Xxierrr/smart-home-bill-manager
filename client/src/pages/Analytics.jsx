import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Download, Calendar } from 'lucide-react'
import { formatCurrency } from '../utils/currency'

const monthlyComparison = [
  { month: 'Jan', current: 10250, previous: 11200 },
  { month: 'Feb', current: 9800, previous: 10500 },
  { month: 'Mar', current: 11200, previous: 11800 },
  { month: 'Apr', current: 9500, previous: 10200 },
  { month: 'May', current: 10800, previous: 11500 },
  { month: 'Jun', current: 9200, previous: 10300 },
]

const categoryTrends = [
  { category: 'Electricity', jan: 2800, feb: 2700, mar: 2900, apr: 2600, may: 2850, jun: 2500 },
  { category: 'Water', jan: 650, feb: 620, mar: 680, apr: 600, may: 650, jun: 620 },
  { category: 'Gas', jan: 1200, feb: 1150, mar: 1250, apr: 1100, may: 1200, jun: 1100 },
  { category: 'Internet', jan: 599, feb: 599, mar: 599, apr: 599, may: 599, jun: 599 },
]

export default function Analytics() {
  const handleExportReport = () => {
    // Create CSV content
    let csvContent = "SmartHome Bill Manager - Analytics Report\n\n"
    csvContent += "Generated on: " + new Date().toLocaleDateString('en-IN') + "\n\n"
    
    // Monthly Comparison
    csvContent += "Monthly Comparison\n"
    csvContent += "Month,Current Year (₹),Previous Year (₹),Savings (₹)\n"
    monthlyComparison.forEach(row => {
      const savings = row.previous - row.current
      csvContent += `${row.month},${row.current},${row.previous},${savings}\n`
    })
    
    csvContent += "\n"
    
    // Category Trends
    csvContent += "Category Trends\n"
    csvContent += "Category,Jan (₹),Feb (₹),Mar (₹),Apr (₹),May (₹),Jun (₹),Average (₹)\n"
    categoryTrends.forEach(row => {
      const avg = Math.round((row.jan + row.feb + row.mar + row.apr + row.may + row.jun) / 6)
      csvContent += `${row.category},${row.jan},${row.feb},${row.mar},${row.apr},${row.may},${row.jun},${avg}\n`
    })
    
    csvContent += "\n"
    
    // Summary
    const totalCurrent = monthlyComparison.reduce((sum, m) => sum + m.current, 0)
    const totalPrevious = monthlyComparison.reduce((sum, m) => sum + m.previous, 0)
    const totalSavings = totalPrevious - totalCurrent
    const avgMonthly = Math.round(totalCurrent / monthlyComparison.length)
    
    csvContent += "Summary\n"
    csvContent += `Total Expenses (6 months),₹${totalCurrent}\n`
    csvContent += `Average Monthly,₹${avgMonthly}\n`
    csvContent += `Total Saved,₹${totalSavings}\n`
    csvContent += `Savings Percentage,${((totalSavings / totalPrevious) * 100).toFixed(1)}%\n`
    
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
          <p className="text-3xl font-bold text-neutral-800 mt-2">{formatCurrency(10125)}</p>
          <div className="flex items-center gap-1 mt-3">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary font-medium">8.2% lower than last year</span>
          </div>
        </div>

        <div className="card">
          <p className="text-sm text-neutral-500">Highest Category</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">Rent</p>
          <p className="text-sm text-neutral-500 mt-3">{formatCurrency(8000)}/month average</p>
        </div>

        <div className="card">
          <p className="text-sm text-neutral-500">Total Saved (6mo)</p>
          <p className="text-3xl font-bold text-secondary mt-2">{formatCurrency(7200)}</p>
          <p className="text-sm text-neutral-500 mt-3">vs previous period</p>
        </div>
      </div>

      {/* Monthly Comparison Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">Monthly Comparison</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="current" fill="#2563EB" name="Current Year" radius={[8, 8, 0, 0]} />
            <Bar dataKey="previous" fill="#93C5FD" name="Previous Year" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Trends */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">Category Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={categoryTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="category" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="jan" stroke="#2563EB" strokeWidth={2} />
            <Line type="monotone" dataKey="feb" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="mar" stroke="#60A5FA" strokeWidth={2} />
            <Line type="monotone" dataKey="apr" stroke="#93C5FD" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}



