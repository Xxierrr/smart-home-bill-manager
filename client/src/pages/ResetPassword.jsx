import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, Check, AlertCircle } from 'lucide-react'
import { supabase } from '../config/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionChecking, setSessionChecking] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Handle the auth callback and check session
    const handleAuthCallback = async () => {
      try {
        // Get the hash from URL (Supabase sends tokens in hash)
        const hashParams = new URLSearchParams(location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        console.log('Auth callback type:', type)
        console.log('Has access token:', !!accessToken)

        // If we have tokens in the URL, set the session
        if (accessToken && type === 'recovery') {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })

          if (error) {
            console.error('Session error:', error)
            setError('Invalid or expired reset link. Please request a new one.')
          }
        } else {
          // Check if we already have a valid session
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error || !session) {
            console.error('No valid session:', error)
            setError('Invalid or expired reset link. Please request a new one.')
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        setError('Something went wrong. Please try again.')
      } finally {
        setSessionChecking(false)
      }
    }

    handleAuthCallback()
  }, [location])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      console.error('Password reset error:', error)
      setError(error.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (sessionChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-300 transform -skew-y-3 origin-top-left"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-96 bg-gradient-to-l from-teal-200 via-teal-100 to-transparent rounded-full blur-3xl opacity-40"></div>

      {/* Main Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smart Home
            </h1>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Password Reset Successful!</h2>
              <p className="text-neutral-600">Redirecting to login page...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-neutral-800 mb-2 text-center">Reset Password</h2>
              <p className="text-neutral-500 mb-8 text-center">
                Enter your new password below
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">{error}</p>
                    {error.includes('expired') && (
                      <button
                        onClick={() => navigate('/login')}
                        className="text-primary hover:underline text-xs"
                      >
                        Request a new reset link
                      </button>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-6">
                {/* New Password Input */}
                <div>
                  <label className="block text-sm text-neutral-500 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password (min 6 characters)"
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm text-neutral-500 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                  <p className="font-medium mb-1">Password Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>At least 6 characters long</li>
                    <li>Both passwords must match</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm text-neutral-600 hover:text-primary transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
