import { TrendingDown, Calendar, Users, Zap, Receipt, IndianRupee } from 'lucide-react'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/currency'

// Mock data
const monthlyTrend = [
  { month: 'Jan', amount: 10250 },
  { month: 'Feb', amount: 9800 },
  { month: 'Mar', amount: 11200 },
  { month: 'Apr', amount: 9500 },
  { month: 'May', amount: 10800 },
  { month: 'Jun', amount: 9200 },
]

const categoryData = [
  { name: 'Electricity', value: 2800, color: '#2563EB' },
  { name: 'Water', value: 650, color: '#3B82F6' },
  { name: 'Gas', value: 1200, color: '#60A5FA' },
  { name: 'Internet', value: 599, color: '#93C5FD' },
  { name: 'Rent', value: 8000, color: '#DBEAFE' },
  { name: 'Groceries', value: 4500, color: '#10B981' },
]

const upcomingBills = [
  { id: 1, name: 'Electricity Bill', amount: 2800, dueDate: '2026-02-25', status: 'pending' },
  { id: 2, name: 'Internet Bill', amount: 599, dueDate: '2026-02-28', status: 'pending' },
  { id: 3, name: 'Water Bill', amount: 650, dueDate: '2026-03-01', status: 'pending' },
]

export default function Dashboard() {
  const totalExpenses = 17849
  const lastMonthExpenses = 19500
  const savingsPercent = ((lastMonthExpenses - totalExpenses) / lastMonthExpenses * 100).toFixed(1)

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
              <p className="text-2xl font-bold text-neutral-800 mt-1">3</p>
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
              <p className="text-2xl font-bold text-neutral-800 mt-1">{formatCurrency(totalExpenses / 4)}</p>
              <p className="text-sm text-neutral-500 mt-2">4 residents</p>
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
              <p className="text-2xl font-bold mt-1">{formatCurrency(1200)}</p>
              <p className="text-sm text-white/80 mt-2">This month</p>
            </div>
            <div className="stat-icon w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Monthly Trend */}
        <div className="card lg:col-span-2">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-3 sm:mb-4">Monthly Trend</h3>
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
        </div>

        {/* Category Breakdown */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-3 sm:mb-4">Category Breakdown</h3>
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
                  <p className="font-medium text-neutral-800 text-sm sm:text-base truncate">{bill.name}</p>
                  <p className="text-xs sm:text-sm text-neutral-500">Due: {bill.dueDate}</p>
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
      </div>
    </div>
  )
}



