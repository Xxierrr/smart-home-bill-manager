import express from 'express'
import Bill from '../models/Bill.model.js'
import Household from '../models/Household.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)

// Get dashboard overview
router.get('/overview', async (req, res) => {
  try {
    const { householdId } = req.query
    const household = await Household.findById(householdId)
    
    const currentMonth = new Date()
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    const bills = await Bill.find({
      householdId,
      dueDate: { $gte: startOfMonth, $lte: endOfMonth }
    })

    const totalExpenses = bills.reduce((sum, bill) => sum + bill.amount, 0)
    const upcomingBills = bills.filter(b => b.status === 'pending').length
    const costPerResident = household ? totalExpenses / household.numberOfResidents : 0

    res.json({
      success: true,
      data: {
        totalExpenses,
        upcomingBills,
        costPerResident: costPerResident.toFixed(2),
        bills: bills.slice(0, 5)
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
