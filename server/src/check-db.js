import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.model.js'
import Household from './models/Household.model.js'
import Bill from './models/Bill.model.js'
import Insight from './models/Insight.model.js'

dotenv.config()

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected Successfully!\n')

    const userCount = await User.countDocuments()
    const householdCount = await Household.countDocuments()
    const billCount = await Bill.countDocuments()
    const insightCount = await Insight.countDocuments()

    console.log('📊 Database Statistics:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`👤 Users: ${userCount}`)
    console.log(`🏠 Households: ${householdCount}`)
    console.log(`💰 Bills: ${billCount}`)
    console.log(`💡 Insights: ${insightCount}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (billCount > 0) {
      console.log('📋 Sample Bills:')
      const bills = await Bill.find().limit(3)
      bills.forEach(bill => {
        console.log(`   • ${bill.category}: ₹${bill.amount.toLocaleString('en-IN')} - ${bill.provider || 'N/A'}`)
      })
      console.log('')
    }

    if (userCount > 0) {
      console.log('👥 Users in Database:')
      const users = await User.find().select('email firstName lastName')
      users.forEach(user => {
        console.log(`   • ${user.email} (${user.firstName} ${user.lastName})`)
      })
      console.log('')
    }

    console.log('✅ Your database is working perfectly!')
    console.log('📍 Data Location: C:\\data\\db (or MongoDB default location)')
    console.log('🌐 Database URL:', process.env.MONGODB_URI)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message)
    process.exit(1)
  }
}

checkDatabase()
