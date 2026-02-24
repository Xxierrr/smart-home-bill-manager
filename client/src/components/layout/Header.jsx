import { useState, useEffect } from 'react'
import { Bell, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationsPanel from '../NotificationsPanel'

export default function Header({ onMenuClick }) {
  const [userData, setUserData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@smarthome.com'
  })
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Load user data from localStorage
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserData(profile)
    }
  }, [])

  // Listen for storage changes (when settings are updated)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        setUserData(profile)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userProfileUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userProfileUpdated', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const fullName = `${userData.firstName} ${userData.lastName}`

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
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
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
                  {fullName}
                </p>
                <p className="text-xs text-neutral-500 truncate max-w-[150px]">
                  {userData.email}
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
                      {fullName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {userData.email}
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



