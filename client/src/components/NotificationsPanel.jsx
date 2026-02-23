import { X, Bell, Check, AlertTriangle, Info, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatCurrency } from '../utils/currency'

const mockNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Bill Due Soon',
    message: 'Electricity bill of ₹2,800 is due on Feb 25',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'Payment Successful',
    message: 'Rent payment of ₹8,000 has been marked as paid',
    time: '1 day ago',
    read: false
  },
  {
    id: 3,
    type: 'info',
    title: 'New Insight Available',
    message: 'You can save ₹250/month by optimizing AC usage',
    time: '2 days ago',
    read: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'High Water Usage',
    message: 'Water consumption increased by 15% this month',
    time: '3 days ago',
    read: true
  }
]

export default function NotificationsPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    // Load notifications from localStorage
    const saved = localStorage.getItem('notifications')
    if (saved) {
      setNotifications(JSON.parse(saved))
    }
  }, [])

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
    setNotifications(updated)
    localStorage.setItem('notifications', JSON.stringify(updated))
  }

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    localStorage.setItem('notifications', JSON.stringify(updated))
  }

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id)
    setNotifications(updated)
    localStorage.setItem('notifications', JSON.stringify(updated))
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
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Bell className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-neutral-500">No notifications</p>
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



