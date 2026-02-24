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



