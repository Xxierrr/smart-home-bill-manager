import express from 'express'
import Insight from '../models/Insight.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)

// Get insights
router.get('/', async (req, res) => {
  try {
    const { householdId } = req.query
    const insights = await Insight.find({ householdId }).sort({ createdAt: -1 })
    res.json({ success: true, data: insights })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const insight = await Insight.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
    res.json({ success: true, data: insight })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
