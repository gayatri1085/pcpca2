# 🍜 FoodDash — Food Delivery Orders App

A React app for managing food delivery orders with filtering, order details, and statistics dashboard.

---

## 📁 Folder Structure

```
food-delivery-app/
├── public/
│   └── index.html
├── src/
│   ├── context/
│   │   └── OrdersContext.js      ← Global state (Context API)
│   ├── data/
│   │   └── orders.js             ← Sample order data
│   ├── pages/
│   │   ├── Orders.js             ← /orders route
│   │   ├── OrderDetail.js        ← /orders/:id route
│   │   ├── Filter.js             ← /filter route
│   │   └── Stats.js              ← /stats route
│   ├── reducers/
│   │   └── ordersReducer.js      ← Reducer for state management
│   ├── App.js                    ← Routes + Navbar
│   ├── App.css                   ← All styles
│   └── index.js                  ← Entry point
├── .gitignore
├── package.json
├── vercel.json                   ← Rewrite rules for Vercel SPA routing
└── README.md
```

---

## 🚀 Step-by-Step: Run Locally

### Step 1: Install Node.js
Download from https://nodejs.org (choose LTS version)

### Step 2: Clone or create the project
```bash
# If cloning from GitHub:
git clone https://github.com/YOUR_USERNAME/food-delivery-app.git
cd food-delivery-app

# OR create from scratch:
npx create-react-app food-delivery-app
cd food-delivery-app
# Then replace src/ and public/ with the files from this repo
```

### Step 3: Install dependencies
```bash
npm install react-router-dom
```

### Step 4: Start the development server
```bash
npm start
```
App runs at: http://localhost:3000

### Step 5: Build for production
```bash
npm run build
```

---

## 🌐 Step-by-Step: Deploy to Vercel from GitHub

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/food-delivery-app.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `food-delivery-app` repository
4. Vercel auto-detects React — leave settings as default
5. Click **"Deploy"**

### Step 3: Done!
Your app is live at `https://food-delivery-app-xxx.vercel.app`

> The `vercel.json` file handles client-side routing so direct URLs like `/orders/1001` work correctly.

---

## 🧪 Test IDs Reference

| Element            | data-testid         |
|--------------------|---------------------|
| Order list item    | `order-item`        |
| Filter input       | `filter-input`      |
| Total orders count | `total-orders`      |
| Delivered count    | `delivered-orders`  |
| Cancelled count    | `cancelled-orders`  |

---

## 🪟 window.appState (Stats Page)

When on `/stats`, the browser exposes:
```js
window.appState = {
  totalOrders,       // number
  deliveredOrders,   // number
  cancelledOrders,   // number
  pendingOrders,     // number
  totalRevenue,      // number
  avgRating,         // float
  deliveryRate       // float (percentage)
}
```

---

## 📍 Routes

| Route          | Description                             |
|----------------|-----------------------------------------|
| `/orders`      | All valid orders (ignores qty < 0)      |
| `/orders/:id`  | Full detail for a single order          |
| `/filter`      | Search/filter orders by any field       |
| `/stats`       | Dashboard with counts + window.appState |
