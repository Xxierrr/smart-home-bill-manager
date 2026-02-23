import express from 'express'
import Household from '../models/Household.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)

// Create household
router.post('/', async (req, res) => {
  try {
    const household = await Household.create({ ...req.body, userId: req.user._id })
    res.status(201).json({ success: true, data: household })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get household
router.get('/:id', async (req, res) => {
  try {
    const household = await Household.findById(req.params.id)
    res.json({ success: true, data: household })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update household
router.put('/:id', async (req, res) => {
  try {
    const household = await Household.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: household })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
