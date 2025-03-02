# Heart Disease Prediction

## 📌 Project Overview
This project is a **Heart Disease Prediction System** using **Machine Learning and Flask**. It takes user health data as input and predicts the likelihood of heart disease, categorizing the risk into **Low Risk, Moderate Risk, or High Risk** based on probability scores.

## 🚀 Features
- Machine Learning Model trained on a heart disease dataset.
- Flask API for predictions.
- User-friendly input form for health details.
- Risk classification into **Low, Moderate, or High** based on probability.

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **Machine Learning**: Scikit-learn, Pandas, NumPy

## 📥 Setup & Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/heart-disease-predictor.git
cd heart-disease-predictor
```

### 2️⃣ Create and Activate a Virtual Environment
```bash
python -m venv venv
# Activate on Windows
venv\Scripts\activate
# Activate on macOS/Linux
source venv/bin/activate
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Train the Machine Learning Model
Run the following script to train the model and save it:
```bash
python train_model.py
```
This will generate `model.pkl` and `scaler.pkl`.

### 5️⃣ Start the Flask Server
```bash
python app.py
```

### 6️⃣ Open in Browser
Visit `http://127.0.0.1:5000/` to access the app.

Here is the table format for input values corresponding to **Low Risk, Moderate Risk, and High Risk** predictions:  

| **Parameter**                     | **Low Risk**                       | **Moderate Risk**                   | **High Risk**                        |
|------------------------------------|------------------------------------|------------------------------------|------------------------------------|
| **Age**                            | 25                                 | 50                                 | 65                                 |
| **Gender**                         | Male                               | Male                               | Male                               |
| **Chest Pain Type**                | Asymptomatic                       | Atypical Angina                    | Typical Angina                     |
| **Resting Blood Pressure (mm Hg)** | 120                                | 140                                | 160                                |
| **Serum Cholesterol (mg/dl)**      | 150                                | 220                                | 280                                |
| **Fasting Blood Sugar > 120 mg/dl**| No                                 | No                                 | Yes                                |
| **Resting ECG Results**            | Normal                             | ST-T Wave Abnormality              | Left Ventricular Hypertrophy       |
| **Maximum Heart Rate**             | 150                                | 130                                | 110                                |
| **Exercise Induced Angina**        | No                                 | No                                 | Yes                                |
| **ST Depression Induced by Exercise** | 0                              | 1.5                                | 3.2                                |
| **Slope of Peak Exercise ST Segment** | Flat                           | Upsloping                          | Downsloping                        |
| **Number of Major Vessels**        | 0                                  | 1                                  | 3                                  |
| **Thalassemia**                    | Normal                             | Fixed Defect                       | Reversible Defect                  |
| **Predicted Risk**                 | Low Risk                           | Moderate Risk                      | High Risk                          |

This table clearly differentiates input values for different levels of heart disease risk prediction. 

## 💡 How the Risk is Determined
```python
risk = "Low Risk"
if probability > 0.7:
    risk = "High Risk"
elif probability > 0.3:
    risk = "Moderate Risk"
```

## ⚡ Future Enhancements
- Add more visualization for user reports.
- Improve model accuracy with more data.
- Deploy the model online.

![{9F83B820-63C6-4DFE-991A-6076311A21B1}](https://github.com/user-attachments/assets/91f290de-1759-49c4-b172-cdc3c7284cd8)

![{6869E2F7-27A7-4F9E-862D-4F61B9EE7390}](https://github.com/user-attachments/assets/5bc048b0-c4fe-4b2e-aabc-8a2c9ce1e99e)

![Uploading {F80304BD-782A-457C-BB90-9CAA83599A6D}.png…]()




---
🔥 **Developed by SARAN** 🚀

