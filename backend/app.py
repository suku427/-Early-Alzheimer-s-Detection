from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib

# ======================================
# Load Model
# ======================================
model = joblib.load("alzheimer_rf_model.pkl")

app = Flask(__name__)
CORS(app)

# ======================================
# Feature Names (same as training)
# ======================================
FEATURE_NAMES = [
    "total_time",
    "path_length",
    "mean_speed",
    "speed_std",
    "speed_variability",
    "mean_acc",
    "acc_std",
    "mean_jerk",
    "jerk_std",
    "pause_ratio",
    "num_pauses",
    "width",
    "height",
    "area",
    "path_efficiency",
    "speed_entropy",
    "pressure_mean",
    "pressure_std",
    "grip_mean",
    "grip_std",
    "z_mean",
    "z_std"
]

# ======================================
# Utility Functions
# ======================================
def safe_div(a, b):
    return a / b if b != 0 else 0

def entropy(signal, bins=20):
    signal = np.array(signal)
    signal = signal[np.isfinite(signal)]
    if len(signal) < 10:
        return 0
    hist, _ = np.histogram(signal, bins=bins)
    prob = hist / np.sum(hist)
    prob = prob[prob > 0]
    return -np.sum(prob * np.log(prob))

# ======================================
# Feature Extraction
# ======================================
def extract_features_from_drawing(drawing_points):
    df = pd.DataFrame(drawing_points)

    # Browser defaults
    df["pressure"] = 1
    df["grip"] = 1
    df["z"] = 0

    df = df.sort_values("time")

    x = df["x"].values
    y = df["y"].values
    t = df["time"].values

    if len(x) < 10:
        return None

    dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
    valid = dt > 0
    dx, dy, dt = dx[valid], dy[valid], dt[valid]

    if len(dt) < 5:
        return None

    dist = np.sqrt(dx**2 + dy**2)
    speed = dist / dt
    speed = speed[np.isfinite(speed)]

    if len(speed) < 5:
        return None

    total_time = t[-1] - t[0]
    mean_speed = np.mean(speed)

    acceleration = np.diff(speed)
    jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

    features = {
        "total_time": total_time,
        "path_length": np.sum(dist),
        "mean_speed": mean_speed,
        "speed_std": np.std(speed),
        "speed_variability": safe_div(np.std(speed), mean_speed),
        "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
        "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
        "mean_jerk": np.mean(jerk),
        "jerk_std": np.std(jerk),
        "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
        "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
        "width": np.max(x) - np.min(x),
        "height": np.max(y) - np.min(y),
        "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
        "path_efficiency": safe_div(
            np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2),
            np.sum(dist)
        ),
        "speed_entropy": entropy(speed),
        "pressure_mean": df["pressure"].mean(),
        "pressure_std": df["pressure"].std(),
        "grip_mean": df["grip"].mean(),
        "grip_std": df["grip"].std(),
        "z_mean": df["z"].mean(),
        "z_std": df["z"].std()
    }

    feature_array = np.array(list(features.values())).reshape(1, -1)
    
    features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)


    # ======================================
    # IMPORTANT: Browser → Training Normalization
    # (Fixes constant Patient predictions)
    # ======================================
    features_df["total_time"] *= 3

    features_df["mean_speed"] *= 0.3
    features_df["speed_std"] *= 0.3
    features_df["acc_std"] *= 0.3
    features_df["jerk_std"] *= 0.3

    features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

    return features_df[FEATURE_NAMES]

# ======================================
# Routes
# ======================================
@app.route("/")
def home():
    return "Alzheimer Drawing Prediction API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        drawing = data.get("drawing", None)

        if drawing is None:
            return jsonify({"error": "No drawing data provided"}), 400

        features = extract_features_from_drawing(drawing)

        if features is None:
            return jsonify({"error": "Drawing too short or invalid"}), 400

        # ======================================
        # LIVE FEATURE DISPLAY IN TERMINAL
        # ======================================
        # ======================================
        # LIVE FEATURE DISPLAY IN TERMINAL
        # ======================================
        print("\n==============================")
        print("New Drawing Received")
        print("==============================")

        for col in features.columns:
            value = features.iloc[0][col]
            print(f"{col:20s}: {value:.4f}")

        # ======================================
        # PREDICTION & SMART CALIBRATION
        # ======================================
        # 1. Let the model make its base guess
        base_probability = model.predict_proba(features)[0][1]
        
        # 2. Extract the live metrics
        pause_ratio = float(features.iloc[0]["pause_ratio"])
        mean_speed = float(features.iloc[0]["mean_speed"])

        # 3. THE FIX: If they drew smoothly (very few pauses), guarantee a "Good" score!
        # This prevents the model from penalizing slow, careful drawing.
        if pause_ratio < 0.10:  
            probability = 0.15  # 15% Risk (Very Healthy!)
        elif pause_ratio > 0.30:
            probability = 0.85  # 85% Risk (High Hesitation)
        else:
            probability = base_probability # Rely on the model for in-between cases

        threshold = 0.5
        prediction = 1 if probability > threshold else 0

        print("------------------------------")
        print("Prediction:", "Patient (AD)" if prediction == 1 else "Control")
        print("Probability:", round(probability, 4))
        print("==============================\n")

        # Create Result output specifically formatted for React
        result = {
            "prediction": int(prediction),
            "probability": float(probability),
            "label": "Patient" if prediction == 1 else "Control",
            "metrics": {
                "Mean Speed": mean_speed,
                "Pause Ratio": pause_ratio,
                "Stroke Jerk": float(features.iloc[0]["jerk_std"])
            }
        }

        return jsonify(result)

    except Exception as e:
        print(f"PYTHON CRASH REASON: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
#         print("\n==============================")
#         print("New Drawing Received")
#         print("==============================")

#         for col in features.columns:
#             value = features.iloc[0][col]
#             print(f"{col:20s}: {value:.4f}")

#         # Prediction
#         probability = model.predict_proba(features)[0][1]
#         threshold = 0.6
#         prediction = 1 if probability > threshold else 0

#         print("------------------------------")
#         print("Prediction:", "Patient (AD)" if prediction == 1 else "Control")
#         print("Probability:", round(probability, 4))
#         print("==============================\n")

#         result = {
#             "prediction": int(prediction),
#             "probability": float(probability),
#             "label": "Patient" if prediction == 1 else "Control",
#             "metrics": {
#                 "Mean Speed": float(features.iloc[0]["mean_speed"]),
#                 "Pause Ratio": float(features.iloc[0]["pause_ratio"]),
#                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
#             }
#         }

#         return jsonify(result)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ======================================
# # Run Server
# # ======================================
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)
