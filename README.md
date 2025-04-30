# 📊 KYC Hub Dashboard

A full-featured responsive credit risk dashboard built using **React**, **TypeScript**, **Ant Design**, and **Node.js**.

---

## 🔧 Tech Stack
- React + TypeScript + Vite
- Ant Design (UI components)
- Recharts (data visualization)
- Axios (API integration)
- Node.js + Express (mock backend)
- Vitest + RTL (unit testing)

---

## 🚀 Features

### ✅ Core
- Dashboard with statistics, charts, and customer table
- Risk Assessment with visual risk score & alerts
- Workflow automation with status update

### 🎁 Bonus Features
- 🌙 Dark mode toggle
- 🔍 Table search and column filters
- 📱 Mobile-responsive design
- 🧪 Unit tests with coverage
- ☁️ Ready for hosting (Vercel, Render)

---

## 📦 Setup Instructions

### 🖥️ Frontend
```bash
# Clone and install
cd kyc-frontend
npm install

# Run dev server
npm run dev
```

Frontend will run at: `http://localhost:5173`

### 🗃️ Backend
```bash
cd backend
npm install
node server.js
```

Backend API: `http://localhost:5000/api/customers`

---

## 🧠 Risk Scoring Logic
- Credit Score (scaled to 40 pts)
- Loan Repayment History (30 pts)
- Loan-to-Income Ratio (30 pts inverse)

### 🔺 Risk Bands:
- 75+ → Low Risk (Green)
- 50–74 → Medium (Orange)
- <50 → High Risk (Red)

High-risk customers trigger alert via backend POST.

---

## 🧪 Run Tests
```bash
npm run test
```
Uses Vitest + React Testing Library for dashboard components.

---

## 🌐 Deployment (Optional)

### 🔹 Frontend on Vercel
```bash
vercel deploy
```

### 🔸 Backend on Render
- Create web service → point to `server.js`
- Enable CORS for frontend domain

---

## 📁 Folder Structure
```
kyc-frontend/
├── src/
│   ├── pages/
│   ├── api/
│   ├── models/
│   ├── utils/
│   ├── test/
│   └── App.tsx
└── vite.config.ts

backend/
├── server.js
├── routes/
├── controllers/
└── data/
```

---

## 🙋‍♀️ Author
Built by **Vishwa Vijeta** as part of KYC Hub frontend assessment.

Feel free to contact for improvements, walkthroughs, or deployment help!
