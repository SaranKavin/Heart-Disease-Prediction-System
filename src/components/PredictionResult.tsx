import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { PredictionResult as PredictionResultType } from '../types';

interface PredictionResultProps {
  result: PredictionResultType | null;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ result }) => {
  if (!result) return null;

  const getRecommendations = (risk: string) => {
    if (risk === 'High Risk') {
      return [
        'Consult with a cardiologist as soon as possible',
        'Monitor your blood pressure regularly',
        'Follow a heart-healthy diet low in saturated fats and sodium',
        'Engage in regular physical activity as recommended by your doctor',
        'Take medications as prescribed by your healthcare provider'
      ];
    } else if (risk === 'Moderate Risk') {
      return [
        'Schedule a check-up with your doctor',
        'Maintain a balanced diet rich in fruits, vegetables, and whole grains',
        'Exercise regularly (aim for at least 150 minutes per week)',
        'Limit alcohol consumption and avoid smoking',
        'Manage stress through relaxation techniques'
      ];
    } else {
      return [
        'Continue with regular health check-ups',
        'Maintain a healthy lifestyle with balanced nutrition',
        'Stay physically active',
        'Avoid smoking and excessive alcohol consumption',
        'Manage stress effectively'
      ];
    }
  };

  const recommendations = getRecommendations(result.risk);
  
  const getBgColor = () => {
    switch (result.risk) {
      case 'High Risk':
        return 'bg-red-50 border-red-200';
      case 'Moderate Risk':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getIcon = () => {
    switch (result.risk) {
      case 'High Risk':
        return <AlertTriangle className="w-12 h-12 text-red-500" />;
      case 'Moderate Risk':
        return <Info className="w-12 h-12 text-yellow-500" />;
      default:
        return <CheckCircle className="w-12 h-12 text-green-500" />;
    }
  };

  const getTextColor = () => {
    switch (result.risk) {
      case 'High Risk':
        return 'text-red-700';
      case 'Moderate Risk':
        return 'text-yellow-700';
      default:
        return 'text-green-700';
    }
  };

  return (
    <div className={`mt-8 p-6 rounded-lg border-2 ${getBgColor()} shadow-md`}>
      <div className="flex items-center mb-4">
        {getIcon()}
        <h2 className={`text-2xl font-bold ml-4 ${getTextColor()}`}>
          {result.risk}
        </h2>
      </div>
      
      <p className="mb-4 text-gray-700">
        Based on the information provided, our model predicts a {Math.round(result.confidence * 100)}% chance of heart disease.
      </p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-gray-700">{rec}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Disclaimer:</strong> This prediction is based on a machine learning model and should not replace professional medical advice. 
          Please consult with a healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;