import { useState, useEffect } from 'react'
import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle, Target, Zap, DollarSign, Calendar, Percent } from 'lucide-react'
import { formatCurrency } from '../utils/currency'
import { db } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

export default function SmartInsights() {
  const { user } = useAuth()
  const [bills, setBills] = useState([])
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPotentialSavings, setTotalPotentialSavings] = useState(0)

  useEffect(() => {
    if (user) {
      loadBills()
    }
  }, [user])

  useEffect(() => {
    if (bills.length > 0) {
      generateInsights()
    }
  }, [bills])

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

  const generateInsights = () => {
    const generatedInsights = []
    let potentialSavings = 0

    // Group bills by category
    const billsByCategory = {}
    bills.forEach(bill => {
      if (!billsByCategory[bill.category]) {
        billsByCategory[bill.category] = []
      }
      billsByCategory[bill.category].push(bill)
    })

    // Analyze each category
    Object.entries(billsByCategory).forEach(([category, categoryBills]) => {
      const amounts = categoryBills.map(b => parseFloat(b.amount))
      const avgAmount = amounts.reduce((sum, a) => sum + a, 0) / amounts.length
      const maxAmount = Math.max(...amounts)
      const minAmount = Math.min(...amounts)
      const latestAmount = amounts[amounts.length - 1]

      // 1. Check for unusual spikes
      if (latestAmount > avgAmount * 1.15) {
        const increase = ((latestAmount - avgAmount) / avgAmount * 100).toFixed(0)
        generatedInsights.push({
          id: `spike-${category}`,
          type: 'warning',
          icon: AlertTriangle,
          title: `${category} Bill Higher Than Usual`,
          description: `Your ${category.toLowerCase()} bill increased by ${increase}% compared to average. ${getSpikeTip(category)}`,
          savings: 0,
          priority: 'high',
          color: 'amber'
        })
      }

      // 2. Check for savings opportunities
      if (latestAmount < avgAmount * 0.9) {
        const decrease = ((avgAmount - latestAmount) / avgAmount * 100).toFixed(0)
        const savings = avgAmount - latestAmount
        potentialSavings += savings
        generatedInsights.push({
          id: `savings-${category}`,
          type: 'savings',
          icon: TrendingDown,
          title: `${category} Usage Decreased`,
          description: `Your ${category.toLowerCase()} bill is ${decrease}% lower than average. Great job!`,
          savings: savings,
          priority: 'low',
          color: 'secondary'
        })
      }

      // 3. Category-specific tips
      const tip = getCategoryTip(category, avgAmount)
      if (tip) {
        generatedInsights.push(tip)
        potentialSavings += tip.savings
      }
    })

    // 4. Next month forecast
    const totalThisMonth = bills
      .filter(b => new Date(b.due_date).getMonth() === new Date().getMonth())
      .reduce((sum, b) => sum + parseFloat(b.amount), 0)
    
    const avgMonthly = bills.reduce((sum, b) => sum + parseFloat(b.amount), 0) / bills.length
    
    if (totalThisMonth > 0) {
      generatedInsights.push({
        id: 'forecast',
        type: 'prediction',
        icon: Target,
        title: 'Next Month Forecast',
        description: `Based on your spending patterns, next month's expenses will be around ${formatCurrency(avgMonthly)}.`,
        savings: 0,
        priority: 'low',
        color: 'purple'
      })
    }

    // 5. Overdue bills warning
    const overdueBills = bills.filter(b => 
      b.status === 'pending' && new Date(b.due_date) < new Date()
    )
    
    if (overdueBills.length > 0) {
      const overdueAmount = overdueBills.reduce((sum, b) => sum + parseFloat(b.amount), 0)
      generatedInsights.push({
        id: 'overdue',
        type: 'warning',
        icon: AlertTriangle,
        title: 'Overdue Bills Alert',
        description: `You have ${overdueBills.length} overdue bill(s) totaling ${formatCurrency(overdueAmount)}. Pay them soon to avoid late fees.`,
        savings: 0,
        priority: 'high',
        color: 'amber'
      })
    }

    // 6. Payment pattern insight
    const paidBills = bills.filter(b => b.status === 'paid')
    const pendingBills = bills.filter(b => b.status === 'pending')
    
    if (paidBills.length > 0 && pendingBills.length > 0) {
      const paymentRate = (paidBills.length / bills.length * 100).toFixed(0)
      generatedInsights.push({
        id: 'payment-pattern',
        type: 'tip',
        icon: Calendar,
        title: 'Payment Tracking',
        description: `You've paid ${paymentRate}% of your bills on time. ${pendingBills.length} bill(s) still pending.`,
        savings: 0,
        priority: 'medium',
        color: 'primary'
      })
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    generatedInsights.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

    setInsights(generatedInsights)
    setTotalPotentialSavings(potentialSavings)
  }

  const getSpikeTip = (category) => {
    const tips = {
      'Electricity': 'Check for appliances left on or consider energy-efficient alternatives.',
      'Water': 'Check for leaks in pipes, faucets, or toilets.',
      'Gas': 'Review heating usage or check for gas leaks.',
      'Internet': 'Review your plan - you might be paying for unused bandwidth.',
      'Rent': 'Consider negotiating with your landlord or looking for alternatives.',
      'Groceries': 'Plan meals ahead and avoid impulse purchases.',
      'Maintenance': 'Regular maintenance prevents costly repairs later.'
    }
    return tips[category] || 'Review your usage patterns.'
  }

  const getCategoryTip = (category, avgAmount) => {
    const tips = {
      'Electricity': {
        id: `tip-${category}`,
        type: 'tip',
        icon: Lightbulb,
        title: 'Switch to LED Bulbs',
        description: 'Replacing traditional bulbs with LEDs could save you 15-20% on electricity.',
        savings: avgAmount * 0.15,
        priority: 'medium',
        color: 'primary'
      },
      'Water': {
        id: `tip-${category}`,
        type: 'tip',
        icon: TrendingDown,
        title: 'Install Water-Saving Fixtures',
        description: 'Low-flow showerheads and faucet aerators can reduce water usage by 30%.',
        savings: avgAmount * 0.30,
        priority: 'medium',
        color: 'secondary'
      },
      'Gas': {
        id: `tip-${category}`,
        type: 'tip',
        icon: Zap,
        title: 'Optimize Heating Usage',
        description: 'Lower thermostat by 2°C when sleeping to save 10% on gas bills.',
        savings: avgAmount * 0.10,
        priority: 'medium',
        color: 'secondary'
      },
      'Internet': {
        id: `tip-${category}`,
        type: 'tip',
        icon: DollarSign,
        title: 'Review Internet Plan',
        description: 'Compare plans from other providers - you might find better deals.',
        savings: avgAmount * 0.20,
        priority: 'low',
        color: 'primary'
      }
    }
    return tips[category] || null
  }

  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-amber-200 bg-amber-50',
    low: 'border-blue-200 bg-blue-50'
  }

  const iconColors = {
    primary: 'text-primary bg-blue-100',
    secondary: 'text-secondary bg-green-100',
    amber: 'text-amber-600 bg-amber-100',
    purple: 'text-purple-600 bg-purple-100'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading insights...</div>
      </div>
    )
  }

  if (bills.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Smart Insights</h1>
          <p className="text-neutral-500 mt-1">AI-powered recommendations to reduce your bills</p>
        </div>
        <div className="card text-center py-12">
          <Lightbulb className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">No insights available</h3>
          <p className="text-neutral-500">Add some bills to get personalized recommendations</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-800">Smart Insights</h1>
        <p className="text-neutral-500 mt-1">AI-powered recommendations to reduce your bills</p>
      </div>

      {/* Savings Summary */}
      <div className="card bg-gradient-to-br from-secondary to-secondary-dark text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Total Potential Savings</p>
            <p className="text-4xl font-bold mt-2">{formatCurrency(totalPotentialSavings)}</p>
            <p className="text-white/80 text-sm mt-2">per month if you follow all tips</p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon
          return (
            <div 
              key={insight.id} 
              className={`card border-2 ${priorityColors[insight.priority]} hover:shadow-lg transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[insight.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-neutral-800">{insight.title}</h3>
                    {insight.priority === 'high' && (
                      <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">{insight.description}</p>
                  {insight.savings > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Potential Savings</span>
                        <span className="text-lg font-bold text-secondary">{formatCurrency(insight.savings)}/mo</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action Tips */}
      <div className="card bg-blue-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">Quick Wins</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Unplug devices when not in use to reduce phantom power consumption
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Run dishwasher and washing machine with full loads only
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Use natural light during the day instead of artificial lighting
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Set water heater temperature to 120°F (49°C) for optimal efficiency
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}



