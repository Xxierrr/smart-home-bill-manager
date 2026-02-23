import { Lightbulb, TrendingDown, AlertTriangle, Target, Zap } from 'lucide-react'
import { formatCurrency } from '../utils/currency'

const insights = [
  {
    id: 1,
    type: 'savings',
    icon: TrendingDown,
    title: 'Electricity Usage Decreased',
    description: 'Your electricity bill is 9% lower than last month. Great job!',
    savings: 280,
    priority: 'low',
    color: 'secondary'
  },
  {
    id: 2,
    type: 'warning',
    icon: AlertTriangle,
    title: 'Water Bill Higher Than Usual',
    description: 'Your water consumption increased by 15% this month. Check for leaks.',
    savings: 0,
    priority: 'high',
    color: 'amber'
  },
  {
    id: 3,
    type: 'tip',
    icon: Lightbulb,
    title: 'Switch to LED Bulbs',
    description: 'Replacing 10 bulbs with LEDs could save you ₹150-200 per month.',
    savings: 175,
    priority: 'medium',
    color: 'primary'
  },
  {
    id: 4,
    type: 'prediction',
    icon: Target,
    title: 'Next Month Forecast',
    description: 'Based on trends, your next month expenses will be around ₹9,500.',
    savings: 0,
    priority: 'low',
    color: 'purple'
  },
  {
    id: 5,
    type: 'tip',
    icon: Zap,
    title: 'Optimize AC Usage',
    description: 'Setting your AC 2°C higher could reduce electricity costs by ₹250/month.',
    savings: 250,
    priority: 'high',
    color: 'secondary'
  },
]

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

export default function SmartInsights() {
  const totalPotentialSavings = insights.reduce((sum, insight) => sum + insight.savings, 0)

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



