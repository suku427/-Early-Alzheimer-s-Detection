# 🧠 CogniCare: Early Alzheimer's Detection System

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-18.3-blue)
![Python](https://img.shields.io/badge/Python-Flask-yellow)
![Machine Learning](https://img.shields.io/badge/ML-Random_Forest-orange)

## 📌 Overview
CogniCare is an innovative full-stack application designed to aid in the early detection of Alzheimer's Disease and cognitive decline through the analysis of fine motor skills. 

By capturing digital handwriting and drawing data (such as spiral tracing), the system extracts complex kinematic features—like speed variability, stroke jerkiness, and pause ratios. A pre-trained Random Forest machine learning model then evaluates these features to provide a cognitive risk prediction (Patient vs. Control). Developed as a major academic project, CogniCare bridges the gap between sophisticated data science and an accessible healthcare UI.

## ✨ Key Features
* **Interactive Assessment Canvas:** Captures high-frequency drawing data including X/Y coordinates, timestamps, and stylus pressure.
* **Real-Time Feature Extraction:** Processes raw drawing points to calculate 22 distinct motor features (e.g., mean speed, acceleration, jerk, speed entropy, and path efficiency).
* **Machine Learning Prediction:** Utilizes a serialized Random Forest model (`alzheimer_rf_model.pkl`) with a smart calibration mechanism to accurately assess cognitive risk.
* **Clinical Dashboard:** Modern, responsive UI displaying the cognitive risk score alongside a breakdown of extracted motor metrics using interactive charts.

## 🛠️ Architecture & Tech Stack

### Frontend (Client Interface)
* **Framework:** React 18 with Vite
* **Styling:** Tailwind CSS & Emotion
* **UI Components:** Radix UI (accessible primitives) & Framer Motion (animations)
* **Data Visualization:** Recharts
* **Icons:** Lucide React & Material Icons

### Backend (API & Machine Learning Layer)
* **Framework:** Python Flask (with Flask-CORS)
* **Data Processing:** Pandas & NumPy 
* **Model:** Scikit-Learn (Random Forest)
* **Serialization:** Joblib

### Data Pipeline
1. **Capture:** The user draws on the frontend canvas. Coordinates, time, and pressure are logged as a JSON array.
2. **Transmit:** Data is sent via HTTP POST to the Flask backend's `/predict` endpoint.
3. **Process:** Python converts the JSON to a DataFrame, normalizes the data, and computes dynamic/static motor features.
4. **Predict:** Features are fed into the pre-trained `.pkl` model.
5. **Return:** A JSON response containing the predicted label ("Control" or "Patient"), probability, and key metrics is sent back to the dashboard.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* Python (3.8+)
* npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/suku427/-Early-Alzheimer-s-Detection.git](https://github.com/suku427/-Early-Alzheimer-s-Detection.git)
   cd -Early-Alzheimer-s-Detection
🚀 Project Setup Guide
📦 Install Frontend Dependencies
npm install
🐍 Install Backend Dependencies

Navigate to the backend directory and install the required Python packages:

cd backend
pip install Flask flask-cors numpy pandas joblib scikit-learn
cd ..
▶️ Run the Application (Concurrently)

The project is configured to run both the Vite frontend and the Flask backend simultaneously using a single command:

npm run dev
🌐 Application URLs

Frontend: http://localhost:5173

Backend API: http://localhost:5000

🧠 Machine Learning Features Extracted

The backend extracts and analyzes the following key features from the raw coordinate data:

📊 Kinematic Features

mean_speed

speed_std

speed_variability

mean_acc

mean_jerk

⏱ Temporal Features

total_time

pause_ratio

num_pauses

📍 Spatial Features

path_length

width

height

path_efficiency

🔍 Complexity Features

speed_entropy

👤 Author

Sukumar Bodapatla
