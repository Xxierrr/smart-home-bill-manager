import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.model.js'
import Household from './models/Household.model.js'
import Bill from './models/Bill.model.js'
import Insight from './models/Insight.model.js'

dotenv.config()

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    // Clear existing data
    await User.deleteMany({})
    await Household.deleteMany({})
    await Bill.deleteMany({})
    await Insight.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Create sample user
    const user = await User.create({
      email: 'demo@smarthome.com',
      password: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
      phone: '+91 9876543210',
      preferences: {
        currency: 'INR',
        theme: 'light',
        notifications: true
      }
    })
    console.log('👤 Created user:', user.email)

    // Create household
    const household = await Household.create({
      userId: user._id,
      name: 'My Home',
      address: {
        street: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        country: 'India'
      },
      numberOfRooms: 3,
      numberOfResidents: 4,
      houseType: 'apartment',
      squareFootage: 1200
    })
    console.log('🏠 Created household:', household.name)

    // Create bills
    const bills = await Bill.insertMany([
      {
        householdId: household._id,
        category: 'electricity',
        amount: 2800,
        dueDate: new Date('2026-02-25'),
        status: 'pending',
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'BESCOM',
        accountNumber: 'ELEC123456'
      },
      {
        householdId: household._id,
        category: 'water',
        amount: 650,
        dueDate: new Date('2026-03-01'),
        status: 'pending',
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'BWSSB',
        accountNumber: 'WAT789012'
      },
      {
        householdId: household._id,
        category: 'internet',
        amount: 599,
        dueDate: new Date('2026-02-28'),
        status: 'pending',
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'Airtel',
        accountNumber: 'NET345678'
      },
      {
        householdId: household._id,
        category: 'gas',
        amount: 1200,
        dueDate: new Date('2026-03-05'),
        status: 'pending',
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'Indane Gas',
        accountNumber: 'GAS901234'
      },
      {
        householdId: household._id,
        category: 'rent',
        amount: 8000,
        dueDate: new Date('2026-03-01'),
        status: 'paid',
        paidDate: new Date('2026-02-28'),
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'Landlord'
      },
      {
        householdId: household._id,
        category: 'groceries',
        amount: 4500,
        dueDate: new Date('2026-02-20'),
        status: 'paid',
        paidDate: new Date('2026-02-20'),
        isRecurring: false,
        provider: 'BigBasket'
      },
      // Previous month bills
      {
        householdId: household._id,
        category: 'electricity',
        amount: 3200,
        dueDate: new Date('2026-01-25'),
        status: 'paid',
        paidDate: new Date('2026-01-24'),
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'BESCOM'
      },
      {
        householdId: household._id,
        category: 'water',
        amount: 580,
        dueDate: new Date('2026-01-28'),
        status: 'paid',
        paidDate: new Date('2026-01-27'),
        isRecurring: true,
        recurringFrequency: 'monthly',
        provider: 'BWSSB'
      }
    ])
    console.log(`💰 Created ${bills.length} bills`)

    // Create insights
    const insights = await Insight.insertMany([
      {
        householdId: household._id,
        type: 'warning',
        category: 'electricity',
        title: 'High Electricity Usage',
        description: 'Your electricity consumption is 15% higher than last month. Consider checking for appliances left on.',
        potentialSavings: 420,
        priority: 'high',
        isRead: false
      },
      {
        householdId: household._id,
        type: 'tip',
        category: 'water',
        title: 'Water Conservation Tip',
        description: 'Installing aerators on taps can reduce water usage by up to 30%, saving approximately ₹200/month.',
        potentialSavings: 200,
        priority: 'medium',
        isRead: false
      },
      {
        householdId: household._id,
        type: 'prediction',
        title: 'Monthly Expense Forecast',
        description: 'Based on current trends, your total expenses for next month are estimated at ₹18,500.',
        potentialSavings: 0,
        priority: 'low',
        isRead: false
      },
      {
        householdId: household._id,
        type: 'comparison',
        category: 'internet',
        title: 'Better Internet Plan Available',
        description: 'Similar households are using plans that cost ₹100 less per month with better speeds.',
        potentialSavings: 100,
        priority: 'medium',
        isRead: false
      }
    ])
    console.log(`💡 Created ${insights.length} insights`)

    console.log('\n✅ Database seeded successfully!')
    console.log('\n📝 Login credentials:')
    console.log('   Email: demo@smarthome.com')
    console.log('   Password: demo123')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()
