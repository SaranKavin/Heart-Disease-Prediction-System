document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const predictBtn = document.getElementById('predictBtn');
    const resultSection = document.getElementById('resultSection');
    const predictionResult = document.getElementById('predictionResult');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        predictBtn.disabled = true;
        predictBtn.innerHTML = '<div class="spinner"></div> Processing...';
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        try {
            // Send data to backend
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            // Display result
            displayResult(result);
            
            // Show result section
            resultSection.classList.remove('hidden');
            
            // Scroll to result
            resultSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while making the prediction. Please try again.');
        } finally {
            // Reset button state
            predictBtn.disabled = false;
            predictBtn.innerHTML = 'Predict Risk';
        }
    });
    
    function displayResult(result) {
        // Determine risk level styling
        let riskClass, iconSvg;
        
        if (result.risk === 'High Risk') {
            riskClass = 'high-risk';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`;
            textColor = 'text-red-700';
        } else if (result.risk === 'Moderate Risk') {
            riskClass = 'moderate-risk';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>`;
            textColor = 'text-yellow-700';
        } else {
            riskClass = 'low-risk';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>`;
            textColor = 'text-green-700';
        }
        
        // Create recommendations list
        const recommendationsList = result.recommendations.map(rec => 
            `<li class="text-gray-700">${rec}</li>`
        ).join('');
        
        // Build result HTML
        const resultHTML = `
            <div class="mt-8 p-6 rounded-lg border-2 ${riskClass} shadow-md">
                <div class="flex items-center mb-4">
                    ${iconSvg}
                    <h2 class="text-2xl font-bold ml-4 ${textColor}">
                        ${result.risk}
                    </h2>
                </div>
                
                <p class="mb-4 text-gray-700">
                    Based on the information provided, our model predicts a ${Math.round(result.confidence * 100)}% chance of heart disease.
                </p>
                
                <div class="mt-6">
                    <h3 class="text-lg font-semibold mb-2">Recommendations:</h3>
                    <ul class="recommendation-list">
                        ${recommendationsList}
                    </ul>
                </div>
                
                <div class="mt-6 text-sm text-gray-500">
                    <p>
                        <strong>Disclaimer:</strong> This prediction is based on a machine learning model and should not replace professional medical advice. 
                        Please consult with a healthcare provider for proper diagnosis and treatment.
                    </p>
                </div>
            </div>
        `;
        
        // Update result container
        predictionResult.innerHTML = resultHTML;
    }
});