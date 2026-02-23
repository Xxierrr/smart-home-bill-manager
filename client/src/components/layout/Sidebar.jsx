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

export default function Sidebar({ isOpen }) {
  const location = useLocation()

  return (
    <aside 
      className={`bg-white border-r border-neutral-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 lg:w-20'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-200">
          {isOpen && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
              Smart Home
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}



