import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Performance: Get root element
const rootElement = document.getElementById('root')

// Performance: Create root with concurrent features
const root = ReactDOM.createRoot(rootElement)

// Performance: Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Performance: Report web vitals (optional - for monitoring)
if (import.meta.env.PROD) {
  // Only in production to avoid overhead in development
  import('./utils/performance').then(({ reportWebVitals }) => {
    reportWebVitals((metric) => {
      // Send to analytics endpoint
      console.log(metric)
    })
  })
}



