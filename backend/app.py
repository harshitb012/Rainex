# from flask import Flask, request, jsonify
# import pickle
# import numpy as np
# import os

# app = Flask(__name__)

# # Load models
# models = {}
# for model_name in ["knn", "mlp", "xgboost"]:
#     with open(f"models/{model_name}.pkl", "rb") as f:
#         models[model_name] = pickle.load(f)

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.json
#     model_name = data["model"]
#     features = np.array(data["features"]).reshape(1, -1)

#     if model_name not in models:
#         return jsonify({"error": "Invalid model selected"}), 400

#     prediction = models[model_name].predict(features)
#     result = "Yes" if prediction[0] == 1 else "No"

#     return jsonify({"RainTomorrow": result})

# if __name__ == "__main__":
#     app.run(debug=True)



# import pandas as pd
# import numpy as np
# import pickle
# import json
# from flask import Flask, request, jsonify
# from sklearn.preprocessing import LabelEncoder, StandardScaler

# app = Flask(__name__)

# # Load dataset for preprocessing reference
# df = pd.read_csv(r"C:\Users\bhati\OneDrive\Documents\18-weatherAUS.csv")

# # Encode categorical values (ensure consistency)
# categorical_cols = ["Location", "WindGustDir", "WindDir9am", "WindDir3pm", "RainToday", "RainTomorrow"]
# label_encoders = {}

# for col in categorical_cols:
#     le = LabelEncoder()
#     df[col] = le.fit_transform(df[col].astype(str))
#     label_encoders[col] = le  # Save encoder for later use

# # Define feature names (drop target and date columns)
# feature_names = df.drop(columns=["RainTomorrow", "Date"]).columns.tolist()

# # Load trained models
# models = {}
# model_names = ["knn", "mlp", "xgboost"]

# for name in model_names:
#     with open(f"models/{name}.pkl", "rb") as f:
#         models[name] = pickle.load(f)

# # Load scaler (ensure input is standardized like training data)
# with open("models/scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)


# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         # Get JSON request
#         data = request.get_json()

#         # Convert JSON to DataFrame
#         input_data = pd.DataFrame([data])

#         # Encode categorical features (ensure consistency with training)
#         for col in categorical_cols:
#             if col in input_data.columns:
#                 input_data[col] = label_encoders[col].transform(input_data[col].astype(str))

#         # Ensure all columns are present
#         missing_cols = set(feature_names) - set(input_data.columns)
#         if missing_cols:
#             return jsonify({"error": f"Missing features: {missing_cols}"}), 400

#         # Reorder columns to match training data
#         input_data = input_data[feature_names]

#         # Scale input data
#         input_data_scaled = scaler.transform(input_data)

#         # Predict using MLP model
#         prediction = models["mlp"].predict(input_data_scaled)[0]

#         return jsonify({"prediction": int(prediction)})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)

# import pandas as pd
# import numpy as np
# import pickle
# from flask import Flask, request, jsonify
# from sklearn.preprocessing import LabelEncoder, StandardScaler

# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Allow requests from frontend

# # Load dataset for reference
# df = pd.read_csv(r"C:\Users\bhati\OneDrive\Documents\18-weatherAUS.csv")

# # Define categorical columns
# categorical_cols = ["Location", "WindGustDir", "WindDir9am", "WindDir3pm", "RainToday"]

# # Load label encoders
# label_encoders = {}
# for col in categorical_cols:
#     le = LabelEncoder()
#     df[col] = le.fit_transform(df[col].astype(str))
#     label_encoders[col] = le

# # Define feature names
# feature_names = df.drop(columns=["RainTomorrow", "Date"]).columns.tolist()

# # Load trained models
# models = {}
# try:
#     with open("models/mlp.pkl", "rb") as f:
#         models["mlp"] = pickle.load(f)
#     print("✅ Model Loaded Successfully!")
# except Exception as e:
#     print(f" Model Load Error: {e}")

# # Load scaler
# try:
#     with open("models/scaler.pkl", "rb") as f:
#         scaler = pickle.load(f)
#     print("✅ Scaler Loaded Successfully!")
# except Exception as e:
#     print(f" Scaler Load Error: {e}")


# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         # Get JSON request
#         data = request.get_json()
#         print(f" Received Input: {data}")

#         # Convert JSON to DataFrame
#         input_data = pd.DataFrame([data])

#         # Check for missing columns
#         missing_cols = set(feature_names) - set(input_data.columns)
#         if missing_cols:
#             return jsonify({"error": f"Missing features: {missing_cols}"}), 400

#         # Encode categorical features
#         for col in categorical_cols:
#             if col in input_data.columns:
#                 if input_data[col][0] not in label_encoders[col].classes_:
#                     return jsonify({"error": f"Invalid value '{input_data[col][0]}' for column '{col}'"}), 400
#                 input_data[col] = label_encoders[col].transform(input_data[col])

#         # Ensure column order matches training data
#         input_data = input_data[feature_names]
#         print(f" Processed Input DataFrame:\n{input_data}")

#         # Scale input data
#         input_data_scaled = scaler.transform(input_data)
#         print(f" Scaled Input Data:\n{input_data_scaled}")

#         # Predict using MLP model
#         prediction = models["mlp"].predict(input_data_scaled)[0]
#         print(f" Prediction Result: {prediction}")

#         return jsonify({"prediction": int(prediction)})

#     except Exception as e:
#         print(f" Prediction Error: {e}")
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)


import pandas as pd
import numpy as np
import pickle
from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder, StandardScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

df = pd.read_csv(r"C:\Users\bhati\OneDrive\Documents\18-weatherAUS.csv")

categorical_cols = ["Location", "WindGustDir", "WindDir9am", "WindDir3pm", "RainToday"]
label_encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    label_encoders[col] = le

feature_names = df.drop(columns=["RainTomorrow", "Date"]).columns.tolist()

models = {}
scaler = None
try:
    with open("models/mlp.pkl", "rb") as f:
        models["mlp"] = pickle.load(f)
    print("✅ MLP Model Loaded Successfully!")
except Exception as e:
    print(f"Error loading MLP model: {e}")

try:
    with open("models/xgboost.pkl", "rb") as f:
        models["xgboost"] = pickle.load(f)
    print("✅ XGBoost Model Loaded Successfully!")
except Exception as e:
    print(f"Error loading XGBoost model: {e}")

try:
    with open("models/knn.pkl", "rb") as f:
        models["knn"] = pickle.load(f)
    print("✅ KNN Model Loaded Successfully!")
except Exception as e:
    print(f"Error loading KNN model: {e}")

try:
    with open("models/scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    print("✅ Scaler Loaded Successfully!")
except Exception as e:
    print(f"Scaler Load Error: {e}")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        model_type = data.get("model", "mlp")  # Default to 'mlp' if not provided
        print(f"Received Input for model: {model_type}")
        print(f"Received Data: {data}")

        if model_type not in models:
            return jsonify({"error": f"Model '{model_type}' is not available"}), 400

        input_data = pd.DataFrame([data])

        missing_cols = set(feature_names) - set(input_data.columns)
        if missing_cols:
            return jsonify({"error": f"Missing features: {missing_cols}"}), 400

        for col in categorical_cols:
            if col in input_data.columns:
                if input_data[col][0] not in label_encoders[col].classes_:
                    return jsonify({"error": f"Invalid value '{input_data[col][0]}' for column '{col}'"}), 400
                input_data[col] = label_encoders[col].transform(input_data[col])

        input_data = input_data[feature_names]
        print(f"Processed Input DataFrame:\n{input_data}")

        input_data_scaled = scaler.transform(input_data)
        print(f"Scaled Input Data:\n{input_data_scaled}")

        # Get the selected model
        model = models[model_type]
        
        # Make prediction using the selected model
        prediction = model.predict(input_data_scaled)[0]
        print(f"Prediction Result: {prediction}")

        return jsonify({"prediction": int(prediction)})

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

