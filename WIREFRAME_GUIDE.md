# UI Wireframe & Layout Guide

## Overall Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER (64px)                        │
│  [Menu] ............................ [🔔] [User Profile]    │
└─────────────────────────────────────────────────────────────┘
│         │                                                     │
│ SIDEBAR │              MAIN CONTENT AREA                     │
│ (256px) │                                                     │
│         │                                                     │
│  🏠     │  ┌─────────────────────────────────────────────┐  │
│  📊     │  │                                             │  │
│  📈     │  │         Page Content                        │  │
│  💡     │  │                                             │  │
│  🏡     │  │                                             │  │
│  ⚙️     │  │                                             │  │
│         │  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Dashboard Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                                                   │
│  Welcome back! Here's your household overview               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Total    │  │ Upcoming │  │ Cost per │  │ Potential│  │
│  │ Expenses │  │ Bills    │  │ Resident │  │ Savings  │  │
│  │ $1,830   │  │    3     │  │  $458    │  │  $120    │  │
│  │ ↓ 6.2%   │  │          │  │          │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────┐  ┌──────────────────────┐  │
│  │  Monthly Trend             │  │  Category Breakdown  │  │
│  │                            │  │                      │  │
│  │  [Line Chart]              │  │  [Pie Chart]         │  │
│  │                            │  │                      │  │
│  │                            │  │  • Electricity $320  │  │
│  │                            │  │  • Water $80         │  │
│  └────────────────────────────┘  └──────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Upcoming Bills                              [View All]     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 Electricity Bill      Due: 2026-02-25    $320     │  │
│  │ 📄 Internet Bill         Due: 2026-02-28     $60     │  │
│  │ 📄 Water Bill            Due: 2026-03-01     $80     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Bills Manager Page

```
┌─────────────────────────────────────────────────────────────┐
│  Bills Manager                              [+ Add Bill]    │
│  Manage all your household bills                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔍 Search bills...                                   │  │
│  │                                                       │  │
│  │ [All] [Electricity] [Water] [Gas] [Internet] ...    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 Electricity    City Power                         │  │
│  │                   Due: 2026-02-25                     │  │
│  │                                      $320   [Pending] │  │
│  │                                      [Edit] [Delete]  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 Water          Water Dept                         │  │
│  │                   Due: 2026-03-01                     │  │
│  │                                       $80   [Pending] │  │
│  │                                      [Edit] [Delete]  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Analytics Page

```
┌─────────────────────────────────────────────────────────────┐
│  Analytics                    [Last 6 Months] [Export]     │
│  Detailed insights into your spending patterns              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ Average  │  │ Highest  │  │ Total    │                 │
│  │ Monthly  │  │ Category │  │ Saved    │                 │
│  │ $1,213   │  │   Rent   │  │  $720    │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Monthly Comparison                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  [Bar Chart - Current vs Previous Year]              │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Category Trends                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  [Multi-line Chart - Categories over time]           │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Smart Insights Page

```
┌─────────────────────────────────────────────────────────────┐
│  Smart Insights                                             │
│  AI-powered recommendations to reduce your bills            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  💰 Total Potential Savings                          │  │
│  │      $120 per month                                   │  │
│  │      if you follow all tips                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────┐  ┌────────────────────┐           │
│  │ ↓ Electricity      │  │ ⚠️ Water Bill      │           │
│  │   Usage Decreased  │  │   Higher Than      │           │
│  │                    │  │   Usual            │           │
│  │ Your bill is 9%    │  │ Check for leaks    │           │
│  │ lower this month   │  │                    │           │
│  │                    │  │ [High Priority]    │           │
│  │ Savings: $32/mo    │  └────────────────────┘           │
│  └────────────────────┘                                    │
│                                                              │
│  ┌────────────────────┐  ┌────────────────────┐           │
│  │ 💡 Switch to LED   │  │ 🎯 Next Month      │           │
│  │    Bulbs           │  │    Forecast        │           │
│  │                    │  │                    │           │
│  │ Could save $18/mo  │  │ Expenses: ~$1,150  │           │
│  └────────────────────┘  └────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## House Profile Page

```
┌─────────────────────────────────────────────────────────────┐
│  House Profile                          [Edit Profile]      │
│  Manage your household information                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 🏠 House │  │ 👥 Resi- │  │ 🏠 Rooms │  │ 📍 Loca- │  │
│  │    Type  │  │    dents │  │          │  │    tion  │  │
│  │ Apartment│  │ 4 People │  │ 3 Bedroom│  │ San Fran │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Address                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Street: 123 Main Street, Apt 4B                      │  │
│  │ City: San Francisco    State: California             │  │
│  │ ZIP: 94102                                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Appliance Inventory                    [+ Add Appliance]  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Appliance      Category  Wattage  Hours  Cost/Mo     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ⚡ AC          Cooling   3500W     8h     $84        │  │
│  │ ⚡ Fridge      Kitchen    150W    24h     $11        │  │
│  │ ⚡ Washer      Laundry    500W     2h      $3        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Total Estimated Monthly Cost: $135.60                     │
└─────────────────────────────────────────────────────────────┘
```

## Color Usage Guide

### Primary Blue (#2563EB)
- Primary buttons
- Active sidebar items
- Links and interactive elements
- Chart primary lines
- Icons in blue cards

### Secondary Green (#10B981)
- Success states
- Savings indicators
- Positive metrics (decreased bills)
- Success buttons
- Paid status badges

### Neutral Colors
- #F3F4F6: Page background, card backgrounds
- #1F2937: Headings and primary text
- #6B7280: Secondary text, labels
- #E5E7EB: Borders, dividers

### Semantic Colors
- Amber (#F59E0B): Pending status, warnings
- Red (#EF4444): Overdue bills, high priority alerts
- Purple (#8B5CF6): Special features, predictions

## Responsive Breakpoints

- Mobile: < 640px (1 column grid)
- Tablet: 640px - 1024px (2 column grid)
- Desktop: > 1024px (3-4 column grid)

## Component Spacing

- Card padding: 24px (1.5rem)
- Grid gap: 24px (1.5rem)
- Section spacing: 32px (2rem)
- Button padding: 12px 24px
- Input padding: 12px 16px
