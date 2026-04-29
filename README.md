# Insure Today UK — Car Insurance Comparison

A full-stack MERN application replicating a car insurance comparison interface similar to GoCompare, branded as **Insure Today UK**.

---

## 📁 Project Structure

```
insure-today-uk/
├── client/          # React frontend
│   ├── public/
│   │   ├── logos/   ← Put insurer logo images here (e.g. allianz.png, admiral.png)
│   │   └── images/  ← Put hero-car.png, mascot.png here
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── CoverSidebar.js
│       │   ├── QuoteCard.js
│       │   └── QuoteDetailPanel.js
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── ResultsPage.js
│       │   ├── LoginPage.js
│       │   └── RegisterPage.js
│       └── context/
│           └── AuthContext.js
└── server/          # Express + MongoDB backend
    ├── models/User.js
    ├── routes/auth.js
    ├── routes/quotes.js
    ├── middleware/auth.js
    └── index.js
```

---

## 🚀 Local Setup

### 1. Start MongoDB (local terminal)
```bash
mongod --dbpath /data/db
```
Or if using a service:
```bash
sudo systemctl start mongod
```

### 2. Install dependencies
```bash
# Install server deps
cd server
npm install

# Install client deps
cd ../client
npm install
```

### 3. Configure environment
```bash
# In /server, copy .env.example to .env
cp .env.example .env
# Edit .env if needed (default local MongoDB should work as-is)
```

### 4. Start development
```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend
cd client
npm start
```

App runs at: http://localhost:3000  
API runs at: http://localhost:5000

---

## 🖼️ Adding Logos

Place insurer logo images in `client/public/logos/`:
- `allianz.png`
- `admiral.png`
- `elephant.png`
- `diamond.png`
- `insure-today-logo.png` — Your main brand logo (shown in navbar)

Place other images in `client/public/images/`:
- `hero-car.png` — Hero section car image
- `mascot.png` — Reward section mascot (the green gecko-like figure)

The `<img>` tags have `onError` fallbacks so the UI won't break if images are missing.

---

## ☁️ Deployment

### Frontend — Netlify
1. Build: `cd client && npm run build`
2. Deploy the `client/build` folder to Netlify
3. The `public/_redirects` file handles SPA routing automatically
4. Set environment variable: `REACT_APP_API_URL=https://your-api-url.com`

### Frontend — Vercel
1. Set root directory to `client`
2. Build command: `npm run build`
3. Output directory: `build`
4. The `vercel.json` handles SPA routing

### Backend — Vercel / Railway / Render
- For Vercel: deploy the `server` folder, set env vars in dashboard
- For Railway/Render: connect repo, point to `server/`, set:
  - `MONGO_URI=mongodb+srv://...` (use MongoDB Atlas for production)
  - `JWT_SECRET=your-secure-secret`
  - `CLIENT_URL=https://your-frontend-url.com`

### Backend — Note on MongoDB
- **Local dev**: Uses `mongodb://127.0.0.1:27017/insure-today-uk` (no Atlas needed)
- **Production**: Use MongoDB Atlas free tier and update `MONGO_URI`

---

## 🔐 Auth Flow

- **Register**: `POST /api/auth/register` → returns JWT
- **Login**: `POST /api/auth/login` → returns JWT
- **Me**: `GET /api/auth/me` (Bearer token) → returns user info
- JWT stored in `localStorage`, attached to all requests via Axios defaults

---

## 📱 Mobile Responsive

The UI is fully responsive:
- Desktop: Left sidebar + results grid side by side
- Mobile: Top edit/cover buttons open a slide-in drawer
- Quote detail panel: Full-width on mobile, 420px panel on desktop
- All typography and spacing scales with viewport

---

## 🎨 Design

Colors match GoCompare's palette:
- Dark green: `#1a4731`
- Main green: `#1e5c3a`
- Cream background: `#f5f0e8`
- Yellow accent: `#c8d400`

Fonts: **Nunito** (headings/buttons) + **Nunito Sans** (body) from Google Fonts
