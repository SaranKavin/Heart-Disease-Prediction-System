# Heart Disease Prediction System (Python Version)

A web-based application that uses machine learning to predict the likelihood of heart disease based on user-provided health information.

## Features

- Interactive web form for entering health data
- Real-time prediction using a machine learning model
- Risk assessment with personalized recommendations
- Responsive design for all devices

## Technology Stack

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript, TailwindCSS
- **Machine Learning**: NumPy for calculations

## How It Works

1. The user enters their health information through the web form
2. The data is sent to the Flask backend
3. The data is preprocessed and normalized
4. A logistic regression model makes a prediction
5. Results are displayed with risk level and recommendations

## Model Information

The prediction model is a logistic regression classifier that considers the following factors:

- Age
- Gender
- Chest pain type
- Resting blood pressure
- Serum cholesterol
- Fasting blood sugar
- Resting ECG results
- Maximum heart rate
- Exercise-induced angina
- ST depression induced by exercise
- Slope of the peak exercise ST segment
- Number of major vessels colored by fluoroscopy
- Thalassemia

## Development

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Start the development server:
   ```
   python app.py
   ```
4. Open your browser and navigate to `http://127.0.0.1:5000`

## Deployment

This application can be deployed to platforms like Heroku, Render, or PythonAnywhere.

### Deployment Steps

1. Create an account on your preferred hosting platform
2. Connect your repository
3. Set up the environment variables if needed
4. Deploy the application

## Disclaimer

This application is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## License

MIT