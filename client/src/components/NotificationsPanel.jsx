import { X, Bell, Check, AlertTriangle, Info, Trash2, TrendingUp, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatCurrency } from '../utils/currency'
import { db } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

export default function NotificationsPanel({ isOpen, onClose }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && user) {
      generateNotifications()
    }
  }, [isOpen, user])

  const generateNotifications = async () => {
    try {
      const bills = await db.bills.getAll(user.id)
      const generatedNotifications = []
      const now = new Date()

      // 1. Overdue bills
      const overdueBills = bills.filter(b => 
        b.status === 'pending' && new Date(b.due_date) < now
      )
      overdueBills.forEach(bill => {
        const daysOverdue = Math.floor((now - new Date(bill.due_date)) / (1000 * 60 * 60 * 24))
        generatedNotifications.push({
          id: `overdue-${bill.id}`,
          type: 'warning',
          title: 'Overdue Bill',
          message: `${bill.category} bill of ${formatCurrency(bill.amount)} is ${daysOverdue} day(s) overdue`,
          time: `${daysOverdue} days ago`,
          read: false,
          priority: 1
        })
      })

      // 2. Bills due soon (within 3 days)
      const upcomingBills = bills.filter(b => {
        if (b.status !== 'pending') return false
        const dueDate = new Date(b.due_date)
        const daysUntilDue = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24))
        return daysUntilDue >= 0 && daysUntilDue <= 3
      })
      upcomingBills.forEach(bill => {
        const daysUntilDue = Math.floor((new Date(bill.due_date) - now) / (1000 * 60 * 60 * 24))
        const timeText = daysUntilDue === 0 ? 'today' : daysUntilDue === 1 ? 'tomorrow' : `in ${daysUntilDue} days`
        generatedNotifications.push({
          id: `upcoming-${bill.id}`,
          type: 'warning',
          title: 'Bill Due Soon',
          message: `${bill.category} bill of ${formatCurrency(bill.amount)} is due ${timeText}`,
          time: timeText,
          read: false,
          priority: 2
        })
      })

      // 3. Recently paid bills
      const recentlyPaid = bills.filter(b => {
        if (b.status !== 'paid' || !b.payment_date) return false
        const paymentDate = new Date(b.payment_date)
        const daysSincePaid = Math.floor((now - paymentDate) / (1000 * 60 * 60 * 24))
        return daysSincePaid <= 7
      })
      recentlyPaid.forEach(bill => {
        const daysSincePaid = Math.floor((now - new Date(bill.payment_date)) / (1000 * 60 * 60 * 24))
        const timeText = daysSincePaid === 0 ? 'today' : daysSincePaid === 1 ? 'yesterday' : `${daysSincePaid} days ago`
        generatedNotifications.push({
          id: `paid-${bill.id}`,
          type: 'success',
          title: 'Payment Successful',
          message: `${bill.category} payment of ${formatCurrency(bill.amount)} has been marked as paid`,
          time: timeText,
          read: false,
          priority: 3
        })
      })

      // 4. High bill alerts (20% above average)
      const billsByCategory = {}
      bills.forEach(bill => {
        if (!billsByCategory[bill.category]) {
          billsByCategory[bill.category] = []
        }
        billsByCategory[bill.category].push(parseFloat(bill.amount))
      })

      Object.entries(billsByCategory).forEach(([category, amounts]) => {
        if (amounts.length < 2) return
        const avg = amounts.reduce((sum, a) => sum + a, 0) / amounts.length
        const latest = amounts[amounts.length - 1]
        if (latest > avg * 1.2) {
          const increase = ((latest - avg) / avg * 100).toFixed(0)
          generatedNotifications.push({
            id: `high-${category}`,
            type: 'warning',
            title: `High ${category} Bill`,
            message: `Your ${category.toLowerCase()} bill is ${increase}% higher than average`,
            time: 'Recent',
            read: false,
            priority: 2
          })
        }
      })

      // 5. Savings insights
      if (bills.length > 0) {
        const totalAmount = bills.reduce((sum, b) => sum + parseFloat(b.amount), 0)
        const avgBill = totalAmount / bills.length
        if (avgBill > 1000) {
          generatedNotifications.push({
            id: 'insight-savings',
            type: 'info',
            title: 'Savings Opportunity',
            message: `You could save up to ${formatCurrency(avgBill * 0.15)}/month by following our smart tips`,
            time: 'New',
            read: false,
            priority: 4
          })
        }
      }

      // Sort by priority
      generatedNotifications.sort((a, b) => a.priority - b.priority)

      // Load saved read status from localStorage
      const savedReadStatus = JSON.parse(localStorage.getItem('notificationReadStatus') || '{}')
      const notificationsWithReadStatus = generatedNotifications.map(n => ({
        ...n,
        read: savedReadStatus[n.id] || false
      }))

      setNotifications(notificationsWithReadStatus)
    } catch (error) {
      console.error('Error generating notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
    setNotifications(updated)
    
    // Save read status to localStorage
    const readStatus = {}
    updated.forEach(n => {
      if (n.read) readStatus[n.id] = true
    })
    localStorage.setItem('notificationReadStatus', JSON.stringify(readStatus))
  }

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    
    // Save read status to localStorage
    const readStatus = {}
    updated.forEach(n => {
      readStatus[n.id] = true
    })
    localStorage.setItem('notificationReadStatus', JSON.stringify(readStatus))
  }

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id)
    setNotifications(updated)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-secondary" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case 'info':
        return <Info className="w-5 h-5 text-primary" />
      default:
        return <Bell className="w-5 h-5 text-neutral-500" />
    }
  }

  const getIconBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100'
      case 'warning':
        return 'bg-amber-100'
      case 'info':
        return 'bg-blue-100'
      default:
        return 'bg-neutral-100'
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-lg font-bold text-neutral-800">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-xs text-neutral-500">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-4 border-b border-neutral-200">
            <button 
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-neutral-500">Loading notifications...</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Bell className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-neutral-500">No notifications</p>
              <p className="text-xs text-neutral-400 mt-2">Add some bills to get notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-neutral-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-neutral-800 text-sm">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-neutral-400">{notification.time}</p>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-primary hover:text-primary-dark"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}



