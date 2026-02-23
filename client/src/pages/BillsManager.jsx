import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Receipt, Edit, Trash2, Check, X } from 'lucide-react'
import { formatCurrency } from '../utils/currency'

const initialMockBills = [
  { id: 1, category: 'Electricity', amount: 2800, dueDate: '2026-02-25', status: 'pending', provider: 'BESCOM' },
  { id: 2, category: 'Water', amount: 650, dueDate: '2026-03-01', status: 'pending', provider: 'BWSSB' },
  { id: 3, category: 'Internet', amount: 599, dueDate: '2026-02-28', status: 'pending', provider: 'Airtel' },
  { id: 4, category: 'Gas', amount: 1200, dueDate: '2026-02-20', status: 'paid', provider: 'Indane Gas' },
  { id: 5, category: 'Rent', amount: 8000, dueDate: '2026-02-01', status: 'paid', provider: 'Landlord' },
]

const defaultCategories = ['Electricity', 'Water', 'Gas', 'Internet', 'Rent', 'Groceries', 'Maintenance']

export default function BillsManager() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [bills, setBills] = useState(initialMockBills)
  const [categories, setCategories] = useState(defaultCategories)
  const [showCustomCategory, setShowCustomCategory] = useState(false)
  const [customCategory, setCustomCategory] = useState('')
  const [newBill, setNewBill] = useState({
    category: 'Electricity',
    amount: '',
    dueDate: '',
    provider: '',
    status: 'pending'
  })

  // Load bills and categories from localStorage on mount
  useEffect(() => {
    const savedBills = localStorage.getItem('bills')
    if (savedBills) {
      setBills(JSON.parse(savedBills))
    }
    
    const savedCategories = localStorage.getItem('billCategories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBill(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddBill = () => {
    if (!newBill.amount || !newBill.dueDate || !newBill.provider) {
      alert('Please fill in all required fields')
      return
    }

    const billToAdd = {
      id: Date.now(),
      category: newBill.category,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      provider: newBill.provider,
      status: newBill.status
    }

    const updatedBills = [...bills, billToAdd]
    setBills(updatedBills)
    localStorage.setItem('bills', JSON.stringify(updatedBills))

    // Reset form
    setNewBill({
      category: 'Electricity',
      amount: '',
      dueDate: '',
      provider: '',
      status: 'pending'
    })
    setShowAddModal(false)
    alert('Bill added successfully!')
  }

  const handleDeleteBill = (id) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      const updatedBills = bills.filter(bill => bill.id !== id)
      setBills(updatedBills)
      localStorage.setItem('bills', JSON.stringify(updatedBills))
    }
  }

  const handleMarkAsPaid = (id) => {
    const updatedBills = bills.map(bill => 
      bill.id === id ? { ...bill, status: 'paid' } : bill
    )
    setBills(updatedBills)
    localStorage.setItem('bills', JSON.stringify(updatedBills))
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
                  name="dueDate"
                  value={newBill.dueDate}
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
                  <p className="text-sm text-neutral-500">Due: {bill.dueDate}</p>
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



