import mongoose from 'mongoose'

const insightSchema = new mongoose.Schema({
  householdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  type: {
    type: String,
    enum: ['warning', 'tip', 'prediction', 'comparison'],
    required: true
  },
  category: String,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  potentialSavings: {
    type: Number,
    default: 0
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.model('Insight', insightSchema)
