import { useState, useEffect } from 'react'
import { User, Bell, Lock } from 'lucide-react'
import { supabase } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferences: {
      currency: 'INR',
      notifications: true,
      theme: 'light'
    }
  })

  const { user } = useAuth()

  // Load user data on mount
  useEffect(() => {
    loadUserData()
  }, [user])

  const loadUserData = async () => {
    try {
      // First check localStorage for saved profile
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        setUserData(JSON.parse(savedProfile))
        return
      }

      if (user) {
        setUserData({
          firstName: user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.last_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          preferences: {
            currency: user.user_metadata?.currency || 'INR',
            notifications: user.user_metadata?.notifications ?? true,
            theme: user.user_metadata?.theme || 'light'
          }
        })
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePreferenceChange = (key, value) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }

  const handleSaveChanges = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      // Update user metadata in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          currency: userData.preferences.currency,
          notifications: userData.preferences.notifications,
          theme: userData.preferences.theme
        }
      })

      if (error) throw error

      // Also save to localStorage and trigger event
      localStorage.setItem('userProfile', JSON.stringify(userData))
      window.dispatchEvent(new Event('userProfileUpdated'))
      
      setMessage('✅ Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      
      // Fallback to localStorage if API fails
      localStorage.setItem('userProfile', JSON.stringify(userData))
      window.dispatchEvent(new Event('userProfileUpdated'))
      setMessage('✅ Settings saved locally!')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordData.new || !passwordData.confirm) {
      setMessage('❌ Please fill in all password fields')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (passwordData.new !== passwordData.confirm) {
      setMessage('❌ New passwords do not match')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (passwordData.new.length < 6) {
      setMessage('❌ Password must be at least 6 characters')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // Supabase doesn't require current password verification for updateUser
      // It uses the current session token for authentication
      const { data, error } = await supabase.auth.updateUser({
        password: passwordData.new
      })

      if (error) throw error

      setMessage('✅ Password changed successfully!')
      setShowChangePassword(false)
      setPasswordData({ current: '', new: '', confirm: '' })
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error changing password:', error)
      setMessage('❌ ' + (error.message || 'Failed to change password. Please try again.'))
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-800">Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your account and preferences</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Profile Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="input-field" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
            <input 
              type="tel" 
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="input-field" 
              placeholder="+91 9876543210"
            />
          </div>
          <button 
            onClick={handleSaveChanges}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800">Bill Due Reminders</p>
              <p className="text-sm text-neutral-500">Get notified 3 days before bills are due</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={userData.preferences?.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800">High Bill Alerts</p>
              <p className="text-sm text-neutral-500">Alert when bills are unusually high</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800">Savings Tips</p>
              <p className="text-sm text-neutral-500">Receive personalized saving recommendations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800">Security</h3>
        </div>
        <div className="space-y-4">
          {!showChangePassword ? (
            <button 
              onClick={() => setShowChangePassword(true)}
              className="btn-secondary w-full sm:w-auto"
            >
              Change Password
            </button>
          ) : (
            <div className="space-y-4 p-4 bg-neutral-50 rounded-lg">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">Password Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>At least 6 characters long</li>
                  <li>Use a strong, unique password</li>
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">New Password</label>
                <input 
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                  className="input-field"
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Confirm New Password</label>
                <input 
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                  className="input-field"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
                <button 
                  onClick={() => {
                    setShowChangePassword(false)
                    setPasswordData({ current: '', new: '', confirm: '' })
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



