import express from 'express'
import Bill from '../models/Bill.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

// All routes are protected
router.use(protect)

// Create bill
router.post('/', async (req, res) => {
  try {
    const bill = await Bill.create(req.body)
    res.status(201).json({ success: true, data: bill })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all bills
router.get('/', async (req, res) => {
  try {
    const { householdId, status, category, startDate, endDate } = req.query
    const filter = {}

    if (householdId) filter.householdId = householdId
    if (status) filter.status = status
    if (category) filter.category = category
    if (startDate || endDate) {
      filter.dueDate = {}
      if (startDate) filter.dueDate.$gte = new Date(startDate)
      if (endDate) filter.dueDate.$lte = new Date(endDate)
    }

    const bills = await Bill.find(filter).sort({ dueDate: -1 })
    res.json({ success: true, data: bills })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get upcoming bills
router.get('/upcoming', async (req, res) => {
  try {
    const { householdId } = req.query
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    const bills = await Bill.find({
      householdId,
      status: 'pending',
      dueDate: { $gte: today, $lte: nextWeek }
    }).sort({ dueDate: 1 })

    res.json({ success: true, data: bills })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update bill
router.put('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: bill })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Mark as paid
router.patch('/:id/pay', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { status: 'paid', paidDate: new Date() },
      { new: true }
    )
    res.json({ success: true, data: bill })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete bill
router.delete('/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Bill deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
