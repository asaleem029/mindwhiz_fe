# E-Commerce Frontend Module

A mini e-commerce module built with Next.js and React, demonstrating frontend, backend integration, and role-based access control.

## Features

- **Product Listing Page**: Grid layout with 3 products per row (desktop), responsive design
- **Product Detail Modal**: Opens on "View Details" click, shows full product information
- **Login System**: Mock authentication with role-based access (Admin/Customer)
- **Add Product Form**: Admin-only feature to add new products
- **Role-Based Access Control (RBAC)**: Admin users can see "Add Product" button
- **Clean UI**: Minimal design with primary color #39B54A

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- **Admin**: 
  - Email: `admin@mindwhiz.com`
  - Password: `admin`
  
- **Customer**: 
  - Email: `customer@mindwhiz.com`
  - Password: `customer`

## Project Structure

```
/frontend
  /pages
    index.tsx         # Product listing
    login.tsx         # Login page
    add-product.tsx   # Add product (Admin only)
  /components
    ProductCard.tsx   # Product card component
    ProductModal.tsx  # Product detail modal
  /contexts
    AuthContext.tsx   # Authentication context
  /utils
    api.ts           # API utility functions
  /styles
    globals.css      # Global styles
```

## Features Implementation

### Product Listing
- Fetches products from backend API (`GET /products`)
- Falls back to dummy data if API is unavailable
- 3-column grid layout on desktop, responsive on mobile
- "Add Product" button visible only to Admin users

### Product Detail Modal
- Displays product name, image, description, price, and availability
- "Add to Cart" button (optional functionality)
- "Close" button to dismiss modal

### Login
- Centered login form
- Mock authentication with role detection
- Redirects to product listing on success
- Stores user session in localStorage

### Add Product (Admin Only)
- Form fields: Name, Description, Price, Availability, Image URL
- Calls `POST /products` API endpoint
- Protected route - redirects non-admin users

## Design Guidelines

- **Primary Color**: #39B54A (green) for buttons and accents
- **Text Color**: Dark gray/black (#1a1a1a)
- **Clean, minimal style** with proper spacing and typography
- **Responsive design** for mobile, tablet, and desktop

## API Integration

The frontend expects a backend API running on `http://localhost:5000` (configurable via `NEXT_PUBLIC_API_URL`):

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /login` - Authenticate user
- `POST /products` - Add new product (Admin only)

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for authentication

## Build for Production

```bash
npm run build
npm start
```

## Notes

- Mock authentication is implemented for demo purposes
- Product data falls back to dummy data if backend API is unavailable
- Role-based access control is implemented using React Context
- All API calls are handled through the utility function in `utils/api.ts`
