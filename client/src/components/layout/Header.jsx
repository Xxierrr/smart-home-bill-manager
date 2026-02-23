import { useState, useEffect } from 'react'
import { Bell, Menu, User, LogOut } from 'lucide-react'
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
    
    // Also listen for custom event from Settings page
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
      <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-neutral-600" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-neutral-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 pl-4 border-l border-neutral-200"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-neutral-800">{fullName}</p>
                <p className="text-xs text-neutral-500">{userData.email}</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20">
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      navigate('/settings')
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
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

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  )
}



