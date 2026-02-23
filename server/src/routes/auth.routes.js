import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    const user = await User.create({ email, password, firstName, lastName })
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, data: req.user })
})

// Update user profile
router.put('/update', protect, async (req, res) => {
  try {
    const { firstName, lastName, phone, preferences } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, preferences },
      { new: true, runValidators: true }
    ).select('-password')
    
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
