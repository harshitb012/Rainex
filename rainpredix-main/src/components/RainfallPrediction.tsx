import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { toast } from 'sonner';
import axios from 'axios';

// Mock data for the model comparison chart
const modelComparisonData = [
  {
    name: 'knn',
    Accuracy: 0.82,
    Precision: 0.81,
    Recall: 0.80,
  },
  {
    name: 'mlp',
    Accuracy: 0.85,
    Precision: 0.84,
    Recall: 0.83,
  },
  {
    name: 'xgboost',
    Accuracy: 0.89,
    Precision: 0.86,
    Recall: 0.87,
  },
];

// Model metrics data
const modelMetrics = {
  knn: { accuracy: 0.82, precision: 0.81, recall: 0.80 },
  mlp: { accuracy: 0.85, precision: 0.84, recall: 0.83 },
  xgboost: { accuracy: 0.89, precision: 0.86, recall: 0.87 }
};

const RainfallPrediction = () => {
  const [selectedModel, setSelectedModel] = useState('mlp');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    Location: "Sydney",
    WindGustDir: "W",
    WindDir9am: "W",
    WindDir3pm: "E",
    RainToday: "Yes",
    MinTemp: "9.2",
    MaxTemp: "15.6",
    Rainfall: "1.6",
    Evaporation: "0.4",
    Sunshine: "0",
    WindGustSpeed: "22",
    WindSpeed9am: "13",
    WindSpeed3pm: "2",
    Humidity9am: "88",
    Humidity3pm: "74",
    Pressure9am: "1025.8",
    Pressure3pm: "1021.3",
    Cloud9am: "7",
    Cloud3pm: "8",
    Temp9am: "11.4",
    Temp3pm: "15.3",
  });
  
  // Get current model metrics based on selection
  const currentMetrics = modelMetrics[selectedModel];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);

    try {
      // Add the selected model to the form data
      const dataToSend = { ...formData, model: selectedModel };
      
      // Send data to Flask backend
      const response = await axios.post('http://127.0.0.1:5000/predict', dataToSend);
      
      // Handle successful prediction
      setPrediction(response.data.prediction);
      toast.success(`Prediction successful with ${selectedModel.toUpperCase()} model`);
    } catch (error) {
      console.error('Prediction failed:', error);
      toast.error('Prediction failed. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Rainfall Prediction</h1>
        <p className="text-gray-600 mb-8">Predict tomorrow's rainfall using advanced machine learning models</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form Card */}
          <Card className="p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Model Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Model</label>
                <select 
                  name="model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="knn">KNN</option>
                  <option value="mlp">MLP</option>
                  <option value="xgboost">XGBoost</option>
                </select>
              </div>

              {/* Location and Wind Gust Direction */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <select 
                    name="Location" 
                    value={formData.Location} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Sydney">Sydney</option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="Brisbane">Brisbane</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wind Gust Direction</label>
                  <select 
                    name="WindGustDir" 
                    value={formData.WindGustDir} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="W">W</option>
                    <option value="N">N</option>
                    <option value="S">S</option>
                    <option value="E">E</option>
                  </select>
                </div>
              </div>

              {/* Wind Direction 9am and 3pm */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wind Direction 9am</label>
                  <select 
                    name="WindDir9am" 
                    value={formData.WindDir9am} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="W">W</option>
                    <option value="N">N</option>
                    <option value="S">S</option>
                    <option value="E">E</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wind Direction 3pm</label>
                  <select 
                    name="WindDir3pm" 
                    value={formData.WindDir3pm} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="E">E</option>
                    <option value="W">W</option>
                    <option value="N">N</option>
                    <option value="S">S</option>
                  </select>
                </div>
              </div>

              {/* Rain Today and Min Temp */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rain Today</label>
                  <select 
                    name="RainToday" 
                    value={formData.RainToday} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Temperature (°C)</label>
                  <input 
                    type="number" 
                    name="MinTemp" 
                    value={formData.MinTemp} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                    step="0.1"
                  />
                </div>
              </div>

              {/* Max Temp and Rainfall */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Temperature (°C)</label>
                  <input 
                    type="number" 
                    name="MaxTemp" 
                    value={formData.MaxTemp} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rainfall (mm)</label>
                  <input 
                    type="number" 
                    name="Rainfall" 
                    value={formData.Rainfall} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Evaporation and Sunshine */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Evaporation (mm)</label>
                  <input 
                    type="number" 
                    name="Evaporation" 
                    value={formData.Evaporation} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sunshine (hours)</label>
                  <input 
                    type="number" 
                    name="Sunshine" 
                    value={formData.Sunshine} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Wind Gust Speed and Wind Speed 9am */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wind Gust Speed (km/h)</label>
                  <input 
                    type="number" 
                    name="WindGustSpeed" 
                    value={formData.WindGustSpeed} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wind Speed 9am (km/h)</label>
                  <input 
                    type="number" 
                    name="WindSpeed9am" 
                    value={formData.WindSpeed9am} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Wind Speed 3pm and Humidity 9am */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wind Speed 3pm (km/h)</label>
                  <input 
                    type="number" 
                    name="WindSpeed3pm" 
                    value={formData.WindSpeed3pm} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Humidity 9am (%)</label>
                  <input 
                    type="number" 
                    name="Humidity9am" 
                    value={formData.Humidity9am} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Humidity 3pm and Pressure 9am */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Humidity 3pm (%)</label>
                  <input 
                    type="number" 
                    name="Humidity3pm" 
                    value={formData.Humidity3pm} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pressure 9am (hPa)</label>
                  <input 
                    type="number" 
                    name="Pressure9am" 
                    value={formData.Pressure9am} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Pressure 3pm and Cloud 9am */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pressure 3pm (hPa)</label>
                  <input 
                    type="number" 
                    name="Pressure3pm" 
                    value={formData.Pressure3pm} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cloud Cover 9am (oktas)</label>
                  <input 
                    type="number" 
                    name="Cloud9am" 
                    value={formData.Cloud9am} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Cloud 3pm and Temp 9am */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cloud Cover 3pm (oktas)</label>
                  <input 
                    type="number" 
                    name="Cloud3pm" 
                    value={formData.Cloud3pm} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature 9am (°C)</label>
                  <input 
                    type="number" 
                    name="Temp9am" 
                    value={formData.Temp9am} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              {/* Temp 3pm */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature 3pm (°C)</label>
                  <input 
                    type="number" 
                    name="Temp3pm" 
                    value={formData.Temp3pm} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded" 
                  />
                </div>
                <div></div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded transition-colors`}
              >
                {isLoading ? 'Predicting...' : 'Predict Rainfall'}
              </button>
            </form>
          </Card>

          {/* Metrics and Comparison Card */}
          <div className="space-y-8">
            {/* Prediction Result Card */}
            {prediction !== null && (
              <Card className="p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Prediction Result</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">
                    Rain Tomorrow: <span className={prediction === 1 ? 'text-blue-600' : 'text-gray-600'}>
                      {prediction === 1 ? 'Yes' : 'No'}
                    </span>
                  </p>
                  <p className="text-gray-600">Predicted using {selectedModel.toUpperCase()} model</p>
                </div>
              </Card>
            )}
            
            {/* Metrics Card */}
            <Card className="p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Model Performance Metrics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-2xl font-bold">{(currentMetrics.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Precision</p>
                  <p className="text-2xl font-bold">{(currentMetrics.precision * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recall</p>
                  <p className="text-2xl font-bold">{(currentMetrics.recall * 100).toFixed(1)}%</p>
                </div>
              </div>
            </Card>

            {/* Comparison Chart Card */}
            <Card className="p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Model Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modelComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0.7, 1]} />
                    <Tooltip />
                    <Bar dataKey="Accuracy" fill="#3b82f6" />
                    <Bar dataKey="Precision" fill="#10b981" />
                    <Bar dataKey="Recall" fill="#818cf8" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                    <span className="text-sm">Accuracy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-1"></div>
                    <span className="text-sm">Precision</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-400 mr-1"></div>
                    <span className="text-sm">Recall</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RainfallPrediction;
