
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample model data (for demonstration)
const modelMetrics = {
  "Random Forest": { accuracy: 0.85, precision: 0.83, recall: 0.81 },
  "Logistic Regression": { accuracy: 0.78, precision: 0.76, recall: 0.75 },
  "Neural Network": { accuracy: 0.88, precision: 0.87, recall: 0.86 },
  "Decision Tree": { accuracy: 0.76, precision: 0.74, recall: 0.73 }
};

// Routes
app.get('/api/models', (req, res) => {
  res.json(modelMetrics);
});

app.post('/api/predict', (req, res) => {
  try {
    const formData = req.body;
    console.log('Received prediction request:', formData);
    
    // In a real application, you would process the data through your ML model here
    // For now, we'll return a mock prediction based on the selected model
    
    const selectedModel = formData.model || 'Random Forest';
    const willRain = Math.random() > 0.5; // Random prediction for demo purposes
    
    // Simulate processing time
    setTimeout(() => {
      res.json({
        prediction: willRain,
        confidence: willRain ? 0.75 : 0.25,
        model: selectedModel,
        metrics: modelMetrics[selectedModel]
      });
    }, 1000);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to process prediction request' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
