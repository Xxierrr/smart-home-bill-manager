# 🏠 SmartHome Bill Manager

An intelligent home management platform that provides complete insights about your household and helps you monitor, analyze, and reduce monthly bills.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

SmartHome Bill Manager is a modern, scalable web application designed to give families and individuals full visibility into household expenses. Track electricity, water, gas, internet, rent, groceries, and maintenance costs all in one place.

## ✨ Key Features

### 📊 Smart Dashboard
- Real-time expense overview
- Upcoming bills tracking
- Category spending breakdown
- Monthly trends visualization
- Cost per resident analysis
- Savings indicators

### 💡 Bill Management
- Add, edit, and delete bills
- 7 bill categories supported
- Upload bill images
- Paid/Pending status tracking
- Recurring bill automation
- Due date reminders

### 📈 Analytics & Insights
- Interactive charts and graphs
- Monthly/yearly comparisons
- Expense trend analysis
- Unusual bill detection
- Personalized saving tips
- Next month predictions

### 🏡 House Profile
- Room and appliance inventory
- Resident count tracking
- Energy consumption estimates
- Location-based insights

### 🔔 Smart Alerts
- Due date notifications
- Overspending warnings
- High bill alerts
- Custom reminders

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563EB` - Trust & Technology
- **Secondary Green**: `#10B981` - Savings & Sustainability
- **Base White**: `#FFFFFF` - Clean backgrounds
- **Neutral Grays**: `#F3F4F6`, `#1F2937`, `#6B7280`

### Design Philosophy
- Minimalist dashboard aesthetic (Stripe/Notion inspired)
- Spacious layouts with rounded cards
- Soft shadows and smooth transitions
- Professional fintech-style interface
- Strong visual hierarchy

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Axios** - API calls
- **React Hook Form** - Form management

### Backend
- **Supabase** - Cloud database & authentication
- **PostgreSQL** - Database (via Supabase)
- **Row Level Security** - Data protection
- **JWT** - Session tokens

## 📁 Project Structure

```
smarthome-bill-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   └── utils/         # Utilities
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── services/      # Business logic
│   └── package.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Supabase account (free tier works)
- npm or yarn

### Quick Setup (5 minutes)

1. **Disable Email Confirmation in Supabase**
   - Go to https://supabase.com/dashboard
   - Select project: `phvledkxkjvoqvzrylpw`
   - Click **Authentication** → **Providers** → **Email**
   - Toggle OFF "Confirm email"
   - Click **Save changes**

2. **Install Dependencies**
```bash
cd client
npm install
```

3. **Start the App**
```bash
npm run dev
```

4. **Open & Test**
   - Open http://localhost:5173
   - Click "Create Account"
   - Register with your email
   - You'll be logged in immediately

### How Login Data is Stored

Your authentication uses **Supabase** (cloud database):

- **Email & Password** → `auth.users` table (password hashed with bcrypt)
- **Name & Profile** → `profiles` table (auto-created on signup)
- **Session Token** → Browser localStorage (auto-refreshes, persists across page refreshes)

**Security:**
- Passwords are hashed (never stored as plain text)
- Row Level Security (RLS) enabled
- Users can only access their own data
- JWT tokens with auto-refresh

See `HOW_LOGIN_DATA_IS_STORED.md` for detailed explanation.

## 📚 Documentation

- [API Endpoints](./API_ENDPOINTS.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [MVP Roadmap](./MVP_ROADMAP.md)

## 🎯 MVP Features (Phase 1)

- ✅ User authentication
- ✅ Household profile management
- ✅ Bill CRUD operations
- ✅ Dashboard with key metrics
- ✅ Basic analytics
- ✅ Due date alerts
- ✅ Mobile responsive design

## 🌟 Upcoming Features (Phase 2)

- AI-powered insights
- Bill image OCR
- Appliance energy tracking
- Multi-household support
- Advanced reporting
- Bank integrations
- Dark mode

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is licensed under the MIT License.

## 👥 Target Users

- Families managing household expenses
- Individuals tracking personal bills
- Roommates sharing utility costs
- Property managers overseeing multiple units
- Anyone looking to reduce monthly expenses

## 💰 Value Proposition

- **Save Money**: Identify high bills and get actionable savings tips
- **Save Time**: Automate bill tracking and reminders
- **Gain Insights**: Understand spending patterns with visual analytics
- **Stay Organized**: Never miss a payment with smart alerts
- **Make Decisions**: Data-driven insights for better financial choices

## 📞 Support

For support, email support@smarthomebills.com or open an issue on GitHub.

---

Built with ❤️ for smarter home management
