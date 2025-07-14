import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load data
df = pd.read_csv('questionnaire_data.csv')

# Select features and target
features = ['people', 'children', 'temperature', 'showersPerDay', 'timePerShower', 'washingPerWeek']
X = df[features]
y = df['estimatedUsage']

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, 'water_usage_model.pkl')
print("✅ Model trained and saved as water_usage_model.pkl")
