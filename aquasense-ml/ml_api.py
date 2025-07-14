from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load('water_usage_model.pkl')

class QuestionnaireInput(BaseModel):
    people: int
    children: int
    temperature: float
    showersPerDay: int
    timePerShower: float
    washingPerWeek: int

@app.post("/predict")
def predict_usage(data: QuestionnaireInput):
    input_data = [[
        data.people,
        data.children,
        data.temperature,
        data.showersPerDay,
        data.timePerShower,
        data.washingPerWeek
    ]]
    prediction = model.predict(input_data)[0]
    return {"predicted_usage": round(prediction, 2)}
