import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-center">
        <Heart className="w-8 h-8 mr-3" />
        <h1 className="text-3xl font-bold">Heart Disease Prediction System</h1>
      </div>
      <p className="text-center mt-2 text-white/80 max-w-2xl mx-auto">
        Enter your health information below to assess your risk of heart disease
      </p>
    </header>
  );
};

export default Header;