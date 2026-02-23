import mongoose from 'mongoose'

const householdSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  numberOfRooms: {
    type: Number,
    default: 1
  },
  numberOfResidents: {
    type: Number,
    default: 1
  },
  houseType: {
    type: String,
    enum: ['apartment', 'house', 'condo', 'other'],
    default: 'apartment'
  },
  squareFootage: Number
}, {
  timestamps: true
})

export default mongoose.model('Household', householdSchema)
