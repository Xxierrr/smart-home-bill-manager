import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Receipt, Edit, Trash2, Check, X, Users } from 'lucide-react'
import { formatCurrency } from '../utils/currency'
import { db } from '../config/supabase'
import { useAuth } from '../context/AuthContext'

const defaultCategories = ['Electricity', 'Water', 'Gas', 'Internet', 'Rent', 'Groceries', 'Maintenance']

export default function BillsManager() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSplitModal, setShowSplitModal] = useState(false)
  const [selectedBillForSplit, setSelectedBillForSplit] = useState(null)
  const [splitType, setSplitType] = useState('equal') // 'equal' or 'custom'
  const [splitPeople, setSplitPeople] = useState(2)
  const [peopleData, setPeopleData] = useState([
    { name: '', amount: 0, paid: false },
    { name: '', amount: 0, paid: false }
  ])
  const [splitError, setSplitError] = useState('')
  const [billSplits, setBillSplits] = useState({}) // Store splits by bill_id
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
      
      // Load bill splits for each bill
      const splitsMap = {}
      for (const bill of (data || [])) {
        const split = await db.billSplits.getByBillId(bill.id)
        if (split) {
          splitsMap[bill.id] = split
        }
      }
      setBillSplits(splitsMap)
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

  const handleOpenSplitModal = async (bill) => {
    setSelectedBillForSplit(bill)
    setSplitError('')
    
    // Load existing split if any
    const existingSplit = billSplits[bill.id]
    if (existingSplit) {
      setSplitType(existingSplit.split_type)
      setSplitPeople(existingSplit.number_of_people)
      setPeopleData(existingSplit.people)
    } else {
      // Reset to defaults
      setSplitType('equal')
      setSplitPeople(2)
      const equalAmount = bill.amount / 2
      setPeopleData([
        { name: '', amount: equalAmount, paid: false },
        { name: '', amount: equalAmount, paid: false }
      ])
    }
    
    setShowSplitModal(true)
  }

  const handleSplitPeopleChange = (count) => {
    const newCount = Math.max(1, Math.min(20, count))
    setSplitPeople(newCount)
    
    if (splitType === 'equal') {
      const equalAmount = selectedBillForSplit.amount / newCount
      setPeopleData(Array(newCount).fill(null).map((_, i) => ({
        name: peopleData[i]?.name || '',
        amount: equalAmount,
        paid: peopleData[i]?.paid || false
      })))
    } else {
      // For custom, keep existing amounts or set to 0
      setPeopleData(Array(newCount).fill(null).map((_, i) => ({
        name: peopleData[i]?.name || '',
        amount: peopleData[i]?.amount || 0,
        paid: peopleData[i]?.paid || false
      })))
    }
  }

  const handleSplitTypeChange = (type) => {
    setSplitType(type)
    setSplitError('')
    
    if (type === 'equal') {
      const equalAmount = selectedBillForSplit.amount / splitPeople
      setPeopleData(peopleData.map(person => ({
        ...person,
        amount: equalAmount
      })))
    }
  }

  const handlePersonDataChange = (index, field, value) => {
    const newData = [...peopleData]
    newData[index] = { ...newData[index], [field]: value }
    setPeopleData(newData)
    
    // Clear error when user makes changes
    if (field === 'amount') {
      setSplitError('')
    }
  }

  const handlePersonPaidToggle = async (index) => {
    const newData = [...peopleData]
    newData[index].paid = !newData[index].paid
    setPeopleData(newData)
    
    // Save to database
    await handleSaveSplit()
  }

  const validateSplit = () => {
    if (splitPeople < 1) {
      setSplitError('Number of people must be at least 1')
      return false
    }
    
    if (splitType === 'custom') {
      const totalSplit = peopleData.reduce((sum, person) => sum + parseFloat(person.amount || 0), 0)
      const difference = Math.abs(totalSplit - selectedBillForSplit.amount)
      
      if (difference > 0.01) { // Allow 1 paisa difference for rounding
        setSplitError(`Total split (${formatCurrency(totalSplit)}) must equal bill amount (${formatCurrency(selectedBillForSplit.amount)})`)
        return false
      }
    }
    
    setSplitError('')
    return true
  }

  const handleSaveSplit = async () => {
    if (!validateSplit()) {
      return
    }
    
    try {
      const splitData = {
        bill_id: selectedBillForSplit.id,
        user_id: user.id,
        total_amount: selectedBillForSplit.amount,
        split_type: splitType,
        number_of_people: splitPeople,
        people: peopleData
      }
      
      const existingSplit = billSplits[selectedBillForSplit.id]
      
      if (existingSplit) {
        // Update existing split
        await db.billSplits.update(existingSplit.id, splitData)
      } else {
        // Create new split
        await db.billSplits.create(splitData)
      }
      
      // Reload splits
      const updatedSplit = await db.billSplits.getByBillId(selectedBillForSplit.id)
      setBillSplits({ ...billSplits, [selectedBillForSplit.id]: updatedSplit })
      
      alert('Bill split saved successfully!')
      setShowSplitModal(false)
    } catch (error) {
      console.error('Error saving split:', error)
      alert('Failed to save split. Please try again.')
    }
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">Bills Manager</h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-1">Manage all your household bills</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center justify-center gap-2 touch-manipulation"
        >
          <Plus className="w-5 h-5" />
          Add Bill
        </button>
      </div>

      {/* Split Bill Modal - Responsive */}
      {showSplitModal && selectedBillForSplit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-800">Split Bill</h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">{selectedBillForSplit.category} - {selectedBillForSplit.provider}</p>
              </div>
              <button 
                onClick={() => setShowSplitModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors touch-manipulation"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Total Amount - Responsive */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 sm:p-6 text-center">
                <p className="text-xs sm:text-sm text-neutral-600 mb-2">Total Bill Amount (Read-only)</p>
                <p className="text-2xl sm:text-4xl font-bold text-neutral-800">{formatCurrency(selectedBillForSplit.amount)}</p>
              </div>

              {/* Split Type Selection - Responsive */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">Split Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSplitTypeChange('equal')}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all touch-manipulation ${
                      splitType === 'equal'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-semibold mb-1 text-sm sm:text-base">Equal Split</div>
                    <div className="text-xs sm:text-sm text-neutral-500">Divide equally among all</div>
                  </button>
                  <button
                    onClick={() => handleSplitTypeChange('custom')}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all touch-manipulation ${
                      splitType === 'custom'
                        ? 'border-secondary bg-secondary/5 text-secondary'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-semibold mb-1 text-sm sm:text-base">Custom Split</div>
                    <div className="text-xs sm:text-sm text-neutral-500">Set custom amounts</div>
                  </button>
                </div>
              </div>

              {/* Number of People - Responsive */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">Number of People</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => handleSplitPeopleChange(splitPeople - 1)}
                      className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center font-bold text-neutral-700 transition-colors touch-manipulation"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={splitPeople}
                      onChange={(e) => handleSplitPeopleChange(parseInt(e.target.value) || 1)}
                      min="1"
                      max="20"
                      className="input-field text-center text-lg sm:text-xl font-bold w-20"
                    />
                    <button
                      onClick={() => handleSplitPeopleChange(splitPeople + 1)}
                      className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center font-bold text-neutral-700 transition-colors touch-manipulation"
                    >
                      +
                    </button>
                  </div>
                  {splitType === 'equal' && (
                    <div className="flex-1 text-center sm:text-right bg-secondary/5 rounded-lg p-3">
                      <p className="text-xs sm:text-sm text-neutral-500">Per Person</p>
                      <p className="text-xl sm:text-2xl font-bold text-secondary">{formatCurrency(selectedBillForSplit.amount / splitPeople)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {splitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {splitError}
                </div>
              )}

              {/* People Details - Responsive */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">People Details</label>
                <div className="space-y-3">
                  {peopleData.map((person, index) => (
                    <div key={index} className="bg-neutral-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0 text-sm sm:text-base">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={person.name}
                          onChange={(e) => handlePersonDataChange(index, 'name', e.target.value)}
                          placeholder={`Person ${index + 1} name (optional)`}
                          className="input-field flex-1 text-sm sm:text-base"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex-1">
                          <label className="block text-xs text-neutral-500 mb-1">Amount</label>
                          <input
                            type="number"
                            value={person.amount}
                            onChange={(e) => handlePersonDataChange(index, 'amount', parseFloat(e.target.value) || 0)}
                            disabled={splitType === 'equal'}
                            placeholder="0.00"
                            step="0.01"
                            className={`input-field text-sm sm:text-base ${splitType === 'equal' ? 'bg-neutral-100 cursor-not-allowed' : ''}`}
                          />
                        </div>
                        <div className="flex items-center gap-2 sm:self-end sm:pb-2">
                          <label className="flex items-center gap-2 cursor-pointer touch-manipulation">
                            <input
                              type="checkbox"
                              checked={person.paid}
                              onChange={() => handlePersonPaidToggle(index)}
                              className="w-5 h-5 text-secondary border-neutral-300 rounded focus:ring-secondary"
                            />
                            <span className="text-sm text-neutral-600">Paid</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Split Summary */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Split Summary
                </h3>
                <div className="space-y-3">
                  {peopleData.map((person, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">
                            {person.name || `Person ${index + 1}`}
                          </span>
                          {person.paid && (
                            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-secondary bg-secondary/10 rounded">
                              <Check className="w-3 h-3" />
                              Paid
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-lg font-bold text-neutral-800">
                        {formatCurrency(person.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Summary */}
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between items-center text-sm text-neutral-600 mb-2">
                  <span>Total Amount:</span>
                  <span className="font-semibold">{formatCurrency(selectedBillForSplit.amount)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral-600 mb-2">
                  <span>Total Split:</span>
                  <span className={`font-semibold ${
                    Math.abs(peopleData.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) - selectedBillForSplit.amount) > 0.01
                      ? 'text-red-600'
                      : 'text-secondary'
                  }`}>
                    {formatCurrency(peopleData.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral-600 mb-2">
                  <span>Number of People:</span>
                  <span className="font-semibold">{splitPeople}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral-600 mb-2">
                  <span>Paid:</span>
                  <span className="font-semibold text-secondary">
                    {peopleData.filter(p => p.paid).length} / {splitPeople}
                  </span>
                </div>
              </div>

              {/* Action Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleSaveSplit}
                  className="btn-primary flex-1 touch-manipulation"
                >
                  Save Split
                </button>
                <button 
                  onClick={() => setShowSplitModal(false)}
                  className="btn-secondary flex-1 touch-manipulation"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Bill Modal - Responsive */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800">Add New Bill</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors touch-manipulation"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
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

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={handleAddBill}
                  className="btn-primary flex-1 touch-manipulation"
                >
                  Add Bill
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1 touch-manipulation"
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

      {/* Bills List - Responsive */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {filteredBills.map((bill) => (
          <div key={bill.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-4">
              {/* Top section - Bill info */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  bill.status === 'paid' ? 'bg-secondary/10' : 'bg-primary/10'
                }`}>
                  <Receipt className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    bill.status === 'paid' ? 'text-secondary' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-800 text-sm sm:text-base truncate">{bill.category}</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 truncate">{bill.provider}</p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">Due: {bill.due_date}</p>
                  {billSplits[bill.id] && (
                    <p className="text-xs text-secondary font-medium mt-1">
                      Split among {billSplits[bill.id].number_of_people} people
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg sm:text-2xl font-bold text-neutral-800">{formatCurrency(bill.amount)}</p>
                  {bill.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-secondary bg-secondary/10 rounded-lg mt-2">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      Paid
                    </span>
                  ) : (
                    <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-amber-700 bg-amber-100 rounded-lg mt-2">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom section - Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button 
                  onClick={() => handleOpenSplitModal(bill)}
                  className="p-2 hover:bg-secondary/10 rounded-lg transition-colors touch-manipulation"
                  title="Split Bill"
                >
                  <Users className="w-5 h-5 text-secondary" />
                </button>
                <button 
                  onClick={() => handleMarkAsPaid(bill.id)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors touch-manipulation"
                  title="Mark as Paid"
                >
                  {bill.status === 'paid' ? (
                    <Check className="w-5 h-5 text-secondary" />
                  ) : (
                    <Edit className="w-5 h-5 text-neutral-600" />
                  )}
                </button>
                <button 
                  onClick={() => handleDeleteBill(bill.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
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



