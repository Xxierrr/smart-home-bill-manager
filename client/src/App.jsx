import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import BillsManager from './pages/BillsManager'
import Analytics from './pages/Analytics'
import SmartInsights from './pages/SmartInsights'
import HouseProfile from './pages/HouseProfile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
      
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bills" element={<BillsManager />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/insights" element={<SmartInsights />} />
                <Route path="/profile" element={<HouseProfile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App



