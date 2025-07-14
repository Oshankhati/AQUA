from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from pymongo import MongoClient, errors
from datetime import datetime
from dotenv import load_dotenv
import os

# ✅ Load .env variables
load_dotenv()

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Enable CORS for frontend on http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # adjust if frontend URL differs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ MongoDB connection with error handling
MONGO_URI = os.getenv('MONGO_URI')
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.server_info()  # Trigger exception if cannot connect
    db = client['aquasense']
    predictions_col = db['predictions']
    print("✅ Connected to MongoDB Atlas")
except errors.ServerSelectionTimeoutError as err:
    print("❌ Failed to connect to MongoDB:", err)

# ✅ Load trained model
model_path = 'water_model.pkl'
try:
    model = joblib.load(model_path)
    print(f"✅ Loaded ML model from {model_path}")
except Exception as e:
    print(f"❌ Failed to load model: {e}")

# ✅ Define input schema
class PredictionInput(BaseModel):
    userId: str
    people: int
    children: int
    temperature: float
    showersPerDay: int
    timePerShower: int
    washingPerWeek: int

# ✅ Prediction route
@app.post("/predict")
async def predict(input: PredictionInput):
    X = np.array([[input.people, input.children, input.temperature,
                   input.showersPerDay, input.timePerShower, input.washingPerWeek]])
    predicted_usage = model.predict(X)[0]

    # ✅ Store prediction in MongoDB
    predictions_col.insert_one({
        "userId": input.userId,
        "input": input.dict(),
        "predicted_usage": float(predicted_usage),
        "timestamp": datetime.utcnow()
    })

    return {"predicted_usage": predicted_usage}

# ✅ Root health check
@app.get("/")
async def root():
    return {"message": "✅ AquaSense ML API is running"}
    