import express from 'express'
import Bill from '../models/Bill.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)

// Monthly summary
router.get('/monthly-summary', async (req, res) => {
  try {
    const { householdId, year, month } = req.query
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const bills = await Bill.find({
      householdId,
      dueDate: { $gte: startDate, $lte: endDate }
    })

    const total = bills.reduce((sum, bill) => sum + bill.amount, 0)
    const paid = bills.filter(b => b.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0)
    const pending = bills.filter(b => b.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0)

    res.json({
      success: true,
      data: { total, paid, pending, billCount: bills.length }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Category breakdown
router.get('/category-breakdown', async (req, res) => {
  try {
    const { householdId } = req.query
    const breakdown = await Bill.aggregate([
      { $match: { householdId: householdId } },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ])

    res.json({ success: true, data: breakdown })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
