# Campus Cravings — CGC University, Mohali 🍽️

> **Skip the Queue. Enjoy Your Break.**
> A modern, production-quality, responsive web application built for students, faculty, and staff of **CGC University, Mohali** (Punjab) to pre-order food from campus cafeterias, kiosks, and food outlets, track order progress, and collect meals without waiting in long lecture-break queues.

---

## 🌟 Key Features

1. **14 Verified Campus Outlets (Exact Names Preserved)**:
   - **Applebeez** (Block 2 Food Court)
   - **Topn n Town for Hunger** (Student Plaza)
   - **Easy Day** (Near Boys Hostel)
   - **Kulhad** (Central Lawn Kiosk)
   - **Tuckshop** (Engineering Block 3)
   - **Dominos** (Food Court 1st Floor)
   - **Nescafe** (Library Quadrangle)
   - **Canteen** (Main Central Canteen)
   - **Buddys Bistro** (Management Block Food Street)
   - **Chutar Putar** (Amphitheatre Corner)
   - **Food Court** (Main Academic Block)
   - **Sip n Bites** (Sports Complex & Gym)
   - **X Burgers** (Student Center Ground Floor)
   - **Thick let to** (Girls Hostel Commercial Complex)

2. **Mobile-First Responsive Design**:
   - **Desktop Layout**: Professional header with campus location badge, search bar trigger (`⌘K`), cart drawer counter, and student profile navigation.
   - **Mobile Layout**: Sticky bottom navigation bar with icons for Home, Outlets, Cart, Orders, and Profile.

3. **Color Palette & Design Philosophy**:
   - Forest Green (`#1B4D36`, `#2D6A4F`), Warm Cream (`#FDFBF7`, `#F9F5EC`), White, and subtle warm orange accents (`#E76F51`).
   - Clean Plus Jakarta Sans typography, rounded cards, subtle shadows, consistent spacing, and smooth hover effects.

4. **Category Filtering**:
   - Filter food items across categories: Pizza & Breads, Burgers & Wraps, Quick Snacks, Campus Meals, Coffee & Chai, Shakes & Desserts, and Beverages.

5. **Instant Live Search**:
   - Real-time search by food name (e.g., *maggi*, *kulhad chai*, *pizza*, *frappe*) or outlet name (*Dominos*, *Kulhad*, *Applebeez*).
   - Keyboard shortcut support (`⌘K` / `Ctrl+K`) with drop-down suggestions.

6. **Shared Cart & Order Management (React Context + LocalStorage)**:
   - Persistent cart state across page reloads.
   - Item quantity steppers (`+` / `-`).
   - Student discount coupon engine (try `CGC10` for 10% off, `BREAK5` for 5% off).
   - Eco-packaging fee breakdown and transparent bill details.

7. **Token-Based Queue-Free Pickup Flow**:
   - Automatic generation of unique Pickup Tokens (e.g., `K-42`, `D-85`).
   - 4-stage order status stepper: **Placed** ➔ **Kitchen Preparing** ➔ **Ready for Pickup** ➔ **Collected**.
   - Interactive **"Demo: Advance Stage"** button for live evaluation and demonstrations.
   - Dual payment options: **Pay at Pickup Counter (Cash/UPI)** or **Pay Online (UPI/Card integration stub)**.

8. **Authentication & Profile**:
   - Single Sign-On simulation for CGC University Mohali students and faculty.
   - Quick **"One-Click Student Demo Login"** for instant evaluation.
   - Profile dashboard with roll number, department, hostel, and calculated **"Queue Skip Meter"** (minutes saved).

---

## 🛠️ Technology Stack

- **React 19** with **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** (`react-router-dom`)
- **Lucide React** (feather-weight vector icons)
- **Plus Jakarta Sans** Google Typography

---

## 📁 Project Structure

```
Campus Cravings/
├── index.html                   # University title, SEO meta & Google Fonts
├── vite.config.js               # Vite config with @tailwindcss/vite plugin
├── package.json                 # Project dependencies & scripts
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # React root entry point
    ├── App.jsx                  # React Router setup & global layout
    ├── index.css                # Tailwind CSS v4 custom theme & styles
    ├── context/
    │   └── CartContext.jsx      # Shared cart, coupon, user & order state
    ├── data/
    │   ├── categories.js        # Category filters data
    │   └── outlets.js           # 14 Outlets, locations, prep times & sample menus
    ├── components/
    │   ├── Navbar.jsx           # Desktop navigation with search & cart badge
    │   ├── BottomNav.jsx        # Mobile bottom navigation bar
    │   ├── Footer.jsx           # University context & campus directory
    │   ├── HeroSection.jsx      # "Skip the Queue. Enjoy Your Break." hero
    │   ├── SearchBar.jsx        # Search bar with live suggestions
    │   ├── SearchModal.jsx      # Global ⌘K search overlay
    │   ├── CategoryFilter.jsx   # Horizontal category scroll pills
    │   ├── OutletCard.jsx       # Campus food outlet card
    │   ├── FoodCard.jsx         # Food card with veg tag & quantity stepper
    │   ├── HowItWorks.jsx       # 4-step campus ordering & pickup guide
    │   └── ScrollToTop.jsx      # Route change scroll reset
    └── pages/
        ├── HomePage.jsx         # Campus home with Hero, Outlets & Popular food
        ├── OutletMenuPage.jsx   # Dedicated outlet page with searchable menu
        ├── CartPage.jsx         # Cart review, grouping, coupons & bill
        ├── CheckoutPage.jsx     # Pickup slot, credentials & payment choice
        ├── OrdersPage.jsx       # Status stepper, pickup token & past orders
        ├── LoginPage.jsx        # Student / Faculty sign in with demo mode
        ├── ProfilePage.jsx      # Student details & queue-skip stats
        └── NotFoundPage.jsx     # 404 fallback page
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your computer.

### 2. Install Dependencies
Run the following in the project root directory:
```bash
npm install
```

### 3. Start Development Server
Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

### 5. Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

---

## 🔌 Future Backend Integration Points

The application is structured with clean integration hooks:
- **`src/context/CartContext.jsx`**: Ready to replace `localStorage` with `REST` or `GraphQL` endpoints:
  - `POST /api/orders` (Order placement)
  - `GET /api/orders/:id` (Live status WebSocket / SSE)
  - `POST /api/auth/login` (CGC University LDAP/SSO authentication)
  - `POST /api/payments/verify` (UPI QR / Payment Gateway webhook)
- **`src/data/outlets.js`**: Easily connectable to a database (MongoDB / PostgreSQL) for vendor management and inventory toggles.

---

## 🎓 University Context

- **Institution**: Chandigarh Group of Colleges (CGC) University, Mohali, Punjab
- **Target Audience**: Over 15,000+ campus students, faculty, and administrative staff
- **Use Case**: Eliminating long lines during 10–20 minute lecture breaks and lunch hours.
