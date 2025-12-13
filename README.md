![Logo](./public/FFFFFF-1.png)
# Commodities Management System

A web application for managing products and inventory. It includes user authentication, role-based access control, a dashboard with charts, and product management features.

---

## 📋 What I Created

This is a **Commodities Management System** built with Next.js. It allows users to:

- **Login** securely using Clerk authentication
- **View and manage products** (add, edit, delete products)
- **See analytics** on a dashboard with charts and statistics (for Managers only)
- **Switch between light and dark themes**
- **Access different features** based on user role (Manager or Store Keeper)

---

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety

### Authentication
- **Clerk** - User authentication and login

### UI & Styling
- **Tailwind CSS** - Styling
- **shadcn/ui** - Pre-built components
- **Lucide React** - Icons
- **next-themes** - Dark/light mode

### Charts & Data
- **Recharts** - Charts and graphs
- **TanStack Table** - Data tables

### Forms
- **React Hook Form** - Form handling
- **Zod** - Form validation

### Other
- **localStorage** - Save data in browser
- **React Context** - Manage app state

---

## ✨ Features Implemented

### 1. Authentication
- Login with email and password
- OTP verification for new users
- Protected routes (can't access without login)

### 2. Role-Based Access
- **Manager**: Can access everything including dashboard
- **Store Keeper**: Can access products but not dashboard
- Sidebar menu changes based on role

### 3. Dashboard (Manager Only)
- KPI cards showing key metrics
- Multiple charts (bar charts, line charts, stacked bars)
- Overview section with sales data
- Recent sales table

### 4. Product Management
- View all products in a table
- Add new products
- Edit existing products
- Delete products
- Filter by category
- Sort by columns
- Download products (CSV, Excel, PDF)
- Pagination

### 5. UI Features
- Light/Dark mode toggle
- Responsive design (works on mobile, tablet, desktop)
- Toast notifications
- Fixed header and sidebar

---

## 🚀 How to Run Locally

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

1. Create a file named `.env.local` in the root folder
2. Add these lines:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

3. Get your Clerk keys:
   - Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
   - Sign up or login
   - Create a new application
   - Go to "API Keys" section
   - Copy the Publishable Key and Secret Key
   - Paste them in your `.env.local` file

### Step 3: Run the Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Check code for errors

---
