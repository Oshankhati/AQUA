import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import numpy as np

# ✅ Generate synthetic realistic dataset
np.random.seed(42)
n = 100

data = pd.DataFrame({
    'people': np.random.randint(1, 6, n),
    'children': np.random.randint(0, 3, n),
    'temperature': np.random.uniform(20, 35, n),
    'showersPerDay': np.random.randint(1, 4, n),
    'timePerShower': np.random.randint(5, 15, n),
    'washingPerWeek': np.random.randint(2, 7, n)
})

# ✅ Create realistic target variable (water usage)
# Basic formula: base + people*30 + children*20 + showers*time*2 + washing*10 + temp factor + noise
data['usage'] = (
    50 +
    data['people'] * 30 +
    data['children'] * 20 +
    data['showersPerDay'] * data['timePerShower'] * 2 +
    data['washingPerWeek'] * 10 +
    data['temperature'] * 1.5 +
    np.random.normal(0, 10, n)  # noise
)

X = data.drop('usage', axis=1)
y = data['usage']

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, 'water_model.pkl')
print("✅ Advanced model trained and saved.")
