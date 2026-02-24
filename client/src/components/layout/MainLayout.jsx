import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout({ children }) {
  const [sidebarOpen] = useState(true) // Always open

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Sidebar - Always visible */}
      <div className="relative inset-y-0 left-0">
        <Sidebar isOpen={sidebarOpen} onNavigate={() => {}} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header onMenuClick={() => {}} />
        
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



