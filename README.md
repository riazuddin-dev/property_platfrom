# StaySphere - Premium Property Rental & Booking Platform

StaySphere is a state-of-the-art property rental and booking platform designed to connect tenants and property owners through a secure, transparent, and beautiful marketplace. It enables owners to list rental properties and tenants to discover, favorite, book, and pay reservation fees online.

## 🔗 Live Deployments
- **Front-End Live Link:** [https://property-platfrom.vercel.app](https://property-platfrom.vercel.app)
- **Back-End API Endpoint:** [https://staysphere-server.vercel.app](https://staysphere-server.vercel.app)

---

## 🎯 Purpose
The main purpose of StaySphere is to streamline the property renting process, eliminating middle-men and providing automated tools for:
1. **Tenants:** Finding premium verified listings, checking details, managing bookings, making secure reservation payments via Stripe, and reviewing properties.
2. **Owners:** Managing listed properties, viewing monthly earnings reports via interactive charts, moderating booking requests, and tracking revenue.
3. **Administrators:** Moderating properties (approving/rejecting with feedback), managing platform users, tracking all transactions, and monitoring system health.

---

## 🚀 Key Features

### 👤 Authentication & Authorization
- **JWT-Based Better Auth Session Manager:** Secure cookie and header session propagation.
- **Social Login:** Sign-in with Google, automatically registering new users as Tenants by default.
- **Role-Based Access Control (RBAC):** Strict navigation and route protection for Tenants, Owners, and Admins.

### 🏠 Property Listings & Discovery
- **Advanced Search & Filtering:** Filter by location, property type, min price, and max price via optimized backend queries.
- **Sorting:** Sort properties from price Low-to-High and High-to-Low.
- **Rich Details Page:** Displays images, locations, size, bed/bath count, and real-time reviews.

### 💳 Booking & Payment Integration
- **Stripe Payments:** Integrated with Stripe Payment Gateway for booking fees.
- **Real-Time Booking Status:** Monitor status as Pending, Approved, or Rejected.
- **Favorites System:** Save properties to a personalized wishlist.

### 📊 Owner Analytics & Moderation
- **Interactive Recharts Line Graph:** Visualizes monthly earnings for the last 12 months.
- **Admin Moderation Feedback:** Admin can reject a property with specific feedback, which is viewable by the Owner.

---

## 📦 Key npm Packages Used

### Core & Framework
- `next` (v16.2.9) - React framework with Server Components and App Router.
- `react` / `react-dom` (v19.2.4) - User interface rendering.

### State & Authentication
- `better-auth` (v1.6.19) - Premium authentication system.
- `react-hook-form` (v7.79.0) - Uncontrolled form validation.

### Payment & Styling
- `@stripe/stripe-js` & `@stripe/react-stripe-js` - Secure Stripe payment integration.
- `tailwindcss` (v4.0.0) - High-performance styling utility.
- `framer-motion` (v12.42.0) - Smooth visual animations.

### UI Enhancements & Charts
- `recharts` (v3.8.1) - Responsive line chart for owner analytics.
- `lucide-react` / `react-icons` - Modern visual icons.
- `sweetalert2` - Stylish confirm dialogs and alerts.
- `react-hot-toast` - Elegant status feedback.

---

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <client-repo-url> client
   git clone <server-repo-url> server
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the client directory:
   ```env
   BETTER_AUTH_SECRET=<secret-key>
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   MONGO_DB=<mongodb-uri>
   GOOGLE_CLIENT_ID=<google-id>
   GOOGLE_CLIENT_SECRET=<google-secret>
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_API_KEY=<imgbb-key>
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<stripe-pub-key>
   ```

3. **Install Dependencies and Run:**
   ```bash
   npm install
   npm run dev
   ```
