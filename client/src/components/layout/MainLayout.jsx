import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Closed by default on mobile

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-30 lg:z-0
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main content with responsive padding */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-neutral-100">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



