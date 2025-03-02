import React, { useState } from 'react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import { FormData, PredictionResult as PredictionResultType } from './types';
import { predict } from './services/modelService';
import { HeartPulse, Info } from 'lucide-react';

function App() {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const prediction = await predict(data);
      setResult(prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <HeartPulse className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">About This Tool</h2>
            </div>
            <p className="text-gray-700 mb-4">
              This Heart Disease Prediction System uses machine learning to estimate your risk of heart disease based on various health factors. 
              The prediction is based on a logistic regression model trained on heart disease data.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
              <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
              <p className="text-sm text-blue-700">
                <strong>Disclaimer:</strong> This tool is for educational purposes only and should not be used as a substitute for professional medical advice, 
                diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Enter Your Health Information</h2>
              <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </section>
            
            {result && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Prediction Results</h2>
                <PredictionResult result={result} />
              </section>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Heart Disease Prediction System</p>
          <p className="text-gray-400 text-sm mt-2">
            This is a demonstration project and should not be used for actual medical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;