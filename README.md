# Identity Reconciliation Service (Backend)

A production‑ready backend service that reconciles customer identities across multiple email addresses and phone numbers.  
Built for the **Bitespeed Identity Reconciliation Task**, with a scalable architecture and graph‑ready API for modern dashboards.

---

## Live Endpoint
**Base URL:** https://identity-reconciliation-zvcl.onrender.com
**Identify Endpoint:**

```
POST /api/identify
```

⚠️ Replace the URL above with your deployed Render/Railway link.

---

## Problem Solved

Customers may use different emails or phone numbers across purchases.  
This service:

• Links related contacts  
• Maintains a primary contact  
• Tracks secondary contacts  
• Returns a consolidated identity  
• Provides graph‑ready data for visualization  

---

## 🏗️ Tech Stack

**Backend**
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

**Architecture**
- Controller → Service → Repository pattern
- Graph‑ready response layer
- Clean error handling middleware

---

## 📁 Project Structure

```
identity-reconciliation/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── utils/
│   ├── middleware/
│   └── app.js
│
├── .env
├── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone repository

```
git clone https://github.com/rajkundan463/Identity-Reconciliation
cd identity-reconciliation
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment

Create `.env`:

```
DATABASE_URL="postgresql://USER:PASSWORD@<PORT>/identity"
PORT=5000
```

### 4. Run migrations

```
npx prisma migrate dev
```

### 5. Seed test data

```
npx prisma db seed
```

### 6. Start server

```
node src/app.js
```

---

##  API Documentation

### Identify Contact

**POST** `/api/identify`

**Request Body (JSON)**

```
{
  "email": "test@example.com",
  "phoneNumber": "123456"
}
```

**Response**

```
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["test@example.com"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": []
  },
  "graph": {
    "nodes": [...],
    "edges": [...]
  }
}
```

---

## 📊 Additional Endpoints 

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/identify | reconcile identity |
| GET | /api/contacts | list contacts |
| GET | /api/contacts/:id | contact graph |


---

## 🧪 Testing

Example:

```
curl -X POST http://localhost:5000/api/identify \
-H "Content-Type: application/json" \
-d '{"email":"doc@flux.com","phoneNumber":"999999"}'
```

---

## 🌐 Deployment


- Render.com


Steps:

1. Push to GitHub
2. Create new Web Service
3. Add DATABASE_URL
4. Deploy

---

## ✨ Key Highlights

✔ Scalable architecture  
✔ Graph‑ready API  
✔ Production‑level structure  
✔ Prisma ORM integration  
✔ Recruiter‑friendly code organization  

---

## 👨‍💻 Author

Your Name  
GitHub: https://github.com/rajkundan463  

---

## 📅 Generated

2026-03-02T15:38:01.512281 UTC
