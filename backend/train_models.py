# import pandas as pd
# import numpy as np
# import pickle
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.neural_network import MLPClassifier
# import xgboost as xgb

# # Load dataset
# df = pd.read_csv(r"C:\Users\bhati\OneDrive\Documents\18-weatherAUS.csv")  # Use your dataset

# # # Handle missing values
# # df.fillna(df.mean(), inplace=True)

# # Encode categorical values
# label_encoders = {}
# categorical_cols = ["Location", "WindGustDir", "WindDir9am", "WindDir3pm", "RainToday", "RainTomorrow"]
# for col in categorical_cols:
#     le = LabelEncoder()
#     df[col] = le.fit_transform(df[col].astype(str))
#     label_encoders[col] = le

# df.fillna(df.select_dtypes(include=['number']).mean(), inplace=True)
# # Define features and target
# X = df.drop(columns=["RainTomorrow", "Date"])
# y = df["RainTomorrow"]

# # Split dataset
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Scale features
# scaler = StandardScaler()
# X_train = scaler.fit_transform(X_train)
# X_test = scaler.transform(X_test)

# # Train models
# models = {
#     "knn": KNeighborsClassifier(n_neighbors=5),
#     "mlp": MLPClassifier(hidden_layer_sizes=(50, 50), max_iter=500),
#     "xgboost": xgb.XGBClassifier(use_label_encoder=False, eval_metric="logloss")
# }

# for name, model in models.items():
#     model.fit(X_train, y_train)
#     with open(f"models/{name}.pkl", "wb") as f:
#         pickle.dump(model, f)

# print("Models trained and saved successfully!")


import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
import xgboost as xgb

# Load dataset
df = pd.read_csv(r"C:\Users\bhati\OneDrive\Documents\18-weatherAUS.csv")

# Encode categorical values
categorical_cols = ["Location", "WindGustDir", "WindDir9am", "WindDir3pm", "RainToday", "RainTomorrow"]
label_encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    label_encoders[col] = le  # Save encoder for later

# Fill missing numerical values
df.fillna(df.select_dtypes(include=['number']).mean(), inplace=True)

# Define features and target
X = df.drop(columns=["RainTomorrow", "Date"])
y = df["RainTomorrow"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save scaler
with open("models/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

# Train models
models = {
    "knn": KNeighborsClassifier(n_neighbors=5),
    "mlp": MLPClassifier(hidden_layer_sizes=(50, 50), max_iter=500),
    "xgboost": xgb.XGBClassifier(use_label_encoder=False, eval_metric="logloss")
}

for name, model in models.items():
    model.fit(X_train, y_train)
    with open(f"models/{name}.pkl", "wb") as f:
        pickle.dump(model, f)

print("Models trained and saved successfully!")



# // {
# //   "name": "y",
# //   "version": "1.0.0",
# //   "main": "app.js",
# //   "type": "module",
# //   "scripts": {
# //     "start": "react-scripts start",
# //     "test": "echo \"Error: no test specified\" && exit 1"
# //   },
# //   "author": "",
# //   "license": "ISC",
# //   "description": "",
# //   "dependencies": {
# //     "react-scripts": "^5.0.1"
# //   }
# // }