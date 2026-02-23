# API Endpoints Documentation

## Base URL: `/api/v1`

## Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user
- `PUT /auth/password` - Update password

## Households
- `POST /households` - Create household
- `GET /households/:id` - Get household details
- `PUT /households/:id` - Update household
- `DELETE /households/:id` - Delete household
- `GET /households/:id/summary` - Get household summary stats

## Appliances
- `POST /households/:id/appliances` - Add appliance
- `GET /households/:id/appliances` - List all appliances
- `PUT /appliances/:id` - Update appliance
- `DELETE /appliances/:id` - Delete appliance

## Bills
- `POST /bills` - Create new bill
- `GET /bills` - List bills (with filters: status, category, date range)
- `GET /bills/:id` - Get bill details
- `PUT /bills/:id` - Update bill
- `DELETE /bills/:id` - Delete bill
- `PATCH /bills/:id/pay` - Mark bill as paid
- `POST /bills/:id/upload` - Upload bill image
- `GET /bills/upcoming` - Get upcoming bills
- `GET /bills/overdue` - Get overdue bills

## Analytics
- `GET /analytics/monthly-summary` - Monthly expense summary
- `GET /analytics/category-breakdown` - Spending by category
- `GET /analytics/trends` - Monthly trends (6-12 months)
- `GET /analytics/comparison` - Compare current vs previous period
- `GET /analytics/yearly-report` - Annual report
- `GET /analytics/cost-per-resident` - Per capita expenses

## Insights
- `GET /insights` - Get smart insights
- `GET /insights/savings-tips` - Get personalized saving tips
- `GET /insights/predictions` - Get next month predictions
- `PATCH /insights/:id/read` - Mark insight as read
- `POST /insights/generate` - Trigger insight generation

## Alerts
- `GET /alerts` - Get all alerts
- `GET /alerts/unread` - Get unread alerts
- `PATCH /alerts/:id/read` - Mark alert as read
- `DELETE /alerts/:id` - Delete alert

## Reports
- `GET /reports/monthly/:year/:month` - Generate monthly report
- `GET /reports/download/:year/:month` - Download PDF report
- `GET /reports/export` - Export data (CSV/Excel)

## Dashboard
- `GET /dashboard/overview` - Complete dashboard data
- `GET /dashboard/widgets` - Individual widget data
