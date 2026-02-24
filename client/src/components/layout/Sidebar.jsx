import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Receipt, 
  BarChart3, 
  Lightbulb, 
  Home, 
  Settings
} from 'lucide-react'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/bills', label: 'Bills Manager', icon: Receipt },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/insights', label: 'Smart Insights', icon: Lightbulb },
  { path: '/profile', label: 'House Profile', icon: Home },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ isOpen, onNavigate }) {
  const location = useLocation()

  return (
    <aside 
      className="h-full w-64 bg-white border-r border-neutral-200 flex flex-col"
    >
      {/* Logo Header */}
      <div className="h-16 flex items-center justify-center px-4 sm:px-6 border-b border-neutral-200 flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
          Smart Home
        </h1>
      </div>

      {/* Navigation - Scrollable on mobile */}
      <nav className="flex-1 px-3 py-4 sm:py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer - Optional user info on mobile */}
      <div className="p-4 border-t border-neutral-200 flex-shrink-0">
        <p className="text-xs text-neutral-500 text-center">
          Smart Home Manager v1.0
        </p>
      </div>
    </aside>
  )
}



