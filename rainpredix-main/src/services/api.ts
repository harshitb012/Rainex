
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Define the prediction response interface
export interface PredictionResponse {
  prediction: boolean;
  confidence: number;
  model: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
  };
  error?: string;
}

// Define the form data interface
export interface FormData {
  Location: string;
  WindGustDir: string;
  WindDir9am: string;
  WindDir3pm: string;
  RainToday: string;
  MinTemp: string;
  MaxTemp: string;
  Rainfall: string;
  Evaporation: string;
  Sunshine: string;
  WindGustSpeed: string;
  WindSpeed9am: string;
  WindSpeed3pm: string;
  Humidity9am: string;
  Humidity3pm: string;
  Pressure9am: string;
  Pressure3pm: string;
  Cloud9am: string;
  Cloud3pm: string;
  Temp9am: string;
  Temp3pm: string;
  model: string;
}

// Get all model metrics
export const getModelMetrics = async () => {
  try {
    const response = await axios.get(`${API_URL}/models`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch model metrics:', error);
    throw error;
  }
};

// Make a prediction
export const makePrediction = async (formData: FormData): Promise<PredictionResponse> => {
  try {
    const response = await axios.post(`${API_URL}/predict`, formData);
    return response.data;
  } catch (error) {
    console.error('Prediction request failed:', error);
    throw error;
  }
};
