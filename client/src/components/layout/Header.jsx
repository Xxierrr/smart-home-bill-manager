import { useState, useEffect } from 'react'
import { Bell, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationsPanel from '../NotificationsPanel'
import { db } from '../../config/supabase'

export default function Header({ onMenuClick }) {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const userEmail = user?.email || 'user@smarthome.com'
  const userName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim()
    : userEmail.split('@')[0]

  // Update unread count when notifications panel closes
  useEffect(() => {
    if (!showNotifications) {
      updateUnreadCount()
    }
  }, [showNotifications])

  const updateUnreadCount = async () => {
    if (!user) return
    
    try {
      const bills = await db.bills.getAll(user.id)
      const now = new Date()
      let count = 0

      // Count overdue bills
      count += bills.filter(b => 
        b.status === 'pending' && new Date(b.due_date) < now
      ).length

      // Count bills due within 3 days
      count += bills.filter(b => {
        if (b.status !== 'pending') return false
        const daysUntilDue = Math.floor((new Date(b.due_date) - now) / (1000 * 60 * 60 * 24))
        return daysUntilDue >= 0 && daysUntilDue <= 3
      }).length

      setUnreadCount(count)
    } catch (error) {
      console.error('Error counting notifications:', error)
    }
  }

  useEffect(() => {
    updateUnreadCount()
    // Update every minute
    const interval = setInterval(updateUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Responsive Header - Mobile-first design */}
      <header className="h-14 sm:h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-3 sm:px-6 flex-shrink-0">
        {/* Left: Logo (mobile only) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile logo */}
          <h1 className="lg:hidden text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Home
          </h1>
        </div>

        {/* Right: Notifications + User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications Button - Touch-friendly with pulse animation */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="icon-btn relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* User Profile - Responsive */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-neutral-200 touch-manipulation"
              aria-label="User menu"
            >
              {/* User info - Hidden on small mobile */}
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-neutral-800 truncate max-w-[150px]">
                  {userName}
                </p>
                <p className="text-xs text-neutral-500 truncate max-w-[150px]">
                  {userEmail}
                </p>
              </div>
              
              {/* User Avatar - Always visible */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </button>

            {/* User Menu Dropdown - Responsive */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20">
                  {/* Mobile: Show user info in dropdown */}
                  <div className="md:hidden px-4 py-3 border-b border-neutral-200">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {userEmail}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      navigate('/settings')
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100 transition-colors touch-manipulation"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 touch-manipulation"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Notifications Panel - Responsive */}
      <NotificationsPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  )
}



