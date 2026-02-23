import mongoose from 'mongoose'

const billSchema = new mongoose.Schema({
  householdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  category: {
    type: String,
    enum: ['electricity', 'water', 'gas', 'internet', 'rent', 'groceries', 'maintenance'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidDate: Date,
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    default: 'monthly'
  },
  provider: String,
  accountNumber: String,
  notes: String,
  billImageUrl: String
}, {
  timestamps: true
})

// Index for efficient queries
billSchema.index({ householdId: 1, dueDate: 1 })
billSchema.index({ householdId: 1, status: 1 })

export default mongoose.model('Bill', billSchema)
