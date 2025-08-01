# 🧹 Roomies – Chore Management App

Roomies is a full-stack task coordination platform built to simplify chore sharing in multi-user households. Users can create, assign, and track recurring tasks with clear visibility across tenants.

---

## ✨ Features

- 🏠 Multi-user household support
- ✅ Create, read, update, and delete (CRUD) tasks
- 🔁 Recurring task tracking
- 👥 Role-based access (e.g., roommates vs admins)
- 📄 Responsive UI for clean task navigation
- 📊 PostgreSQL schema optimized for relational data

---

## 🛠 Tech Stack

**Frontend:**  
- React  
- HTML/CSS  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- PostgreSQL  
- Knex (or Sequelize, if applicable)  

**Architecture & Tools:**  
- MVC structure  
- Git & GitHub  
- Postman for testing  
- Render/Vercel for deployment (if applicable)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/roomies.git
cd roomies

# Install dependencies
npm install

# Set up database (PostgreSQL)
# Create .env file with DB connection info

# Run migrations & seed (if available)
npx knex migrate:latest
npx knex seed:run

# Start server
npm start
```

> Make sure PostgreSQL is running locally or update `.env` to point to your remote DB.

---

## 🗂 Project Structure

```
roomies/
├── client/            # Frontend React app
│   ├── components/
│   └── ...
├── server/            # Backend Express server
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
├── db/                # Knex migrations & seeds
├── package.json
└── README.md
```

---

## 🚧 Future Improvements

- Authentication and user registration
- Notifications for upcoming/overdue tasks
- Calendar integration
- Mobile-first redesign
- Unit & integration tests

---

## 🧑‍💻 Made By

- [Aditi Srivastava]
- [Joshua Hirakawa] 
- [Jeremy Dalton]
- [Austin Emuang-Stubbs]
- [Miles Barksdale]
- [Amrita B]
