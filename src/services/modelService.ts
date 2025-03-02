import * as tf from '@tensorflow/tfjs';
import { FormData, PredictionResult } from '../types';

// Feature scaling parameters (these would normally be calculated during training)
const SCALING_PARAMS = {
  age: { mean: 54.37, std: 9.08 },
  trestbps: { mean: 131.62, std: 17.54 },
  chol: { mean: 246.26, std: 51.83 },
  thalach: { mean: 149.65, std: 22.91 },
  oldpeak: { mean: 1.04, std: 1.16 }
};

// Simple logistic regression model coefficients
// These are example coefficients - in a real application, these would come from a trained model
const MODEL_COEFFICIENTS = {
  intercept: -0.5,
  age: 0.03,
  sex: 0.6,
  cp: -0.5,
  trestbps: 0.01,
  chol: 0.002,
  fbs: 0.2,
  restecg: 0.1,
  thalach: -0.02,
  exang: 0.7,
  oldpeak: 0.3,
  slope: -0.2,
  ca: 0.5,
  thal: 0.4
};

// Function to normalize a value using mean and standard deviation
const normalize = (value: number, mean: number, std: number): number => {
  return (value - mean) / std;
};

// Function to preprocess the input data
const preprocessData = (data: FormData): number[] => {
  // Normalize continuous features
  const normalizedAge = normalize(data.age, SCALING_PARAMS.age.mean, SCALING_PARAMS.age.std);
  const normalizedTrestbps = normalize(data.trestbps, SCALING_PARAMS.trestbps.mean, SCALING_PARAMS.trestbps.std);
  const normalizedChol = normalize(data.chol, SCALING_PARAMS.chol.mean, SCALING_PARAMS.chol.std);
  const normalizedThalach = normalize(data.thalach, SCALING_PARAMS.thalach.mean, SCALING_PARAMS.thalach.std);
  const normalizedOldpeak = normalize(data.oldpeak, SCALING_PARAMS.oldpeak.mean, SCALING_PARAMS.oldpeak.std);

  // Return preprocessed features
  return [
    normalizedAge,
    data.sex,
    data.cp,
    normalizedTrestbps,
    normalizedChol,
    data.fbs,
    data.restecg,
    normalizedThalach,
    data.exang,
    normalizedOldpeak,
    data.slope,
    data.ca,
    data.thal
  ];
};

// Sigmoid function for logistic regression
const sigmoid = (z: number): number => {
  return 1 / (1 + Math.exp(-z));
};

// Function to make a prediction using the logistic regression model
const predictWithLogisticRegression = (features: number[]): number => {
  let z = MODEL_COEFFICIENTS.intercept;
  
  z += features[0] * MODEL_COEFFICIENTS.age;
  z += features[1] * MODEL_COEFFICIENTS.sex;
  z += features[2] * MODEL_COEFFICIENTS.cp;
  z += features[3] * MODEL_COEFFICIENTS.trestbps;
  z += features[4] * MODEL_COEFFICIENTS.chol;
  z += features[5] * MODEL_COEFFICIENTS.fbs;
  z += features[6] * MODEL_COEFFICIENTS.restecg;
  z += features[7] * MODEL_COEFFICIENTS.thalach;
  z += features[8] * MODEL_COEFFICIENTS.exang;
  z += features[9] * MODEL_COEFFICIENTS.oldpeak;
  z += features[10] * MODEL_COEFFICIENTS.slope;
  z += features[11] * MODEL_COEFFICIENTS.ca;
  z += features[12] * MODEL_COEFFICIENTS.thal;
  
  return sigmoid(z);
};

// Main prediction function
export const predict = async (data: FormData): Promise<PredictionResult> => {
  // Simulate loading a model (in a real app, we would load a trained TensorFlow.js model)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Preprocess the input data
  const preprocessedData = preprocessData(data);
  
  // Make prediction
  const probability = predictWithLogisticRegression(preprocessedData);
  
  // Determine risk level based on probability
  let risk = 'Low Risk';
  if (probability > 0.7) {
    risk = 'High Risk';
  } else if (probability > 0.3) {
    risk = 'Moderate Risk';
  }
  
  return {
    prediction: probability > 0.5 ? 1 : 0,
    risk,
    confidence: probability
  };
};