export interface FormData {
  age: number;
  sex: number; // 0 = female, 1 = male
  cp: number; // chest pain type (0-3)
  trestbps: number; // resting blood pressure
  chol: number; // serum cholesterol
  fbs: number; // fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
  restecg: number; // resting electrocardiographic results (0-2)
  thalach: number; // maximum heart rate achieved
  exang: number; // exercise induced angina (1 = yes; 0 = no)
  oldpeak: number; // ST depression induced by exercise relative to rest
  slope: number; // the slope of the peak exercise ST segment (0-2)
  ca: number; // number of major vessels (0-3) colored by fluoroscopy
  thal: number; // thalassemia (0 = normal; 1 = fixed defect; 2 = reversible defect)
}

export interface PredictionResult {
  prediction: number;
  risk: string;
  confidence: number;
}