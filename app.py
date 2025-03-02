import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# Feature scaling parameters
SCALING_PARAMS = {
    'age': {'mean': 54.37, 'std': 9.08},
    'trestbps': {'mean': 131.62, 'std': 17.54},
    'chol': {'mean': 246.26, 'std': 51.83},
    'thalach': {'mean': 149.65, 'std': 22.91},
    'oldpeak': {'mean': 1.04, 'std': 1.16}
}

# Simple logistic regression model coefficients
MODEL_COEFFICIENTS = {
    'intercept': -0.5,
    'age': 0.03,
    'sex': 0.6,
    'cp': -0.5,
    'trestbps': 0.01,
    'chol': 0.002,
    'fbs': 0.2,
    'restecg': 0.1,
    'thalach': -0.02,
    'exang': 0.7,
    'oldpeak': 0.3,
    'slope': -0.2,
    'ca': 0.5,
    'thal': 0.4
}

def normalize(value, mean, std):
    """Normalize a value using mean and standard deviation"""
    return (value - mean) / std

def preprocess_data(data):
    """Preprocess the input data"""
    # Normalize continuous features
    normalized_age = normalize(data['age'], SCALING_PARAMS['age']['mean'], SCALING_PARAMS['age']['std'])
    normalized_trestbps = normalize(data['trestbps'], SCALING_PARAMS['trestbps']['mean'], SCALING_PARAMS['trestbps']['std'])
    normalized_chol = normalize(data['chol'], SCALING_PARAMS['chol']['mean'], SCALING_PARAMS['chol']['std'])
    normalized_thalach = normalize(data['thalach'], SCALING_PARAMS['thalach']['mean'], SCALING_PARAMS['thalach']['std'])
    normalized_oldpeak = normalize(data['oldpeak'], SCALING_PARAMS['oldpeak']['mean'], SCALING_PARAMS['oldpeak']['std'])

    # Return preprocessed features
    return [
        normalized_age,
        data['sex'],
        data['cp'],
        normalized_trestbps,
        normalized_chol,
        data['fbs'],
        data['restecg'],
        normalized_thalach,
        data['exang'],
        normalized_oldpeak,
        data['slope'],
        data['ca'],
        data['thal']
    ]

def sigmoid(z):
    """Sigmoid function for logistic regression"""
    return 1 / (1 + np.exp(-z))

def predict_with_logistic_regression(features):
    """Make a prediction using the logistic regression model"""
    z = MODEL_COEFFICIENTS['intercept']
    
    z += features[0] * MODEL_COEFFICIENTS['age']
    z += features[1] * MODEL_COEFFICIENTS['sex']
    z += features[2] * MODEL_COEFFICIENTS['cp']
    z += features[3] * MODEL_COEFFICIENTS['trestbps']
    z += features[4] * MODEL_COEFFICIENTS['chol']
    z += features[5] * MODEL_COEFFICIENTS['fbs']
    z += features[6] * MODEL_COEFFICIENTS['restecg']
    z += features[7] * MODEL_COEFFICIENTS['thalach']
    z += features[8] * MODEL_COEFFICIENTS['exang']
    z += features[9] * MODEL_COEFFICIENTS['oldpeak']
    z += features[10] * MODEL_COEFFICIENTS['slope']
    z += features[11] * MODEL_COEFFICIENTS['ca']
    z += features[12] * MODEL_COEFFICIENTS['thal']
    
    return sigmoid(z)

def get_recommendations(risk):
    """Get recommendations based on risk level"""
    if risk == 'High Risk':
        return [
            'Consult with a cardiologist as soon as possible',
            'Monitor your blood pressure regularly',
            'Follow a heart-healthy diet low in saturated fats and sodium',
            'Engage in regular physical activity as recommended by your doctor',
            'Take medications as prescribed by your healthcare provider'
        ]
    elif risk == 'Moderate Risk':
        return [
            'Schedule a check-up with your doctor',
            'Maintain a balanced diet rich in fruits, vegetables, and whole grains',
            'Exercise regularly (aim for at least 150 minutes per week)',
            'Limit alcohol consumption and avoid smoking',
            'Manage stress through relaxation techniques'
        ]
    else:
        return [
            'Continue with regular health check-ups',
            'Maintain a healthy lifestyle with balanced nutrition',
            'Stay physically active',
            'Avoid smoking and excessive alcohol consumption',
            'Manage stress effectively'
        ]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint for making predictions"""
    try:
        # Get data from request
        data = request.get_json()
        
        # Convert string values to appropriate types
        processed_data = {
            'age': float(data['age']),
            'sex': float(data['sex']),
            'cp': float(data['cp']),
            'trestbps': float(data['trestbps']),
            'chol': float(data['chol']),
            'fbs': float(data['fbs']),
            'restecg': float(data['restecg']),
            'thalach': float(data['thalach']),
            'exang': float(data['exang']),
            'oldpeak': float(data['oldpeak']),
            'slope': float(data['slope']),
            'ca': float(data['ca']),
            'thal': float(data['thal'])
        }
        
        # Preprocess the data
        preprocessed_data = preprocess_data(processed_data)
        
        # Make prediction
        probability = predict_with_logistic_regression(preprocessed_data)
        
        
        # Determine risk level
        # risk = 'Low Risk'
        # if probability > 0.7:
        #     risk = 'High Risk'
        # elif probability > 0.3:
        #     risk = 'Moderate Risk'
        
        risk = "No Risk"
        if probability > 0.6:
           risk = "High Risk"
        elif probability > 0.3:
            risk = "Moderate Risk"
        elif probability > 0.1:
            risk = "Low Risk"


        # Get recommendations
        recommendations = get_recommendations(risk)
        
        # Return prediction result
        return jsonify({
            'prediction': 1 if probability > 0.5 else 0,
            'risk': risk,
            'confidence': float(probability),
            'recommendations': recommendations
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)