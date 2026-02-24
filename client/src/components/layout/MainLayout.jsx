import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Closed by default on mobile
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true) // Open sidebar on desktop
      } else {
        setSidebarOpen(false) // Close sidebar on mobile
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Mobile Overlay - Only show on mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Responsive positioning */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar isOpen={sidebarOpen} onNavigate={closeSidebar} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header onMenuClick={toggleSidebar} />
        
        {/* Main content with responsive padding */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-neutral-100">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



