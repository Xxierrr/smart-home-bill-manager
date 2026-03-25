import { Link } from 'react-router-dom'
import { Receipt, TrendingDown, Users, Zap, BarChart3, Bell, ArrowRight, Check, IndianRupee } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Smart Home
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-neutral-600 hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-neutral-600 hover:text-primary transition-colors">How It Works</a>
              <a href="#pricing" className="text-neutral-600 hover:text-primary transition-colors">Pricing</a>
              <Link 
                to="/login" 
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
              >
                Log In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Link 
              to="/login" 
              className="md:hidden px-4 py-2 bg-primary text-white rounded-lg text-sm"
            >
              Log In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium">
                🎉 Smart Bill Management Made Easy
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight">
                Manage Your
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Household Bills
                </span>
                Effortlessly
              </h1>
              
              <p className="text-lg text-neutral-600 leading-relaxed">
                Track expenses, split bills with roommates, get AI-powered insights, and never miss a payment. 
                Your complete household bill management solution in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#how-it-works" 
                  className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">15%</div>
                  <div className="text-sm text-neutral-600">Avg. Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">100%</div>
                  <div className="text-sm text-neutral-600">Free to Use</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-neutral-600">AI Insights</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Image */}
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Dashboard preview image */}
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="/images/dashboard-preview.webp" 
                  alt="Smart Home Bill Manager Dashboard Preview" 
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Everything You Need to Manage Bills
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Powerful features designed to make household bill management simple and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Receipt className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Bill Tracking</h3>
              <p className="text-neutral-600">
                Track all your household bills in one place. Never miss a due date with smart reminders.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Bill Splitting</h3>
              <p className="text-neutral-600">
                Split bills with roommates easily. Equal or custom splits with payment tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">AI Insights</h3>
              <p className="text-neutral-600">
                Get smart recommendations to reduce bills and save money with AI-powered insights.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-amber-100">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Analytics</h3>
              <p className="text-neutral-600">
                Visualize spending patterns with beautiful charts and detailed expense breakdowns.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-6 bg-gradient-to-br from-teal-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Smart Notifications</h3>
              <p className="text-neutral-600">
                Get timely alerts for due bills, high usage, and potential savings opportunities.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-pink-100">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Cost Savings</h3>
              <p className="text-neutral-600">
                Save up to 15% on bills with personalized tips and category-specific recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-neutral-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">Create Account</h3>
                <p className="text-neutral-600">
                  Sign up for free in seconds. No credit card required. Set up your household profile.
                </p>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-primary to-secondary -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">Add Your Bills</h3>
                <p className="text-neutral-600">
                  Add all your household bills - electricity, water, internet, rent, and more.
                </p>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-secondary to-purple-500 -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">Get Insights</h3>
                <p className="text-neutral-600">
                  Receive AI-powered insights, track expenses, and start saving money automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-800">₹0</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span className="text-neutral-600">Unlimited bills</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span className="text-neutral-600">Bill splitting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span className="text-neutral-600">Basic analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary" />
                  <span className="text-neutral-600">Email notifications</span>
                </li>
              </ul>
              <Link 
                to="/register" 
                className="block w-full py-3 bg-neutral-100 text-neutral-800 rounded-xl font-semibold text-center hover:bg-neutral-200 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹99</span>
                <span className="text-white/80">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Advanced AI insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Export reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Custom categories</span>
                </li>
              </ul>
              <button 
                disabled
                className="block w-full py-3 bg-white/20 text-white rounded-xl font-semibold text-center cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Bills?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of households saving money and time with Smart Home Bill Manager
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:shadow-2xl transition-all group"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Smart Home</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Your complete household bill management solution.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2026 Smart Home Bill Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
