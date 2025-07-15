# 🌊 AquaSense – Smart Water Usage Monitoring & Prediction System 💧

AquaSense is a full-stack ML-powered platform that allows users to monitor, predict, and optimize household water usage. It provides real-time analytics, intelligent suggestions, leaderboard comparisons, and smart garden scheduling – all powered by machine learning.

---

## 🧩 Tech Stack

| Layer         | Tech Used                                       |
|---------------|--------------------------------------------------|
| **Frontend**  | React, Tailwind CSS, Axios, Chart.js             |
| **Backend**   | Node.js, Express.js, MongoDB Atlas               |
| **ML Service**| Python, FastAPI, scikit-learn, joblib, MongoDB   |

---

## 🚀 Features

- 📊 Real-time water usage dashboard
- 🧠 ML-powered predictions based on user behavior
- 🌱 Water-saving suggestions & tips
- 🪴 Smart Garden water scheduler
- 🏆 Leaderboard & local usage comparison

---

## 🧠 Machine Learning

- Model trained using features like household size, temperature, shower habits, etc.
- Deployed using FastAPI and returns predicted water usage
- Stores prediction logs in MongoDB for further analysis

---

## 📁 Folder Structure

HackOrbit-Aqua-Sync/
├── aquasense-frontend/ # React + Tailwind UI
├── aquasense-backend/ # Express + MongoDB API
└── aquasense-ml/ # FastAPI ML Prediction Service

yaml
Copy
Edit

---

## 🛠️ Local Setup Instructions

### 🔹 Frontend

bash
cd aquasense-frontend
npm install
npm run dev
🔹 Backend
bash
Copy
Edit
cd aquasense-backend
npm install
npm start
🔹 ML API
`bash
Copy
Edit
cd aquasense-ml
pip install -r requirements.txt
uvicorn main:app --reload

👨‍💻 Team
## 👨‍💻 Team

- [**Kshitiz**](https://github.com/KshitizNaik2005) – Frontend
- [**Oshan**](https://github.com/Oshankhati) – Backend Integration  
- [**Arpita**](https://github.com/Arpitasoni24) – Frontend, UI/UX  
- [**Asmita**](https://github.com/AsmitaSoni) – Machine Learning


📄 License
MIT License – feel free to use and contribute.
