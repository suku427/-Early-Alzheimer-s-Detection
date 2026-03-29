from pymongo import MongoClient
from datetime import datetime, timedelta

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["neurova_db"]

patients_collection = db["patients"]
assessments_collection = db["assessments"]

# Clear existing demo data so we don't get duplicates if you run it twice
patients_collection.delete_many({})
assessments_collection.delete_many({})

print("Seeding database with dummy data...")

# ==========================================
# 1. CREATE PATIENTS
# ==========================================
patients_data = [
    {
        "patient_id": "PT-1001",
        "first_name": "John",
        "last_name": "Doe",
        "age": 72,
        "gender": "Male",
        "created_at": datetime.utcnow() - timedelta(days=100)
    },
    {
        "patient_id": "PT-1002",
        "first_name": "Sarah",
        "last_name": "Smith",
        "age": 68,
        "gender": "Female",
        "created_at": datetime.utcnow() - timedelta(days=45)
    },
    {
        "patient_id": "PT-1003",
        "first_name": "Robert",
        "last_name": "Johnson",
        "age": 81,
        "gender": "Male",
        "created_at": datetime.utcnow() - timedelta(days=200)
    },
    {
        "patient_id": "PT-1004",
        "first_name": "Emily",
        "last_name": "Davis",
        "age": 75,
        "gender": "Female",
        "created_at": datetime.utcnow() - timedelta(days=10)
    },
    {
        "patient_id": "PT-1005",
        "first_name": "Michael",
        "last_name": "Wilson",
        "age": 69,
        "gender": "Male",
        "created_at": datetime.utcnow() - timedelta(days=300)
    }
]

patients_collection.insert_many(patients_data)

# ==========================================
# 2. CREATE ASSESSMENTS (Linked to Patients)
# ==========================================
assessments_data = [
    # John Doe - High Risk (Tested 2 days ago)
    {
        "patient_id": "PT-1001",
        "date_administered": datetime.utcnow() - timedelta(days=2),
        "meta_score": 0.82,
        "final_prediction": "High Risk",
        "modalities": {
            "motor": {"risk_score": 0.75, "mean_speed": 18.5, "pause_ratio": 0.45, "stroke_jerk": 1.2},
            "speech": {"risk_score": 0.85, "transcript": "The boy is... falling from the... stool."},
            "behavior": {"risk_score": 0.90, "memory_game_score": 33}
        }
    },
    # Sarah Smith - Low Risk (Tested today)
    {
        "patient_id": "PT-1002",
        "date_administered": datetime.utcnow(),
        "meta_score": 0.15,
        "final_prediction": "Low Risk",
        "modalities": {
            "motor": {"risk_score": 0.10, "mean_speed": 45.2, "pause_ratio": 0.05, "stroke_jerk": 0.3},
            "speech": {"risk_score": 0.15, "transcript": "A boy is stealing a cookie while his mother washes dishes."},
            "behavior": {"risk_score": 0.10, "memory_game_score": 100}
        }
    },
    # Robert Johnson - High Risk (Tested 15 days ago)
    {
        "patient_id": "PT-1003",
        "date_administered": datetime.utcnow() - timedelta(days=15),
        "meta_score": 0.91,
        "final_prediction": "High Risk",
        "modalities": {
            "motor": {"risk_score": 0.88, "mean_speed": 12.1, "pause_ratio": 0.65, "stroke_jerk": 1.8},
            "speech": {"risk_score": 0.92, "transcript": "There is a woman... water... dropping."},
            "behavior": {"risk_score": 1.00, "memory_game_score": 0}
        }
    },
    # Emily Davis - Moderate Risk (Tested 5 days ago)
    {
        "patient_id": "PT-1004",
        "date_administered": datetime.utcnow() - timedelta(days=5),
        "meta_score": 0.48,
        "final_prediction": "Moderate Risk",
        "modalities": {
            "motor": {"risk_score": 0.40, "mean_speed": 28.4, "pause_ratio": 0.22, "stroke_jerk": 0.7},
            "speech": {"risk_score": 0.55, "transcript": "A kid is getting cookies and the sink is overflowing."},
            "behavior": {"risk_score": 0.40, "memory_game_score": 66}
        }
    },
    # Michael Wilson - Low Risk (Tested 1 month ago)
    {
        "patient_id": "PT-1005",
        "date_administered": datetime.utcnow() - timedelta(days=30),
        "meta_score": 0.22,
        "final_prediction": "Low Risk",
        "modalities": {
            "motor": {"risk_score": 0.20, "mean_speed": 38.9, "pause_ratio": 0.11, "stroke_jerk": 0.4},
            "speech": {"risk_score": 0.25, "transcript": "The mother is washing dishes while ignoring the overflowing sink."},
            "behavior": {"risk_score": 0.10, "memory_game_score": 100}
        }
    }
]

assessments_collection.insert_many(assessments_data)

print("✅ Database successfully seeded with 5 Patients and 5 Assessments!")