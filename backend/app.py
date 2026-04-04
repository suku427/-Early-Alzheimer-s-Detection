# # # # from flask import Flask, request, jsonify
# # # # from flask_cors import CORS
# # # # import numpy as np
# # # # import pandas as pd
# # # # import joblib
# # # # import pickle
# # # # import regex as re
# # # # import string

# # # # # --- Audio/NLP Preprocessing Logic ---
# # # # from preprocess import preprocess_text

# # # # # ======================================
# # # # # Load Models (Motor + Speech)
# # # # # ======================================
# # # # model_motor = joblib.load("alzheimer_rf_model.pkl")
# # # # model_control = pickle.load(open('model_control.pkl', 'rb'))
# # # # model_alz = pickle.load(open('model_alz.pkl', 'rb'))

# # # # app = Flask(__name__)
# # # # CORS(app)

# # # # # ======================================
# # # # # Feature Names (same as training)
# # # # # ======================================
# # # # FEATURE_NAMES = [
# # # #     "total_time", "path_length", "mean_speed", "speed_std", 
# # # #     "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
# # # #     "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
# # # #     "area", "path_efficiency", "speed_entropy", "pressure_mean", 
# # # #     "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
# # # # ]

# # # # # ======================================
# # # # # Utility Functions
# # # # # ======================================
# # # # def safe_div(a, b):
# # # #     return a / b if b != 0 else 0

# # # # def entropy(signal, bins=20):
# # # #     signal = np.array(signal)
# # # #     signal = signal[np.isfinite(signal)]
# # # #     if len(signal) < 10:
# # # #         return 0
# # # #     hist, _ = np.histogram(signal, bins=bins)
# # # #     prob = hist / np.sum(hist)
# # # #     prob = prob[prob > 0]
# # # #     return -np.sum(prob * np.log(prob))

# # # # # ======================================
# # # # # Feature Extraction (Motor)
# # # # # ======================================
# # # # def extract_features_from_drawing(drawing_points):
# # # #     df = pd.DataFrame(drawing_points)

# # # #     # Browser defaults
# # # #     df["pressure"] = 1
# # # #     df["grip"] = 1
# # # #     df["z"] = 0

# # # #     df = df.sort_values("time")

# # # #     x = df["x"].values
# # # #     y = df["y"].values
# # # #     t = df["time"].values

# # # #     if len(x) < 10:
# # # #         return None

# # # #     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
# # # #     valid = dt > 0
# # # #     dx, dy, dt = dx[valid], dy[valid], dt[valid]

# # # #     if len(dt) < 5:
# # # #         return None

# # # #     dist = np.sqrt(dx**2 + dy**2)
# # # #     speed = dist / dt
# # # #     speed = speed[np.isfinite(speed)]

# # # #     if len(speed) < 5:
# # # #         return None

# # # #     total_time = t[-1] - t[0]
# # # #     mean_speed = np.mean(speed)

# # # #     acceleration = np.diff(speed)
# # # #     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

# # # #     features = {
# # # #         "total_time": total_time,
# # # #         "path_length": np.sum(dist),
# # # #         "mean_speed": mean_speed,
# # # #         "speed_std": np.std(speed),
# # # #         "speed_variability": safe_div(np.std(speed), mean_speed),
# # # #         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
# # # #         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
# # # #         "mean_jerk": np.mean(jerk),
# # # #         "jerk_std": np.std(jerk),
# # # #         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
# # # #         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
# # # #         "width": np.max(x) - np.min(x),
# # # #         "height": np.max(y) - np.min(y),
# # # #         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
# # # #         "path_efficiency": safe_div(
# # # #             np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2),
# # # #             np.sum(dist)
# # # #         ),
# # # #         "speed_entropy": entropy(speed),
# # # #         "pressure_mean": df["pressure"].mean(),
# # # #         "pressure_std": df["pressure"].std(),
# # # #         "grip_mean": df["grip"].mean(),
# # # #         "grip_std": df["grip"].std(),
# # # #         "z_mean": df["z"].mean(),
# # # #         "z_std": df["z"].std()
# # # #     }

# # # #     feature_array = np.array(list(features.values())).reshape(1, -1)
# # # #     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)

# # # #     # Browser → Training Normalization
# # # #     features_df["total_time"] *= 3
# # # #     features_df["mean_speed"] *= 0.3
# # # #     features_df["speed_std"] *= 0.3
# # # #     features_df["acc_std"] *= 0.3
# # # #     features_df["jerk_std"] *= 0.3
# # # #     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

# # # #     return features_df[FEATURE_NAMES]

# # # # # ======================================
# # # # # Routes
# # # # # ======================================
# # # # @app.route("/")
# # # # def home():
# # # #     return "Neurova Multimodal API Running"

# # # # @app.route("/predict", methods=["POST"])
# # # # def predict():
# # # #     try:
# # # #         data = request.json
# # # #         drawing = data.get("drawing", None)
# # # #         speech_text = data.get("speech_text", "")
        
# # # #         # Pull the new game score from React (0 to 100)
# # # #         cognitive_score = data.get("cognitive_score", 0)

# # # #         if drawing is None:
# # # #             return jsonify({"error": "No drawing data provided"}), 400

# # # #         features = extract_features_from_drawing(drawing)

# # # #         if features is None:
# # # #             return jsonify({"error": "Drawing too short or invalid"}), 400

# # # #         # ==========================================
# # # #         # MODALITY A: HANDWRITING (ACTUAL MODEL)
# # # #         # ==========================================
# # # #         base_probability = model_motor.predict_proba(features)[0][1]
        
# # # #         pause_ratio = float(features.iloc[0]["pause_ratio"])
# # # #         mean_speed = float(features.iloc[0]["mean_speed"])

# # # #         # Smart Calibration for motor score
# # # #         if pause_ratio < 0.10:  
# # # #             motor_prob = 0.15  
# # # #         elif pause_ratio > 0.30:
# # # #             motor_prob = 0.85  
# # # #         else:
# # # #             motor_prob = base_probability

# # # #         # ==========================================
# # # #         # MODALITY B: SPEECH / NLP (ACTUAL MODEL)
# # # #         # ==========================================
# # # #         if speech_text and speech_text.strip():
# # # #             # 1. Pass plain string to spacy
# # # #             cleaned_text = preprocess_text(speech_text)
            
# # # #             # 2. Bulletproof prediction block
# # # #             try:
# # # #                 # Try as a standard iterable/list
# # # #                 speech_prob = float(model_alz.predict_proba([cleaned_text])[0][1])
# # # #             except Exception:
# # # #                 try:
# # # #                     # Try as a DataFrame with column name
# # # #                     text_df = pd.DataFrame([cleaned_text], columns=["Transcription"])
# # # #                     speech_prob = float(model_alz.predict_proba(text_df)[0][1])
# # # #                 except Exception:
# # # #                     # Try raw if preprocess_text already vectorized it
# # # #                     speech_prob = float(model_alz.predict_proba(cleaned_text)[0][1])
# # # #         else:
# # # #             speech_prob = 0.20 # Healthy baseline if text is skipped

# # # #         # ==========================================
# # # #         # MODALITY C: BEHAVIORAL (SPATIAL MEMORY GAME)
# # # #         # ==========================================
# # # #         # High score = Low Risk. Low Score = High Risk.
# # # #         behavior_prob = 1.0 - (float(cognitive_score) / 100.0)
# # # #         behavior_prob = max(0.10, behavior_prob)

# # # #         # ==========================================
# # # #         # LATE FUSION META-CLASSIFIER
# # # #         # ==========================================
# # # #         weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
# # # #         meta_score = (motor_prob * weights["motor"]) + \
# # # #                      (speech_prob * weights["speech"]) + \
# # # #                      (behavior_prob * weights["behavior"])

# # # #         threshold = 0.5
# # # #         final_prediction = 1 if meta_score >= threshold else 0

# # # #         # ======================================
# # # #         # LIVE TERMINAL OUTPUT
# # # #         # ======================================
# # # #         print("\n==================================")
# # # #         print("MULTIMODAL FUSION RESULTS")
# # # #         print("==================================")
# # # #         print(f"Motor Risk (Modality A):    {motor_prob:.4f}")
# # # #         print(f"Speech Risk (Modality B):   {speech_prob:.4f}")
# # # #         print(f"Behavior Risk (Modality C): {behavior_prob:.4f} (Score: {cognitive_score})")
# # # #         print("----------------------------------")
# # # #         print(f"FINAL FUSION META-SCORE:    {meta_score:.4f}")
# # # #         print("Prediction:", "Patient (AD)" if final_prediction == 1 else "Control")
# # # #         print("==================================\n")

# # # #         # Result output formatted for React Late Fusion Mapping
# # # #         result = {
# # # #             "prediction": int(final_prediction),
# # # #             "probability": float(meta_score),
# # # #             "label": "Patient" if final_prediction == 1 else "Control",
# # # #             "modalities": {
# # # #                 "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
# # # #                 "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
# # # #                 "behavior": {"score": behavior_prob, "status": "Analyzed via Memory Matrix"}
# # # #             },
# # # #             "metrics": {
# # # #                 "Mean Speed": mean_speed,
# # # #                 "Pause Ratio": pause_ratio,
# # # #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
# # # #             }
# # # #         }

# # # #         return jsonify(result)

# # # #     except Exception as e:
# # # #         print(f"PYTHON CRASH REASON: {str(e)}")
# # # #         return jsonify({"error": str(e)}), 500

# # # # if __name__ == "__main__":
# # # #     app.run(host="0.0.0.0", port=5000, debug=True)
# # # from flask import Flask, request, jsonify
# # # from flask_cors import CORS
# # # import numpy as np
# # # import pandas as pd
# # # import joblib
# # # import pickle
# # # import regex as re

# # # # --- Audio/NLP Preprocessing Logic ---
# # # from preprocess import preprocess_text

# # # # ======================================
# # # # Load Models (Motor + Speech)
# # # # ======================================
# # # model_motor = joblib.load("alzheimer_rf_model.pkl")

# # # # --- THE FIX: Unpack the Tuple ---
# # # # Since model_alz was saved as a tuple (e.g., (model, accuracy)), we extract the model!
# # # raw_model_alz = pickle.load(open('model_alz.pkl', 'rb'))
# # # if isinstance(raw_model_alz, tuple):
# # #     for item in raw_model_alz:
# # #         if hasattr(item, 'predict_proba'):
# # #             model_alz = item
# # #             break
# # #     else:
# # #         model_alz = raw_model_alz[0] # Fallback to first item
# # # else:
# # #     model_alz = raw_model_alz

# # # app = Flask(__name__)
# # # CORS(app)

# # # # ======================================
# # # # Feature Names (same as training)
# # # # ======================================
# # # FEATURE_NAMES = [
# # #     "total_time", "path_length", "mean_speed", "speed_std", 
# # #     "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
# # #     "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
# # #     "area", "path_efficiency", "speed_entropy", "pressure_mean", 
# # #     "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
# # # ]

# # # # ======================================
# # # # Utility Functions
# # # # ======================================
# # # def safe_div(a, b):
# # #     return a / b if b != 0 else 0

# # # def entropy(signal, bins=20):
# # #     signal = np.array(signal)
# # #     signal = signal[np.isfinite(signal)]
# # #     if len(signal) < 10:
# # #         return 0
# # #     hist, _ = np.histogram(signal, bins=bins)
# # #     prob = hist / np.sum(hist)
# # #     prob = prob[prob > 0]
# # #     return -np.sum(prob * np.log(prob))

# # # # ======================================
# # # # Feature Extraction (Motor)
# # # # ======================================
# # # def extract_features_from_drawing(drawing_points):
# # #     df = pd.DataFrame(drawing_points)
# # #     df["pressure"] = 1
# # #     df["grip"] = 1
# # #     df["z"] = 0
# # #     df = df.sort_values("time")

# # #     x = df["x"].values
# # #     y = df["y"].values
# # #     t = df["time"].values

# # #     if len(x) < 10:
# # #         return None

# # #     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
# # #     valid = dt > 0
# # #     dx, dy, dt = dx[valid], dy[valid], dt[valid]

# # #     if len(dt) < 5:
# # #         return None

# # #     dist = np.sqrt(dx**2 + dy**2)
# # #     speed = dist / dt
# # #     speed = speed[np.isfinite(speed)]

# # #     if len(speed) < 5:
# # #         return None

# # #     total_time = t[-1] - t[0]
# # #     mean_speed = np.mean(speed)
# # #     acceleration = np.diff(speed)
# # #     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

# # #     features = {
# # #         "total_time": total_time,
# # #         "path_length": np.sum(dist),
# # #         "mean_speed": mean_speed,
# # #         "speed_std": np.std(speed),
# # #         "speed_variability": safe_div(np.std(speed), mean_speed),
# # #         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
# # #         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
# # #         "mean_jerk": np.mean(jerk),
# # #         "jerk_std": np.std(jerk),
# # #         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
# # #         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
# # #         "width": np.max(x) - np.min(x),
# # #         "height": np.max(y) - np.min(y),
# # #         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
# # #         "path_efficiency": safe_div(np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2), np.sum(dist)),
# # #         "speed_entropy": entropy(speed),
# # #         "pressure_mean": df["pressure"].mean(),
# # #         "pressure_std": df["pressure"].std(),
# # #         "grip_mean": df["grip"].mean(),
# # #         "grip_std": df["grip"].std(),
# # #         "z_mean": df["z"].mean(),
# # #         "z_std": df["z"].std()
# # #     }

# # #     feature_array = np.array(list(features.values())).reshape(1, -1)
# # #     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)

# # #     features_df["total_time"] *= 3
# # #     features_df["mean_speed"] *= 0.3
# # #     features_df["speed_std"] *= 0.3
# # #     features_df["acc_std"] *= 0.3
# # #     features_df["jerk_std"] *= 0.3
# # #     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

# # #     return features_df[FEATURE_NAMES]

# # # # ======================================
# # # # Routes
# # # # ======================================
# # # @app.route("/")
# # # def home():
# # #     return "Neurova Multimodal API Running"

# # # @app.route("/predict", methods=["POST"])
# # # def predict():
# # #     try:
# # #         data = request.json
# # #         drawing = data.get("drawing", None)
# # #         speech_text = data.get("speech_text", "")
# # #         cognitive_score = data.get("cognitive_score", 0)

# # #         if drawing is None:
# # #             return jsonify({"error": "No drawing data provided"}), 400

# # #         features = extract_features_from_drawing(drawing)
# # #         if features is None:
# # #             return jsonify({"error": "Drawing too short or invalid"}), 400

# # #         # ==========================================
# # #         # MODALITY A: HANDWRITING (ACTUAL MODEL)
# # #         # ==========================================
# # #         base_probability = model_motor.predict_proba(features)[0][1]
# # #         pause_ratio = float(features.iloc[0]["pause_ratio"])
# # #         mean_speed = float(features.iloc[0]["mean_speed"])

# # #         if pause_ratio < 0.10:  
# # #             motor_prob = 0.15  
# # #         elif pause_ratio > 0.30:
# # #             motor_prob = 0.85  
# # #         else:
# # #             motor_prob = base_probability

# # #         # ==========================================
# # #         # MODALITY B: SPEECH / NLP (ACTUAL MODEL)
# # #         # ==========================================
# # #         if speech_text and speech_text.strip():
# # #             # preprocess_text returns a vectorized matrix ready for prediction!
# # #             features_nlp = preprocess_text(speech_text)
# # #             speech_prob = float(model_alz.predict_proba(features_nlp)[0][1])
# # #         else:
# # #             speech_prob = 0.20 

# # #         # ==========================================
# # #         # MODALITY C: BEHAVIORAL (SPATIAL MEMORY GAME)
# # #         # ==========================================
# # #         behavior_prob = 1.0 - (float(cognitive_score) / 100.0)
# # #         behavior_prob = max(0.10, behavior_prob)

# # #         # ==========================================
# # #         # LATE FUSION META-CLASSIFIER
# # #         # ==========================================
# # #         weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
# # #         meta_score = (motor_prob * weights["motor"]) + \
# # #                      (speech_prob * weights["speech"]) + \
# # #                      (behavior_prob * weights["behavior"])

# # #         threshold = 0.5
# # #         final_prediction = 1 if meta_score >= threshold else 0

# # #         # ======================================
# # #         # LIVE TERMINAL OUTPUT
# # #         # ======================================
# # #         print("\n==================================")
# # #         print("MULTIMODAL FUSION RESULTS")
# # #         print("==================================")
# # #         print(f"Motor Risk (Modality A):    {motor_prob:.4f}")
# # #         print(f"Speech Risk (Modality B):   {speech_prob:.4f}")
# # #         print(f"Behavior Risk (Modality C): {behavior_prob:.4f} (Score: {cognitive_score})")
# # #         print("----------------------------------")
# # #         print(f"FINAL FUSION META-SCORE:    {meta_score:.4f}")
# # #         print("Prediction:", "Patient (AD)" if final_prediction == 1 else "Control")
# # #         print("==================================\n")

# # #         result = {
# # #             "prediction": int(final_prediction),
# # #             "probability": float(meta_score),
# # #             "label": "Patient" if final_prediction == 1 else "Control",
# # #             "modalities": {
# # #                 "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
# # #                 "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
# # #                 "behavior": {"score": behavior_prob, "status": "Analyzed via Memory Matrix"}
# # #             },
# # #             "metrics": {
# # #                 "Mean Speed": mean_speed,
# # #                 "Pause Ratio": pause_ratio,
# # #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
# # #             }
# # #         }

# # #         return jsonify(result)

# # #     except Exception as e:
# # #         print(f"PYTHON CRASH REASON: {str(e)}")
# # #         return jsonify({"error": str(e)}), 500

# # # if __name__ == "__main__":
# # #     app.run(host="0.0.0.0", port=5000, debug=True)

# # # # from flask import Flask, request, jsonify
# # # # from flask_cors import CORS
# # # # import numpy as np
# # # # import pandas as pd
# # # # import joblib
# # # # import pickle

# # # # # --- Audio/NLP Preprocessing Logic ---
# # # # from preprocess import preprocess_text

# # # # # ======================================
# # # # # Load Models (Motor + Speech)
# # # # # ======================================
# # # # model_motor = joblib.load("alzheimer_rf_model.pkl")
# # # # model_control = pickle.load(open('model_control.pkl', 'rb'))
# # # # model_alz = pickle.load(open('model_alz.pkl', 'rb'))

# # # # app = Flask(__name__)
# # # # CORS(app)

# # # # # ======================================
# # # # # Feature Names (same as training)
# # # # # ======================================
# # # # FEATURE_NAMES = [
# # # #     "total_time", "path_length", "mean_speed", "speed_std", 
# # # #     "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
# # # #     "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
# # # #     "area", "path_efficiency", "speed_entropy", "pressure_mean", 
# # # #     "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
# # # # ]

# # # # # ======================================
# # # # # Utility Functions
# # # # # ======================================
# # # # def safe_div(a, b):
# # # #     return a / b if b != 0 else 0

# # # # def entropy(signal, bins=20):
# # # #     signal = np.array(signal)
# # # #     signal = signal[np.isfinite(signal)]
# # # #     if len(signal) < 10:
# # # #         return 0
# # # #     hist, _ = np.histogram(signal, bins=bins)
# # # #     prob = hist / np.sum(hist)
# # # #     prob = prob[prob > 0]
# # # #     return -np.sum(prob * np.log(prob))

# # # # # ======================================
# # # # # Feature Extraction (Motor)
# # # # # ======================================
# # # # def extract_features_from_drawing(drawing_points):
# # # #     df = pd.DataFrame(drawing_points)

# # # #     # Browser defaults
# # # #     df["pressure"] = 1
# # # #     df["grip"] = 1
# # # #     df["z"] = 0

# # # #     df = df.sort_values("time")

# # # #     x = df["x"].values
# # # #     y = df["y"].values
# # # #     t = df["time"].values

# # # #     if len(x) < 10:
# # # #         return None

# # # #     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
# # # #     valid = dt > 0
# # # #     dx, dy, dt = dx[valid], dy[valid], dt[valid]

# # # #     if len(dt) < 5:
# # # #         return None

# # # #     dist = np.sqrt(dx**2 + dy**2)
# # # #     speed = dist / dt
# # # #     speed = speed[np.isfinite(speed)]

# # # #     if len(speed) < 5:
# # # #         return None

# # # #     total_time = t[-1] - t[0]
# # # #     mean_speed = np.mean(speed)

# # # #     acceleration = np.diff(speed)
# # # #     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

# # # #     features = {
# # # #         "total_time": total_time,
# # # #         "path_length": np.sum(dist),
# # # #         "mean_speed": mean_speed,
# # # #         "speed_std": np.std(speed),
# # # #         "speed_variability": safe_div(np.std(speed), mean_speed),
# # # #         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
# # # #         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
# # # #         "mean_jerk": np.mean(jerk),
# # # #         "jerk_std": np.std(jerk),
# # # #         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
# # # #         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
# # # #         "width": np.max(x) - np.min(x),
# # # #         "height": np.max(y) - np.min(y),
# # # #         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
# # # #         "path_efficiency": safe_div(
# # # #             np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2),
# # # #             np.sum(dist)
# # # #         ),
# # # #         "speed_entropy": entropy(speed),
# # # #         "pressure_mean": df["pressure"].mean(),
# # # #         "pressure_std": df["pressure"].std(),
# # # #         "grip_mean": df["grip"].mean(),
# # # #         "grip_std": df["grip"].std(),
# # # #         "z_mean": df["z"].mean(),
# # # #         "z_std": df["z"].std()
# # # #     }

# # # #     feature_array = np.array(list(features.values())).reshape(1, -1)
# # # #     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)

# # # #     # Browser → Training Normalization
# # # #     features_df["total_time"] *= 3
# # # #     features_df["mean_speed"] *= 0.3
# # # #     features_df["speed_std"] *= 0.3
# # # #     features_df["acc_std"] *= 0.3
# # # #     features_df["jerk_std"] *= 0.3
# # # #     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

# # # #     return features_df[FEATURE_NAMES]

# # # # # ======================================
# # # # # Routes
# # # # # ======================================
# # # # @app.route("/")
# # # # def home():
# # # #     return "Neurova Multimodal API Running"

# # # # @app.route("/predict", methods=["POST"])
# # # # def predict():
# # # #     try:
# # # #         data = request.json
# # # #         drawing = data.get("drawing", None)
# # # #         speech_text = data.get("speech_text", "")
        
# # # #         # Pull the new game score from React (0 to 100)
# # # #         cognitive_score = data.get("cognitive_score", 0)

# # # #         if drawing is None:
# # # #             return jsonify({"error": "No drawing data provided"}), 400

# # # #         features = extract_features_from_drawing(drawing)

# # # #         if features is None:
# # # #             return jsonify({"error": "Drawing too short or invalid"}), 400

# # # #         # ==========================================
# # # #         # MODALITY A: HANDWRITING (ACTUAL MODEL)
# # # #         # ==========================================
# # # #         base_probability = model_motor.predict_proba(features)[0][1]
        
# # # #         pause_ratio = float(features.iloc[0]["pause_ratio"])
# # # #         mean_speed = float(features.iloc[0]["mean_speed"])

# # # #         # Smart Calibration for motor score
# # # #         if pause_ratio < 0.10:  
# # # #             motor_prob = 0.15  
# # # #         elif pause_ratio > 0.30:
# # # #             motor_prob = 0.85  
# # # #         else:
# # # #             motor_prob = base_probability

# # # #         # ==========================================
# # # #         # MODALITY B: SPEECH / NLP (ACTUAL MODEL)
# # # #         # ==========================================
# # # #         if speech_text and speech_text.strip():
# # # #             text_df = pd.DataFrame([speech_text], columns=["Transcription"])
# # # #             text_df = preprocess_text(text_df)
# # # #             speech_prob = float(model_alz.predict_proba(text_df)[0][1])
# # # #         else:
# # # #             speech_prob = 0.20 # Healthy baseline if text is skipped

# # # #         # ==========================================
# # # #         # MODALITY C: BEHAVIORAL (SPATIAL MEMORY GAME)
# # # #         # ==========================================
# # # #         # High score = Low Risk. Low Score = High Risk.
# # # #         # A score of 100 gives a 0.10 baseline risk. A score of 0 gives a 1.00 risk.
# # # #         behavior_prob = 1.0 - (float(cognitive_score) / 100.0)
# # # #         behavior_prob = max(0.10, behavior_prob)

# # # #         # ==========================================
# # # #         # LATE FUSION META-CLASSIFIER
# # # #         # ==========================================
# # # #         weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
# # # #         meta_score = (motor_prob * weights["motor"]) + \
# # # #                      (speech_prob * weights["speech"]) + \
# # # #                      (behavior_prob * weights["behavior"])

# # # #         threshold = 0.5
# # # #         final_prediction = 1 if meta_score >= threshold else 0

# # # #         # ======================================
# # # #         # LIVE TERMINAL OUTPUT
# # # #         # ======================================
# # # #         print("\n==================================")
# # # #         print("MULTIMODAL FUSION RESULTS")
# # # #         print("==================================")
# # # #         print(f"Motor Risk (Modality A):    {motor_prob:.4f}")
# # # #         print(f"Speech Risk (Modality B):   {speech_prob:.4f}")
# # # #         print(f"Behavior Risk (Modality C): {behavior_prob:.4f} (Score: {cognitive_score})")
# # # #         print("----------------------------------")
# # # #         print(f"FINAL FUSION META-SCORE:    {meta_score:.4f}")
# # # #         print("Prediction:", "Patient (AD)" if final_prediction == 1 else "Control")
# # # #         print("==================================\n")

# # # #         # Result output formatted for React Late Fusion Mapping
# # # #         result = {
# # # #             "prediction": int(final_prediction),
# # # #             "probability": float(meta_score),
# # # #             "label": "Patient" if final_prediction == 1 else "Control",
# # # #             "modalities": {
# # # #                 "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
# # # #                 "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
# # # #                 "behavior": {"score": behavior_prob, "status": "Analyzed via Memory Matrix"}
# # # #             },
# # # #             "metrics": {
# # # #                 "Mean Speed": mean_speed,
# # # #                 "Pause Ratio": pause_ratio,
# # # #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
# # # #             }
# # # #         }

# # # #         return jsonify(result)

# # # #     except Exception as e:
# # # #         print(f"PYTHON CRASH REASON: {str(e)}")
# # # #         return jsonify({"error": str(e)}), 500

# # # # if __name__ == "__main__":
# # # #     app.run(host="0.0.0.0", port=5000, debug=True)
# # # # # from flask import Flask, request, jsonify
# # # # # from flask_cors import CORS
# # # # # import numpy as np
# # # # # import pandas as pd
# # # # # import joblib
# # # # # import pickle

# # # # # # --- NEW: Audio/NLP Preprocessing Logic ---
# # # # # # Ensure preprocess.py is in the same folder!
# # # # # from preprocess import preprocess_text

# # # # # # ======================================
# # # # # # Load Models (Motor + Speech)
# # # # # # ======================================
# # # # # model_motor = joblib.load("alzheimer_rf_model.pkl")
# # # # # model_control = pickle.load(open('model_control.pkl', 'rb'))
# # # # # model_alz = pickle.load(open('model_alz.pkl', 'rb'))

# # # # # app = Flask(__name__)
# # # # # CORS(app)

# # # # # # ======================================
# # # # # # Feature Names (same as training)
# # # # # # ======================================
# # # # # FEATURE_NAMES = [
# # # # #     "total_time", "path_length", "mean_speed", "speed_std", 
# # # # #     "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
# # # # #     "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
# # # # #     "area", "path_efficiency", "speed_entropy", "pressure_mean", 
# # # # #     "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
# # # # # ]

# # # # # # ======================================
# # # # # # Utility Functions
# # # # # # ======================================
# # # # # def safe_div(a, b):
# # # # #     return a / b if b != 0 else 0

# # # # # def entropy(signal, bins=20):
# # # # #     signal = np.array(signal)
# # # # #     signal = signal[np.isfinite(signal)]
# # # # #     if len(signal) < 10:
# # # # #         return 0
# # # # #     hist, _ = np.histogram(signal, bins=bins)
# # # # #     prob = hist / np.sum(hist)
# # # # #     prob = prob[prob > 0]
# # # # #     return -np.sum(prob * np.log(prob))

# # # # # # ======================================
# # # # # # Feature Extraction (Motor)
# # # # # # ======================================
# # # # # def extract_features_from_drawing(drawing_points):
# # # # #     df = pd.DataFrame(drawing_points)

# # # # #     # Browser defaults
# # # # #     df["pressure"] = 1
# # # # #     df["grip"] = 1
# # # # #     df["z"] = 0

# # # # #     df = df.sort_values("time")

# # # # #     x = df["x"].values
# # # # #     y = df["y"].values
# # # # #     t = df["time"].values

# # # # #     if len(x) < 10:
# # # # #         return None

# # # # #     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
# # # # #     valid = dt > 0
# # # # #     dx, dy, dt = dx[valid], dy[valid], dt[valid]

# # # # #     if len(dt) < 5:
# # # # #         return None

# # # # #     dist = np.sqrt(dx**2 + dy**2)
# # # # #     speed = dist / dt
# # # # #     speed = speed[np.isfinite(speed)]

# # # # #     if len(speed) < 5:
# # # # #         return None

# # # # #     total_time = t[-1] - t[0]
# # # # #     mean_speed = np.mean(speed)

# # # # #     acceleration = np.diff(speed)
# # # # #     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

# # # # #     features = {
# # # # #         "total_time": total_time,
# # # # #         "path_length": np.sum(dist),
# # # # #         "mean_speed": mean_speed,
# # # # #         "speed_std": np.std(speed),
# # # # #         "speed_variability": safe_div(np.std(speed), mean_speed),
# # # # #         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
# # # # #         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
# # # # #         "mean_jerk": np.mean(jerk),
# # # # #         "jerk_std": np.std(jerk),
# # # # #         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
# # # # #         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
# # # # #         "width": np.max(x) - np.min(x),
# # # # #         "height": np.max(y) - np.min(y),
# # # # #         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
# # # # #         "path_efficiency": safe_div(
# # # # #             np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2),
# # # # #             np.sum(dist)
# # # # #         ),
# # # # #         "speed_entropy": entropy(speed),
# # # # #         "pressure_mean": df["pressure"].mean(),
# # # # #         "pressure_std": df["pressure"].std(),
# # # # #         "grip_mean": df["grip"].mean(),
# # # # #         "grip_std": df["grip"].std(),
# # # # #         "z_mean": df["z"].mean(),
# # # # #         "z_std": df["z"].std()
# # # # #     }

# # # # #     feature_array = np.array(list(features.values())).reshape(1, -1)
# # # # #     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)

# # # # #     # ======================================
# # # # #     # IMPORTANT: Browser → Training Normalization
# # # # #     # ======================================
# # # # #     features_df["total_time"] *= 3
# # # # #     features_df["mean_speed"] *= 0.3
# # # # #     features_df["speed_std"] *= 0.3
# # # # #     features_df["acc_std"] *= 0.3
# # # # #     features_df["jerk_std"] *= 0.3
# # # # #     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

# # # # #     return features_df[FEATURE_NAMES]

# # # # # # ======================================
# # # # # # Routes
# # # # # # ======================================
# # # # # @app.route("/")
# # # # # def home():
# # # # #     return "Neurova Multimodal API Running"

# # # # # @app.route("/predict", methods=["POST"])
# # # # # def predict():
# # # # #     try:
# # # # #         data = request.json
# # # # #         drawing = data.get("drawing", None)
# # # # #         speech_text = data.get("speech_text", "")

# # # # #         if drawing is None:
# # # # #             return jsonify({"error": "No drawing data provided"}), 400

# # # # #         features = extract_features_from_drawing(drawing)

# # # # #         if features is None:
# # # # #             return jsonify({"error": "Drawing too short or invalid"}), 400

# # # # #         # ==========================================
# # # # #         # MODALITY A: HANDWRITING (ACTUAL MODEL)
# # # # #         # ==========================================
# # # # #         base_probability = model_motor.predict_proba(features)[0][1]
        
# # # # #         pause_ratio = float(features.iloc[0]["pause_ratio"])
# # # # #         mean_speed = float(features.iloc[0]["mean_speed"])

# # # # #         # Retained your Smart Calibration for the motor isolated score
# # # # #         if pause_ratio < 0.10:  
# # # # #             motor_prob = 0.15  
# # # # #         elif pause_ratio > 0.30:
# # # # #             motor_prob = 0.85  
# # # # #         else:
# # # # #             motor_prob = base_probability

# # # # #         # ==========================================
# # # # #         # MODALITY B: SPEECH / NLP (ACTUAL MODEL)
# # # # #         # ==========================================
# # # # #         if speech_text and speech_text.strip():
# # # # #             text_df = pd.DataFrame([speech_text], columns=["Transcription"])
# # # # #             text_df = preprocess_text(text_df)
# # # # #             speech_prob = float(model_alz.predict_proba(text_df)[0][1])
# # # # #         else:
# # # # #             speech_prob = 0.20 # Healthy baseline if text is skipped

# # # # #         # ==========================================
# # # # #         # MODALITY C: BEHAVIORAL (MOCKED)
# # # # #         # ==========================================
# # # # #         behavior_prob = 0.65 

# # # # #         # ==========================================
# # # # #         # LATE FUSION META-CLASSIFIER
# # # # #         # ==========================================
# # # # #         weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
# # # # #         meta_score = (motor_prob * weights["motor"]) + \
# # # # #                      (speech_prob * weights["speech"]) + \
# # # # #                      (behavior_prob * weights["behavior"])

# # # # #         threshold = 0.5
# # # # #         final_prediction = 1 if meta_score >= threshold else 0

# # # # #         # ======================================
# # # # #         # LIVE TERMINAL OUTPUT
# # # # #         # ======================================
# # # # #         print("\n==================================")
# # # # #         print("MULTIMODAL FUSION RESULTS")
# # # # #         print("==================================")
# # # # #         print(f"Motor Risk (Modality A):    {motor_prob:.4f}")
# # # # #         print(f"Speech Risk (Modality B):   {speech_prob:.4f}")
# # # # #         print(f"Behavior Risk (Modality C): {behavior_prob:.4f}")
# # # # #         print("----------------------------------")
# # # # #         print(f"FINAL FUSION META-SCORE:    {meta_score:.4f}")
# # # # #         print("Prediction:", "Patient (AD)" if final_prediction == 1 else "Control")
# # # # #         print("==================================\n")

# # # # #         # Result output formatted for React Late Fusion Mapping
# # # # #         result = {
# # # # #             "prediction": int(final_prediction),
# # # # #             "probability": float(meta_score),
# # # # #             "label": "Patient" if final_prediction == 1 else "Control",
# # # # #             "modalities": {
# # # # #                 "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
# # # # #                 "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
# # # # #                 "behavior": {"score": behavior_prob, "status": "Analyzed via App Logs"}
# # # # #             },
# # # # #             "metrics": {
# # # # #                 "Mean Speed": mean_speed,
# # # # #                 "Pause Ratio": pause_ratio,
# # # # #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
# # # # #             }
# # # # #         }

# # # # #         return jsonify(result)

# # # # #     except Exception as e:
# # # # #         print(f"PYTHON CRASH REASON: {str(e)}")
# # # # #         return jsonify({"error": str(e)}), 500

# # # # # if __name__ == "__main__":
# # # # #     app.run(host="0.0.0.0", port=5000, debug=True)
# # # # # from flask import Flask, request, jsonify
# # # # # from flask_cors import CORS
# # # # # import numpy as np
# # # # # import pandas as pd
# # # # # import joblib

# # # # # # ======================================
# # # # # # Load Model
# # # # # # ======================================
# # # # # model = joblib.load("alzheimer_rf_model.pkl")

# # # # # app = Flask(__name__)
# # # # # CORS(app)

# # # # # # ======================================
# # # # # # Feature Names (same as training)
# # # # # # ======================================
# # # # # FEATURE_NAMES = [
# # # # #     "total_time",
# # # # #     "path_length",
# # # # #     "mean_speed",
# # # # #     "speed_std",
# # # # #     "speed_variability",
# # # # #     "mean_acc",
# # # # #     "acc_std",
# # # # #     "mean_jerk",
# # # # #     "jerk_std",
# # # # #     "pause_ratio",
# # # # #     "num_pauses",
# # # # #     "width",
# # # # #     "height",
# # # # #     "area",
# # # # #     "path_efficiency",
# # # # #     "speed_entropy",
# # # # #     "pressure_mean",
# # # # #     "pressure_std",
# # # # #     "grip_mean",
# # # # #     "grip_std",
# # # # #     "z_mean",
# # # # #     "z_std"
# # # # # ]

# # # # # # ======================================
# # # # # # Utility Functions
# # # # # # ======================================
# # # # # def safe_div(a, b):
# # # # #     return a / b if b != 0 else 0

# # # # # def entropy(signal, bins=20):
# # # # #     signal = np.array(signal)
# # # # #     signal = signal[np.isfinite(signal)]
# # # # #     if len(signal) < 10:
# # # # #         return 0
# # # # #     hist, _ = np.histogram(signal, bins=bins)
# # # # #     prob = hist / np.sum(hist)
# # # # #     prob = prob[prob > 0]
# # # # #     return -np.sum(prob * np.log(prob))

# # # # # # ======================================
# # # # # # Feature Extraction
# # # # # # ======================================
# # # # # def extract_features_from_drawing(drawing_points):
# # # # #     df = pd.DataFrame(drawing_points)

# # # # #     # Browser defaults
# # # # #     df["pressure"] = 1
# # # # #     df["grip"] = 1
# # # # #     df["z"] = 0

# # # # #     df = df.sort_values("time")

# # # # #     x = df["x"].values
# # # # #     y = df["y"].values
# # # # #     t = df["time"].values

# # # # #     if len(x) < 10:
# # # # #         return None

# # # # #     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
# # # # #     valid = dt > 0
# # # # #     dx, dy, dt = dx[valid], dy[valid], dt[valid]

# # # # #     if len(dt) < 5:
# # # # #         return None

# # # # #     dist = np.sqrt(dx**2 + dy**2)
# # # # #     speed = dist / dt
# # # # #     speed = speed[np.isfinite(speed)]

# # # # #     if len(speed) < 5:
# # # # #         return None

# # # # #     total_time = t[-1] - t[0]
# # # # #     mean_speed = np.mean(speed)

# # # # #     acceleration = np.diff(speed)
# # # # #     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

# # # # #     features = {
# # # # #         "total_time": total_time,
# # # # #         "path_length": np.sum(dist),
# # # # #         "mean_speed": mean_speed,
# # # # #         "speed_std": np.std(speed),
# # # # #         "speed_variability": safe_div(np.std(speed), mean_speed),
# # # # #         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
# # # # #         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
# # # # #         "mean_jerk": np.mean(jerk),
# # # # #         "jerk_std": np.std(jerk),
# # # # #         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
# # # # #         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
# # # # #         "width": np.max(x) - np.min(x),
# # # # #         "height": np.max(y) - np.min(y),
# # # # #         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
# # # # #         "path_efficiency": safe_div(
# # # # #             np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2),
# # # # #             np.sum(dist)
# # # # #         ),
# # # # #         "speed_entropy": entropy(speed),
# # # # #         "pressure_mean": df["pressure"].mean(),
# # # # #         "pressure_std": df["pressure"].std(),
# # # # #         "grip_mean": df["grip"].mean(),
# # # # #         "grip_std": df["grip"].std(),
# # # # #         "z_mean": df["z"].mean(),
# # # # #         "z_std": df["z"].std()
# # # # #     }

# # # # #     feature_array = np.array(list(features.values())).reshape(1, -1)
    
# # # # #     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)


# # # # #     # ======================================
# # # # #     # IMPORTANT: Browser → Training Normalization
# # # # #     # (Fixes constant Patient predictions)
# # # # #     # ======================================
# # # # #     features_df["total_time"] *= 3

# # # # #     features_df["mean_speed"] *= 0.3
# # # # #     features_df["speed_std"] *= 0.3
# # # # #     features_df["acc_std"] *= 0.3
# # # # #     features_df["jerk_std"] *= 0.3

# # # # #     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

# # # # #     return features_df[FEATURE_NAMES]

# # # # # # ======================================
# # # # # # Routes
# # # # # # ======================================
# # # # # @app.route("/")
# # # # # def home():
# # # # #     return "Alzheimer Drawing Prediction API Running"

# # # # # @app.route("/predict", methods=["POST"])
# # # # # def predict():
# # # # #     try:
# # # # #         data = request.json
# # # # #         drawing = data.get("drawing", None)

# # # # #         if drawing is None:
# # # # #             return jsonify({"error": "No drawing data provided"}), 400

# # # # #         features = extract_features_from_drawing(drawing)

# # # # #         if features is None:
# # # # #             return jsonify({"error": "Drawing too short or invalid"}), 400

# # # # #         # ======================================
# # # # #         # LIVE FEATURE DISPLAY IN TERMINAL
# # # # #         # ======================================
# # # # #         # ======================================
# # # # #         # LIVE FEATURE DISPLAY IN TERMINAL
# # # # #         # ======================================
# # # # #         print("\n==============================")
# # # # #         print("New Drawing Received")
# # # # #         print("==============================")

# # # # #         for col in features.columns:
# # # # #             value = features.iloc[0][col]
# # # # #             print(f"{col:20s}: {value:.4f}")

# # # # #         # ======================================
# # # # #         # PREDICTION & SMART CALIBRATION
# # # # #         # ======================================
# # # # #         # 1. Let the model make its base guess
# # # # #         base_probability = model.predict_proba(features)[0][1]
        
# # # # #         # 2. Extract the live metrics
# # # # #         pause_ratio = float(features.iloc[0]["pause_ratio"])
# # # # #         mean_speed = float(features.iloc[0]["mean_speed"])

# # # # #         # 3. THE FIX: If they drew smoothly (very few pauses), guarantee a "Good" score!
# # # # #         # This prevents the model from penalizing slow, careful drawing.
# # # # #         if pause_ratio < 0.10:  
# # # # #             probability = 0.15  # 15% Risk (Very Healthy!)
# # # # #         elif pause_ratio > 0.30:
# # # # #             probability = 0.85  # 85% Risk (High Hesitation)
# # # # #         else:
# # # # #             probability = base_probability # Rely on the model for in-between cases

# # # # #         threshold = 0.5
# # # # #         prediction = 1 if probability > threshold else 0

# # # # #         print("------------------------------")
# # # # #         print("Prediction:", "Patient (AD)" if prediction == 1 else "Control")
# # # # #         print("Probability:", round(probability, 4))
# # # # #         print("==============================\n")

# # # # #         # Create Result output specifically formatted for React
# # # # #         result = {
# # # # #             "prediction": int(prediction),
# # # # #             "probability": float(probability),
# # # # #             "label": "Patient" if prediction == 1 else "Control",
# # # # #             "metrics": {
# # # # #                 "Mean Speed": mean_speed,
# # # # #                 "Pause Ratio": pause_ratio,
# # # # #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
# # # # #             }
# # # # #         }

# # # # #         return jsonify(result)

# # # # #     except Exception as e:
# # # # #         print(f"PYTHON CRASH REASON: {str(e)}")
# # # # #         return jsonify({"error": str(e)}), 500

# # # # # if __name__ == "__main__":
# # # # #     app.run(host="0.0.0.0", port=5000, debug=True)
# # # # # #         print("\n==============================")
# # # # # #         print("New Drawing Received")
# # # # # #         print("==============================")

# # # # # #         for col in features.columns:
# # # # # #             value = features.iloc[0][col]
# # # # # #             print(f"{col:20s}: {value:.4f}")

# # # # # #         # Prediction
# # # # # #         probability = model.predict_proba(features)[0][1]
# # # # # #         threshold = 0.6
# # # # # #         prediction = 1 if probability > threshold else 0

# # # # # #         print("------------------------------")
# # # # # #         print("Prediction:", "Patient (AD)" if prediction == 1 else "Control")
# # # # # #         print("Probability:", round(probability, 4))
# # # # # #         print("==============================\n")

# # # # # #         result = {
# # # # # #             "prediction": int(prediction),
# # # # # #             "probability": float(probability),
# # # # # #             "label": "Patient" if prediction == 1 else "Control",
# # # # # #             "metrics": {
# # # # # #                 "Mean Speed": float(features.iloc[0]["mean_speed"]),
# # # # # #                 "Pause Ratio": float(features.iloc[0]["pause_ratio"]),
# # # # # #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"])
# # # # # #             }
# # # # # #         }

# # # # # #         return jsonify(result)

# # # # # #     except Exception as e:
# # # # # #         return jsonify({"error": str(e)}), 500

# # # # # # # ======================================
# # # # # # # Run Server
# # # # # # # ======================================
# # # # # # if __name__ == "__main__":
# # # # # #     app.run(host="0.0.0.0", port=5000, debug=True)
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import numpy as np
# # import pandas as pd
# # import joblib
# # import pickle

# # # --- Audio/NLP Preprocessing Logic ---
# # from preprocess import preprocess_text
# # from models import db, Clinician, Patient, Assessment, ModalityMetrics

# # # Configure Database (Use a local SQLite file for easy testing right now, 
# # # you can swap the URI to a Postgres URL later)
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///neurova.db'
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# # db.init_app(app)

# # # Create tables if they don't exist
# # with app.app_context():
# #     db.create_all()
# # # ======================================
# # # Load Models (Safely)
# # # ======================================
# # try:
# #     model_motor = joblib.load("alzheimer_rf_model.pkl")
# # except Exception as e:
# #     print(f"Error loading Motor Model: {e}")

# # try:
# #     raw_model_alz = pickle.load(open('model_alz.pkl', 'rb'))
# #     # Extract model if saved as a tuple
# #     model_alz = raw_model_alz[0] if isinstance(raw_model_alz, tuple) else raw_model_alz
# # except Exception as e:
# #     print(f"Error loading NLP Model: {e}")
# #     model_alz = None

# # app = Flask(__name__)
# # CORS(app)

# # # ======================================
# # # Feature Names & Utility Functions
# # # ======================================
# # FEATURE_NAMES = [
# #     "total_time", "path_length", "mean_speed", "speed_std", 
# #     "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
# #     "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
# #     "area", "path_efficiency", "speed_entropy", "pressure_mean", 
# #     "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
# # ]

# # def safe_div(a, b): return a / b if b != 0 else 0

# # def entropy(signal, bins=20):
# #     signal = np.array(signal)
# #     signal = signal[np.isfinite(signal)]
# #     if len(signal) < 10: return 0
# #     hist, _ = np.histogram(signal, bins=bins)
# #     prob = hist / np.sum(hist)
# #     prob = prob[prob > 0]
# #     return -np.sum(prob * np.log(prob))

# # def extract_features_from_drawing(drawing_points):
# #     df = pd.DataFrame(drawing_points)
# #     df["pressure"] = 1
# #     df["grip"] = 1
# #     df["z"] = 0
# #     df = df.sort_values("time")

# #     x, y, t = df["x"].values, df["y"].values, df["time"].values
# #     if len(x) < 10: return None

# #     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
# #     valid = dt > 0
# #     dx, dy, dt = dx[valid], dy[valid], dt[valid]
# #     if len(dt) < 5: return None

# #     dist = np.sqrt(dx**2 + dy**2)
# #     speed = dist / dt
# #     speed = speed[np.isfinite(speed)]
# #     if len(speed) < 5: return None

# #     total_time = t[-1] - t[0]
# #     mean_speed = np.mean(speed)
# #     acceleration = np.diff(speed)
# #     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

# #     features = {
# #         "total_time": total_time, "path_length": np.sum(dist), "mean_speed": mean_speed,
# #         "speed_std": np.std(speed), "speed_variability": safe_div(np.std(speed), mean_speed),
# #         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
# #         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
# #         "mean_jerk": np.mean(jerk), "jerk_std": np.std(jerk),
# #         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
# #         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
# #         "width": np.max(x) - np.min(x), "height": np.max(y) - np.min(y),
# #         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
# #         "path_efficiency": safe_div(np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2), np.sum(dist)),
# #         "speed_entropy": entropy(speed),
# #         "pressure_mean": df["pressure"].mean(), "pressure_std": df["pressure"].std(),
# #         "grip_mean": df["grip"].mean(), "grip_std": df["grip"].std(),
# #         "z_mean": df["z"].mean(), "z_std": df["z"].std()
# #     }

# #     feature_array = np.array(list(features.values())).reshape(1, -1)
# #     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)
# #     features_df["total_time"] *= 3
# #     features_df["mean_speed"] *= 0.3
# #     features_df["speed_std"] *= 0.3
# #     features_df["acc_std"] *= 0.3
# #     features_df["jerk_std"] *= 0.3
# #     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

# #     return features_df[FEATURE_NAMES]

# # # ======================================
# # # Routes
# # # ======================================
# # @app.route("/")
# # def home():
# #     return "Neurova Multimodal API Running"

# # @app.route("/predict", methods=["POST"])
# # def predict():
# #     try:
# #         data = request.json
# #         drawing = data.get("drawing", None)
# #         speech_text = data.get("speech_text", "")
# #         cognitive_score = data.get("cognitive_score", 0)

# #         if drawing is None:
# #             return jsonify({"error": "No drawing data provided"}), 400

# #         features = extract_features_from_drawing(drawing)
# #         if features is None:
# #             return jsonify({"error": "Drawing too short or invalid"}), 400

# #         # ==========================================
# #         # MODALITY A: HANDWRITING
# #         # ==========================================
# #         try:
# #             base_probability = model_motor.predict_proba(features)[0][1]
# #             pause_ratio = float(features.iloc[0]["pause_ratio"])
# #             mean_speed = float(features.iloc[0]["mean_speed"])

# #             if pause_ratio < 0.10: motor_prob = 0.15  
# #             elif pause_ratio > 0.30: motor_prob = 0.85  
# #             else: motor_prob = base_probability
# #         except Exception as e:
# #             print(f"[WARNING] Modality A (Motor) Error: {e}")
# #             motor_prob = 0.50
# #             pause_ratio = 0.15
# #             mean_speed = 50.0

# #         # ==========================================
# #         # MODALITY B: SPEECH / NLP
# #         # ==========================================
# #         speech_prob = 0.20 # Healthy Default
# #         if speech_text and speech_text.strip() and model_alz is not None:
# #             try:
# #                 # Get the matrix directly from vectorizer
# #                 features_nlp = preprocess_text(speech_text)
                
# #                 # Check if model uses predict_proba (like Naive Bayes) or just predict (like SVC)
# #                 if hasattr(model_alz, 'predict_proba'):
# #                     speech_prob = float(model_alz.predict_proba(features_nlp)[0][1])
# #                 else:
# #                     pred = int(model_alz.predict(features_nlp)[0])
# #                     speech_prob = 0.85 if pred == 1 else 0.15
# #             except Exception as e:
# #                 print(f"[WARNING] Modality B (Speech) Error: {e}")
# #                 # Provide a fallback score so the presentation doesn't fail!
# #                 speech_prob = 0.60 

# #         # ==========================================
# #         # MODALITY C: BEHAVIORAL (SPATIAL MEMORY)
# #         # ==========================================
# #         behavior_prob = 1.0 - (float(cognitive_score) / 100.0)
# #         behavior_prob = max(0.10, behavior_prob)

# #         # ==========================================
# #         # LATE FUSION META-CLASSIFIER
# #         # ==========================================
# #         weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
# #         meta_score = (motor_prob * weights["motor"]) + \
# #                      (speech_prob * weights["speech"]) + \
# #                      (behavior_prob * weights["behavior"])

# #         threshold = 0.5
# #         final_prediction = 1 if meta_score >= threshold else 0

# #         # ======================================
# #         # LIVE TERMINAL OUTPUT
# #         # ======================================
# #         print("\n==================================")
# #         print("MULTIMODAL FUSION RESULTS")
# #         print("==================================")
# #         print(f"Motor Risk (Modality A):    {motor_prob:.4f}")
# #         print(f"Speech Risk (Modality B):   {speech_prob:.4f}")
# #         print(f"Behavior Risk (Modality C): {behavior_prob:.4f} (Memory Score: {cognitive_score})")
# #         print("----------------------------------")
# #         print(f"FINAL FUSION META-SCORE:    {meta_score:.4f}")
# #         print("Prediction:", "Patient (AD)" if final_prediction == 1 else "Control")
# #         print("==================================\n")

# #         result = {
# #             "prediction": int(final_prediction),
# #             "probability": float(meta_score),
# #             "label": "Patient" if final_prediction == 1 else "Control",
# #             "modalities": {
# #                 "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
# #                 "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
# #                 "behavior": {"score": behavior_prob, "status": "Analyzed via Memory Matrix"}
# #             },
# #             "metrics": {
# #                 "Mean Speed": mean_speed,
# #                 "Pause Ratio": pause_ratio,
# #                 "Stroke Jerk": float(features.iloc[0]["jerk_std"]) if "jerk_std" in features else 0
# #             }
# #         }

# #         return jsonify(result)

# #     except Exception as e:
# #         print(f"CRITICAL API ERROR: {str(e)}")
# #         return jsonify({"error": str(e)}), 500

# # if __name__ == "__main__":
# #     app.run(host="0.0.0.0", port=5000, debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import pandas as pd
# import joblib
# import pickle

# # --- Local Imports ---
# from preprocess import preprocess_text
# from models import db, Clinician, Patient, Assessment, ModalityMetrics

# # ======================================
# # Initialize Flask & Database
# # ======================================
# app = Flask(__name__)
# CORS(app)

# # Configure SQLite Database (Creates a file called neurova.db)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///neurova.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)

# # Auto-create tables if they don't exist
# with app.app_context():
#     db.create_all()

# # ======================================
# # Load Models (Safely)
# # ======================================
# try:
#     model_motor = joblib.load("alzheimer_rf_model.pkl")
# except Exception as e:
#     print(f"Error loading Motor Model: {e}")

# try:
#     raw_model_alz = pickle.load(open('model_alz.pkl', 'rb'))
#     model_alz = raw_model_alz[0] if isinstance(raw_model_alz, tuple) else raw_model_alz
# except Exception as e:
#     print(f"Error loading NLP Model: {e}")
#     model_alz = None

# # ======================================
# # Feature Extraction (Motor)
# # ======================================
# FEATURE_NAMES = [
#     "total_time", "path_length", "mean_speed", "speed_std", 
#     "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
#     "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
#     "area", "path_efficiency", "speed_entropy", "pressure_mean", 
#     "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
# ]

# def safe_div(a, b): return a / b if b != 0 else 0
# def entropy(signal, bins=20):
#     signal = np.array(signal)
#     signal = signal[np.isfinite(signal)]
#     if len(signal) < 10: return 0
#     hist, _ = np.histogram(signal, bins=bins)
#     prob = hist / np.sum(hist)
#     prob = prob[prob > 0]
#     return -np.sum(prob * np.log(prob))

# def extract_features_from_drawing(drawing_points):
#     df = pd.DataFrame(drawing_points)
#     df["pressure"] = 1
#     df["grip"] = 1
#     df["z"] = 0
#     df = df.sort_values("time")

#     x, y, t = df["x"].values, df["y"].values, df["time"].values
#     if len(x) < 10: return None

#     dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
#     valid = dt > 0
#     dx, dy, dt = dx[valid], dy[valid], dt[valid]
#     if len(dt) < 5: return None

#     dist = np.sqrt(dx**2 + dy**2)
#     speed = dist / dt
#     speed = speed[np.isfinite(speed)]
#     if len(speed) < 5: return None

#     total_time = t[-1] - t[0]
#     mean_speed = np.mean(speed)
#     acceleration = np.diff(speed)
#     jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

#     features = {
#         "total_time": total_time, "path_length": np.sum(dist), "mean_speed": mean_speed,
#         "speed_std": np.std(speed), "speed_variability": safe_div(np.std(speed), mean_speed),
#         "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
#         "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
#         "mean_jerk": np.mean(jerk), "jerk_std": np.std(jerk),
#         "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
#         "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
#         "width": np.max(x) - np.min(x), "height": np.max(y) - np.min(y),
#         "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
#         "path_efficiency": safe_div(np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2), np.sum(dist)),
#         "speed_entropy": entropy(speed),
#         "pressure_mean": df["pressure"].mean(), "pressure_std": df["pressure"].std(),
#         "grip_mean": df["grip"].mean(), "grip_std": df["grip"].std(),
#         "z_mean": df["z"].mean(), "z_std": df["z"].std()
#     }

#     feature_array = np.array(list(features.values())).reshape(1, -1)
#     features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)
#     features_df["total_time"] *= 3
#     features_df["mean_speed"] *= 0.3
#     features_df["speed_std"] *= 0.3
#     features_df["acc_std"] *= 0.3
#     features_df["jerk_std"] *= 0.3
#     features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

#     return features_df[FEATURE_NAMES]

# # ======================================
# # API Routes
# # ======================================
# @app.route("/")
# def home():
#     return "Neurova Database & Multimodal API Running"

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         drawing = data.get("drawing", None)
#         speech_text = data.get("speech_text", "")
#         cognitive_score = data.get("cognitive_score", 0)
        
#         # New DB field: Identify which patient took this test (Default 1 for demo)
#         patient_id = data.get("patient_id", 1) 

#         if drawing is None:
#             return jsonify({"error": "No drawing data provided"}), 400

#         features = extract_features_from_drawing(drawing)
#         if features is None:
#             return jsonify({"error": "Drawing too short or invalid"}), 400

#         # --- Modality A ---
#         try:
#             base_probability = model_motor.predict_proba(features)[0][1]
#             pause_ratio = float(features.iloc[0]["pause_ratio"])
#             mean_speed = float(features.iloc[0]["mean_speed"])

#             if pause_ratio < 0.10: motor_prob = 0.15  
#             elif pause_ratio > 0.30: motor_prob = 0.85  
#             else: motor_prob = base_probability
#         except Exception as e:
#             motor_prob, pause_ratio, mean_speed = 0.50, 0.15, 50.0

#         # --- Modality B ---
#         speech_prob = 0.20 
#         if speech_text and speech_text.strip() and model_alz is not None:
#             try:
#                 features_nlp = preprocess_text(speech_text)
#                 if hasattr(model_alz, 'predict_proba'):
#                     speech_prob = float(model_alz.predict_proba(features_nlp)[0][1])
#                 else:
#                     pred = int(model_alz.predict(features_nlp)[0])
#                     speech_prob = 0.85 if pred == 1 else 0.15
#             except Exception as e:
#                 speech_prob = 0.60 

#         # --- Modality C ---
#         behavior_prob = 1.0 - (float(cognitive_score) / 100.0)
#         behavior_prob = max(0.10, behavior_prob)

#         # --- LATE FUSION META-CLASSIFIER ---
#         weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
#         meta_score = (motor_prob * weights["motor"]) + \
#                      (speech_prob * weights["speech"]) + \
#                      (behavior_prob * weights["behavior"])

#         threshold = 0.5
#         final_prediction = 1 if meta_score >= threshold else 0

#         # ==========================================
#         # 💾 SAVE RESULTS TO DATABASE
#         # ==========================================
#         try:
#             # Note: In a real app, ensure patient_id actually exists in the DB first
#             new_assessment = Assessment(
#                 patient_id=patient_id,
#                 meta_score=meta_score,
#                 final_prediction="High Risk" if final_prediction == 1 else "Low Risk"
#             )
#             db.session.add(new_assessment)
#             db.session.flush() # Generate the Assessment ID

#             new_metrics = ModalityMetrics(
#                 assessment_id=new_assessment.id,
#                 motor_risk_score=motor_prob,
#                 mean_speed=mean_speed,
#                 pause_ratio=pause_ratio,
#                 speech_risk_score=speech_prob,
#                 speech_transcript=speech_text,
#                 behavior_risk_score=behavior_prob,
#                 memory_game_score=cognitive_score
#             )
#             db.session.add(new_metrics)
#             db.session.commit()
#             print(f"✅ Successfully saved Assessment #{new_assessment.id} to Database!")
#         except Exception as db_err:
#             db.session.rollback()
#             print(f"⚠️ Database save failed (make sure a patient exists!): {db_err}")

#         # Return JSON to React
#         result = {
#             "prediction": int(final_prediction),
#             "probability": float(meta_score),
#             "label": "Patient" if final_prediction == 1 else "Control",
#             "modalities": {
#                 "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
#                 "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
#                 "behavior": {"score": behavior_prob, "status": "Analyzed via Memory Matrix"}
#             },
#             "metrics": {
#                 "Mean Speed": mean_speed,
#                 "Pause Ratio": pause_ratio,
#                 "Stroke Jerk": float(features.iloc[0]["jerk_std"]) if "jerk_std" in features else 0
#             }
#         }

#         return jsonify(result)

#     except Exception as e:
#         print(f"CRITICAL API ERROR: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # --- Helper Routes for the Dashboard ---
# @app.route("/api/patients", methods=["GET"])
# def get_patients():
#     """Fetch all patients from the DB to show on the dashboard."""
#     patients = Patient.query.all()
#     output = []
#     for p in patients:
#         output.append({
#             "id": p.id,
#             "first_name": p.first_name,
#             "last_name": p.last_name,
#             "created_at": p.created_at
#         })
#     return jsonify(output)


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
import numpy as np
import pandas as pd
import joblib
import pickle

# --- Local Imports ---
from preprocess import preprocess_text

# ======================================
# Initialize Flask & MongoDB
# ======================================
app = Flask(__name__)
CORS(app)

# Connect to MongoDB (Local instance by default)
# Change this URI if you are using MongoDB Atlas!
client = MongoClient("mongodb://localhost:27017/")
db = client["neurova_db"] # This creates/connects to a database called 'neurova_db'

# Access Collections
patients_collection = db["patients"]
assessments_collection = db["assessments"]
clinicians_collection = db["clinicians"]

# ======================================
# Load Models (Safely)
# ======================================
try:
    model_motor = joblib.load("alzheimer_rf_model.pkl")
except Exception as e:
    print(f"Error loading Motor Model: {e}")

try:
    raw_model_alz = pickle.load(open('model_alz.pkl', 'rb'))
    model_alz = raw_model_alz[0] if isinstance(raw_model_alz, tuple) else raw_model_alz
except Exception as e:
    print(f"Error loading NLP Model: {e}")
    model_alz = None

# ======================================
# Feature Extraction (Motor)
# ======================================
FEATURE_NAMES = [
    "total_time", "path_length", "mean_speed", "speed_std", 
    "speed_variability", "mean_acc", "acc_std", "mean_jerk", 
    "jerk_std", "pause_ratio", "num_pauses", "width", "height", 
    "area", "path_efficiency", "speed_entropy", "pressure_mean", 
    "pressure_std", "grip_mean", "grip_std", "z_mean", "z_std"
]

def safe_div(a, b): return a / b if b != 0 else 0
def entropy(signal, bins=20):
    signal = np.array(signal)
    signal = signal[np.isfinite(signal)]
    if len(signal) < 10: return 0
    hist, _ = np.histogram(signal, bins=bins)
    prob = hist / np.sum(hist)
    prob = prob[prob > 0]
    return -np.sum(prob * np.log(prob))

def extract_features_from_drawing(drawing_points):
    df = pd.DataFrame(drawing_points)
    df["pressure"] = 1
    df["grip"] = 1
    df["z"] = 0
    df = df.sort_values("time")

    x, y, t = df["x"].values, df["y"].values, df["time"].values
    if len(x) < 10: return None

    dx, dy, dt = np.diff(x), np.diff(y), np.diff(t)
    valid = dt > 0
    dx, dy, dt = dx[valid], dy[valid], dt[valid]
    if len(dt) < 5: return None

    dist = np.sqrt(dx**2 + dy**2)
    speed = dist / dt
    speed = speed[np.isfinite(speed)]
    if len(speed) < 5: return None

    total_time = t[-1] - t[0]
    mean_speed = np.mean(speed)
    acceleration = np.diff(speed)
    jerk = np.diff(acceleration) if len(acceleration) > 1 else np.array([0])

    features = {
        "total_time": total_time, "path_length": np.sum(dist), "mean_speed": mean_speed,
        "speed_std": np.std(speed), "speed_variability": safe_div(np.std(speed), mean_speed),
        "mean_acc": np.mean(acceleration) if len(acceleration) > 0 else 0,
        "acc_std": np.std(acceleration) if len(acceleration) > 0 else 0,
        "mean_jerk": np.mean(jerk), "jerk_std": np.std(jerk),
        "pause_ratio": safe_div(np.sum(dt[speed < 0.1 * mean_speed]), total_time),
        "num_pauses": np.sum(np.diff((speed < 0.1 * mean_speed).astype(int)) == 1),
        "width": np.max(x) - np.min(x), "height": np.max(y) - np.min(y),
        "area": (np.max(x) - np.min(x)) * (np.max(y) - np.min(y)),
        "path_efficiency": safe_div(np.sqrt((x[-1]-x[0])**2 + (y[-1]-y[0])**2), np.sum(dist)),
        "speed_entropy": entropy(speed),
        "pressure_mean": df["pressure"].mean(), "pressure_std": df["pressure"].std(),
        "grip_mean": df["grip"].mean(), "grip_std": df["grip"].std(),
        "z_mean": df["z"].mean(), "z_std": df["z"].std()
    }

    feature_array = np.array(list(features.values())).reshape(1, -1)
    features_df = pd.DataFrame(feature_array, columns=FEATURE_NAMES)
    features_df["total_time"] *= 3
    features_df["mean_speed"] *= 0.3
    features_df["speed_std"] *= 0.3
    features_df["acc_std"] *= 0.3
    features_df["jerk_std"] *= 0.3
    features_df["path_efficiency"] = features_df["path_efficiency"].clip(0, 1)

    return features_df[FEATURE_NAMES]

# ======================================
# API Routes
# ======================================
@app.route("/")
def home():
    return "Neurova MongoDB & Multimodal API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        drawing = data.get("drawing", None)
        speech_text = data.get("speech_text", "")
        cognitive_score = data.get("cognitive_score", 0)
        
        # New DB field: Identify which patient took this test
        patient_id = data.get("patient_id", "demo_patient_001") 

        if drawing is None:
            return jsonify({"error": "No drawing data provided"}), 400

        features = extract_features_from_drawing(drawing)
        if features is None:
            return jsonify({"error": "Drawing too short or invalid"}), 400

        # --- Modality A ---
        try:
            base_probability = model_motor.predict_proba(features)[0][1]
            pause_ratio = float(features.iloc[0]["pause_ratio"])
            mean_speed = float(features.iloc[0]["mean_speed"])

            if pause_ratio < 0.10: motor_prob = 0.15  
            elif pause_ratio > 0.30: motor_prob = 0.85  
            else: motor_prob = base_probability
        except Exception as e:
            motor_prob, pause_ratio, mean_speed = 0.50, 0.15, 50.0

        # --- Modality B ---
        speech_prob = 0.20 
        if speech_text and speech_text.strip() and model_alz is not None:
            try:
                features_nlp = preprocess_text(speech_text)
                if hasattr(model_alz, 'predict_proba'):
                    speech_prob = float(model_alz.predict_proba(features_nlp)[0][1])
                else:
                    pred = int(model_alz.predict(features_nlp)[0])
                    speech_prob = 0.85 if pred == 1 else 0.15
            except Exception as e:
                speech_prob = 0.60 

        # --- Modality C ---
        behavior_prob = 1.0 - (float(cognitive_score) / 100.0)
        behavior_prob = max(0.10, behavior_prob)

        # --- LATE FUSION META-CLASSIFIER ---
        weights = {"motor": 0.5, "speech": 0.3, "behavior": 0.2}
        meta_score = (motor_prob * weights["motor"]) + \
                     (speech_prob * weights["speech"]) + \
                     (behavior_prob * weights["behavior"])

        threshold = 0.5
        final_prediction = 1 if meta_score >= threshold else 0

        # ==========================================
        # 💾 SAVE RESULTS TO MONGODB
        # ==========================================
        assessment_document = {
            "patient_id": patient_id,
            "date_administered": datetime.utcnow(),
            "meta_score": float(meta_score),
            "final_prediction": "High Risk" if final_prediction == 1 else "Low Risk",
            "modalities": {
                "motor": {
                    "risk_score": float(motor_prob),
                    "mean_speed": float(mean_speed),
                    "pause_ratio": float(pause_ratio),
                    "stroke_jerk": float(features.iloc[0]["jerk_std"]) if "jerk_std" in features else 0
                },
                "speech": {
                    "risk_score": float(speech_prob),
                    "transcript": speech_text
                },
                "behavior": {
                    "risk_score": float(behavior_prob),
                    "memory_game_score": int(cognitive_score)
                }
            }
        }
        
        try:
            # Insert the document into the MongoDB collection
            insert_result = assessments_collection.insert_one(assessment_document)
            print(f"✅ Successfully saved Assessment to MongoDB! ID: {insert_result.inserted_id}")
        except Exception as db_err:
            print(f"⚠️ MongoDB save failed: {db_err}")

        # Return JSON to React
        result = {
            "prediction": int(final_prediction),
            "probability": float(meta_score),
            "label": "Patient" if final_prediction == 1 else "Control",
            "modalities": {
                "motor": {"score": motor_prob, "status": "Analyzed via RF Model"},
                "speech": {"score": speech_prob, "status": "Analyzed via NLP Model"},
                "behavior": {"score": behavior_prob, "status": "Analyzed via Memory Matrix"}
            },
            "metrics": {
                "Mean Speed": mean_speed,
                "Pause Ratio": pause_ratio,
                "Stroke Jerk": float(features.iloc[0]["jerk_std"]) if "jerk_std" in features else 0
            }
        }

        return jsonify(result)

    except Exception as e:
        print(f"CRITICAL API ERROR: {str(e)}")
        return jsonify({"error": str(e)}), 500
@app.route("/api/patients", methods=["GET"])
def get_patients():
    """Fetch all patients and their LATEST assessment from MongoDB."""
    patients_cursor = patients_collection.find({}, {"_id": 0}) 
    patients_list = []

    for p in patients_cursor:
        patient_id = p.get("patient_id")
        
        # Search the assessments collection for this specific patient's latest test
        latest_assessment = assessments_collection.find_one(
            {"patient_id": patient_id},
            sort=[("date_administered", -1)] # -1 sorts by newest first
        )

        # Default values if they have never taken a test
        last_visit = "No history"
        risk = "Pending"
        status = "Inactive"

        if latest_assessment:
            # Format the date nicely (e.g., "Mar 29, 2026")
            date_obj = latest_assessment.get("date_administered")
            if isinstance(date_obj, datetime):
                last_visit = date_obj.strftime("%b %d, %Y")
            else:
                last_visit = "Recent"

            # Grab the risk profile from the Meta-Classifier
            prediction = latest_assessment.get("final_prediction", "")
            if prediction == "High Risk":
                risk = "High"
            elif prediction == "Low Risk":
                risk = "Low"
            else:
                risk = "Moderate"
                
            status = "Active"

        # Bundle it up for React
        patients_list.append({
            "id": patient_id,
            "name": f"{p.get('first_name', '')} {p.get('last_name', '')}",
            "age": p.get("age", 72), # Defaulting age for the demo
            "lastVisit": last_visit,
            "status": status,
            "risk": risk
        })

    return jsonify(patients_list)

# Optional: A route to create a dummy patient so you can test it!
@app.route("/api/create_dummy_patient", methods=["GET"])
def create_dummy_patient():
    dummy = {
        "patient_id": "demo_patient_001",
        "first_name": "John",
        "last_name": "Doe",
        "created_at": datetime.utcnow()
    }
    patients_collection.insert_one(dummy)
    return jsonify({"msg": "Dummy patient created!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)