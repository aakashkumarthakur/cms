# Hotel Sujata Palace — Strapi v5 Headless CMS

Built for: **hotelsujatapalace.com.np**  
Strapi Version: **v5 (latest)**  
Node.js: **≥ 18.x**

---

## 📁 Project Structure

```
hsp-strapi/
├── config/
│   ├── database.js        # SQLite (dev) / PostgreSQL (prod)
│   ├── middlewares.js     # CORS for frontend
│   └── plugins.js
├── src/
│   └── api/
│       ├── room/           # Room types & pricing
│       ├── booking/        # Booking requests
│       ├── gallery/        # Hotel photo gallery
│       ├── testimonial/    # Guest reviews
│       ├── amenity/        # Hotel amenities
│       ├── career/         # Job postings
│       └── contact-message/ # Contact form submissions
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Strapi v5

```bash
npx create-strapi-app@latest hsp-strapi --quickstart
cd hsp-strapi
```

Or without quickstart (manual DB setup):
```bash
npx create-strapi-app@latest hsp-strapi
```

### 2. Copy the content-type schema files

After Strapi is created, copy all files from this package into the project root.

### 3. Start the server

```bash
npm run develop
```

Visit: **http://localhost:1337/admin**

### 4. Create your Admin user in the browser, then configure permissions (see below).

---

## 🗃️ Content Types Overview

| Collection       | Purpose                                      |
|------------------|----------------------------------------------|
| `room`           | Rooms with type, price, amenities, images    |
| `booking`        | Guest booking requests from the website      |
| `gallery`        | Hotel photos organized by category           |
| `testimonial`    | Guest reviews / ratings                      |
| `amenity`        | Hotel facilities (WiFi, Restaurant, etc.)    |
| `career`         | Job openings / Career support section        |
| `contact-message`| Messages submitted via the contact form      |

---

## 🔑 API Permissions Setup

After starting, go to:
**Admin → Settings → Users & Permissions Plugin → Roles → Public**

Enable `find` and `findOne` for:
- rooms ✅
- galleries ✅
- testimonials ✅
- amenities ✅
- careers ✅

Enable `create` for:
- bookings ✅ (so website can POST booking requests)
- contact-messages ✅ (so contact form can POST)

---

## 🌐 REST API Endpoints

```
GET    /api/rooms               → All rooms
GET    /api/rooms/:id           → Single room
GET    /api/galleries           → All gallery images
GET    /api/testimonials        → All reviews
GET    /api/amenities           → All amenities
GET    /api/careers             → All job postings
POST   /api/bookings            → Submit a booking
POST   /api/contact-messages    → Submit contact form
```

### Example: Fetch rooms in your frontend HTML

```javascript
const response = await fetch('http://localhost:1337/api/rooms?populate=*');
const { data } = await response.json();
// data is an array of room objects
```

### Example: Submit booking

```javascript
await fetch('http://localhost:1337/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      guestName: "Ram Prasad",
      email: "ram@example.com",
      phone: "9801234567",
      checkIn: "2025-07-01",
      checkOut: "2025-07-03",
      roomType: "Deluxe",
      guests: 2,
      message: "Special occasion"
    }
  })
});
```

---

## 🏗️ Production Deployment (PostgreSQL)

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE hsp_strapi;
CREATE USER hsp_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE hsp_strapi TO hsp_user;
```

2. Update your `.env` file (see `.env.example`)

3. Build for production:
```bash
npm run build
npm run start
```
