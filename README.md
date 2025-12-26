# 🏡 PrimeNest - Advanced Real Estate Marketplace

PrimeNest is a full-stack real estate application designed to revolutionize the way people buy, rent, and sell properties. It features a premium, ultra-modern UI, AI-powered tools, and real-time communication features to provide a seamless user experience.

## ✨ Key Features

*   **🤖 AI-Powered Descriptions:** Generate catchy, professional property descriptions instantly using our integrated AI tools.
*   **📊 Agent Analytics Dashboard:** Track property views, saves, and visit requests with interactive charts and insights.
*   **💰 Smart Mortgage Calculator:** Calculate monthly EMI with sliders for down payment, interest rate, and tenure, visualized with dynamic charts.
*   **💬 Real-Time Chat:** Instant messaging between buyers and agents using Socket.io.
*   **🌍 Interactive Maps:** View property locations and nearby amenities (Schools, Transport, Dining) on an interactive map.
*   **🕶️ Virtual Tours:** Immersive 3D experiences for select properties.
*   **📱 Responsive Design:** Fully optimized for desktop, tablet, and mobile devices with a "Dark Luxury" aesthetic.
*   **🔐 Secure Authentication:** Robust user authentication and profile management.

## 🛠️ Tech Stack

**Frontend:**
*   React.js
*   Vite
*   SASS (SCSS)
*   Framer Motion (Animations)
*   Recharts (Analytics)
*   React Leaflet (Maps)
*   Zustand (State Management)

**Backend:**
*   Node.js
*   Express.js
*   Prisma (ORM)
*   MongoDB
*   JWT (Authentication)

**Real-Time:**
*   Socket.io

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB installed and running

### 1. Clone the Repository
```bash
git clone https://github.com/Sarthakbhuptani123/PrimeNest.git
cd PrimeNest
```

### 2. Install Dependencies

**Client:**
```bash
cd client
npm install
```

**API (Backend):**
```bash
cd ../api
npm install
```

**Socket Server:**
```bash
cd ../socket
npm install
```

### 3. Environment Variables

Create a `.env` file in the `api` directory and configure the following:

```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET_KEY="your_secret_key"
CLIENT_URL="http://localhost:5173"
```

### 4. Run the Application

You need to run the three services in separate terminals:

**Terminal 1 (Backend):**
```bash
cd api
node app.js
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

**Terminal 3 (Socket):**
```bash
cd socket
node app.js
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
