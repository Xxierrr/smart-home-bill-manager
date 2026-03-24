import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate inputs
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    console.log('Attempting login with:', formData.email)

    // Call login function from AuthContext
    const result = await login(formData.email, formData.password)

    console.log('Login result:', result)

    if (result.success) {
      navigate('/')
    } else {
      // Show the actual error from Supabase
      setError(result.message || 'Invalid email or password')
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    const result = await loginWithGoogle()
    if (!result.success) {
      setError(result.message || 'Google login failed')
      setLoading(false)
    }
    // If successful, user will be redirected to Google
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-300 transform -skew-y-3 origin-top-left"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-96 bg-gradient-to-l from-teal-200 via-teal-100 to-transparent rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/4 left-0 w-1/3 h-96 bg-gradient-to-r from-teal-100 to-transparent rounded-full blur-3xl opacity-30"></div>

      {/* Main Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-50 to-white relative">
              {/* Logo */}
              <div className="absolute top-8 left-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Smart Home
                </h1>
              </div>

              {/* Illustration */}
              <div className="relative w-full max-w-md">
                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-12 h-12 border-4 border-blue-200 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-20 left-10 w-8 h-8 border-4 border-teal-200 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
                <div className="absolute top-32 left-20 w-6 h-6 border-4 border-blue-300 rounded-full animate-spin" style={{ animationDuration: '5s' }}></div>

                {/* Main illustration area */}
                <div className="relative z-10">
                  {/* Desk/Counter */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-3xl shadow-lg"></div>
                    <div className="w-full h-4 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-300"></div>
                    
                    {/* Laptop on desk */}
                    <div className="absolute top-8 left-1/4 w-32 h-20 bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg shadow-md transform -rotate-2">
                      <div className="w-full h-2 bg-blue-400 rounded-t-lg"></div>
                    </div>

                    {/* Plant */}
                    <div className="absolute top-4 right-16">
                      <div className="w-12 h-16 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-teal-400 to-teal-500 rounded-full"></div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-amber-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Person 1 - Left */}
                  <div className="absolute bottom-0 left-8">
                    <div className="relative">
                      {/* Body */}
                      <div className="w-16 h-32 bg-gradient-to-b from-amber-400 to-amber-500 rounded-t-full"></div>
                      {/* Head */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full"></div>
                      {/* Hair */}
                      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-purple-600 rounded-t-full"></div>
                      {/* Shopping bag */}
                      <div className="absolute bottom-8 -left-6 w-10 h-12 bg-pink-400 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Person 2 - Right */}
                  <div className="absolute bottom-0 right-24">
                    <div className="relative">
                      {/* Body */}
                      <div className="w-16 h-28 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-full"></div>
                      {/* Head */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full"></div>
                      {/* Hair */}
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-purple-700 rounded-t-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-8 text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Smart Home
                </h1>
              </div>

              <div className="max-w-md mx-auto w-full">
                <h2 className="text-4xl font-bold text-neutral-800 mb-2">Welcome Back :)</h2>
                <p className="text-neutral-500 mb-8">
                  To keep connected with us please login with your personal information by email address and password 🔒
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Justin@smarthome.io"
                        className="w-full pl-12 pr-12 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                      {formData.email && (
                        <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
                      )}
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="remember"
                          checked={formData.remember}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-neutral-300 rounded peer-checked:bg-secondary peer-checked:border-secondary transition-all"></div>
                        {formData.remember && (
                          <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-neutral-600">Remember Me</span>
                    </label>
                    <a href="#" className="text-sm text-neutral-500 hover:text-primary transition-colors">
                      Forget Password?
                    </a>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Logging in...' : 'Login Now'}
                    </button>
                    <Link
                      to="/register"
                      className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-4 rounded-xl transition-all text-center"
                    >
                      Create Account
                    </Link>
                  </div>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                  <p className="text-center text-sm text-neutral-500 mb-4">Or you can join with</p>
                  <div className="flex justify-center gap-4">
                    <button 
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={true}
                      title="Google login coming soon"
                      className="w-12 h-12 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all shadow-sm hover:shadow-md">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
