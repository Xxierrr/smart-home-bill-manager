import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Receipt, Edit, Trash2, Check, X } from 'lucide-react'
import { formatCurrency } from '../utils/currency'
import { db } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

const defaultCategories = ['Electricity', 'Water', 'Gas', 'Internet', 'Rent', 'Groceries', 'Maintenance']

export default function BillsManager() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [bills, setBills] = useState([])
  const [categories, setCategories] = useState(defaultCategories)
  const [showCustomCategory, setShowCustomCategory] = useState(false)
  const [customCategory, setCustomCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [newBill, setNewBill] = useState({
    category: 'Electricity',
    amount: '',
    due_date: '',
    provider: '',
    status: 'pending'
  })

  useEffect(() => {
    if (user) {
      loadBills()
    }
    
    // Load custom categories from localStorage
    const savedCategories = localStorage.getItem('billCategories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
  }, [user])

  const loadBills = async () => {
    try {
      const data = await db.bills.getAll(user.id)
      setBills(data || [])
    } catch (error) {
      console.error('Error loading bills:', error)
      alert('Failed to load bills. Please check your Supabase connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBill(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddBill = async () => {
    if (!newBill.amount || !newBill.due_date || !newBill.provider) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const billToAdd = {
        user_id: user.id,
        category: newBill.category,
        amount: parseFloat(newBill.amount),
        due_date: newBill.due_date,
        provider: newBill.provider,
        status: newBill.status,
        currency: 'INR'
      }

      const addedBill = await db.bills.create(billToAdd)
      setBills([...bills, addedBill])

      // Reset form
      setNewBill({
        category: 'Electricity',
        amount: '',
        due_date: '',
        provider: '',
        status: 'pending'
      })
      setShowAddModal(false)
      alert('Bill added successfully!')
    } catch (error) {
      console.error('Error adding bill:', error)
      alert('Failed to add bill. Please try again.')
    }
  }

  const handleDeleteBill = async (id) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      try {
        await db.bills.delete(id)
        setBills(bills.filter(bill => bill.id !== id))
      } catch (error) {
        console.error('Error deleting bill:', error)
        alert('Failed to delete bill. Please try again.')
      }
    }
  }

  const handleMarkAsPaid = async (id) => {
    try {
      const updatedBill = await db.bills.update(id, { status: 'paid', payment_date: new Date().toISOString().split('T')[0] })
      setBills(bills.map(bill => bill.id === id ? updatedBill : bill))
    } catch (error) {
      console.error('Error updating bill:', error)
      alert('Failed to update bill. Please try again.')
    }
  }

  const handleAddCustomCategory = () => {
    if (!customCategory.trim()) {
      alert('Please enter a category name')
      return
    }
    
    if (categories.includes(customCategory)) {
      alert('This category already exists')
      return
    }

    const updatedCategories = [...categories, customCategory]
    setCategories(updatedCategories)
    localStorage.setItem('billCategories', JSON.stringify(updatedCategories))
    
    setNewBill(prev => ({ ...prev, category: customCategory }))
    setCustomCategory('')
    setShowCustomCategory(false)
  }

  const allCategories = ['All', ...categories]

  const filteredBills = bills.filter(bill => {
    const matchesCategory = selectedCategory === 'All' || bill.category === selectedCategory
    const matchesSearch = bill.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Bills Manager</h1>
          <p className="text-neutral-500 mt-1">Manage all your household bills</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Bill
        </button>
      </div>

      {/* Add Bill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-800">Add New Bill</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-neutral-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category *</label>
                {!showCustomCategory ? (
                  <div className="space-y-2">
                    <select 
                      name="category"
                      value={newBill.category}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCustomCategory(true)}
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      + Add Custom Category
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter category name"
                        className="input-field flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomCategory()}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomCategory}
                        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomCategory(false)
                        setCustomCategory('')
                      }}
                      className="text-sm text-neutral-600 hover:text-neutral-800"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Provider Name *</label>
                <input 
                  type="text"
                  name="provider"
                  value={newBill.provider}
                  onChange={handleInputChange}
                  placeholder="e.g., BESCOM, Airtel"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Amount (₹) *</label>
                <input 
                  type="number"
                  name="amount"
                  value={newBill.amount}
                  onChange={handleInputChange}
                  placeholder="2800"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Due Date *</label>
                <input 
                  type="date"
                  name="due_date"
                  value={newBill.due_date}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                <select 
                  name="status"
                  value={newBill.status}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleAddBill}
                  className="btn-primary flex-1"
                >
                  Add Bill
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredBills.map((bill) => (
          <div key={bill.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  bill.status === 'paid' ? 'bg-secondary/10' : 'bg-primary/10'
                }`}>
                  <Receipt className={`w-6 h-6 ${
                    bill.status === 'paid' ? 'text-secondary' : 'text-primary'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{bill.category}</h3>
                  <p className="text-sm text-neutral-500">{bill.provider}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-neutral-800">{formatCurrency(bill.amount)}</p>
                  <p className="text-sm text-neutral-500">Due: {bill.due_date}</p>
                </div>

                <div className="flex items-center gap-2">
                  {bill.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-lg">
                      <Check className="w-4 h-4" />
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg">
                      Pending
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleMarkAsPaid(bill.id)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteBill(bill.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBills.length === 0 && (
        <div className="card text-center py-12">
          <Receipt className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">No bills found</h3>
          <p className="text-neutral-500">Try adjusting your filters or add a new bill</p>
        </div>
      )}
    </div>
  )
}



