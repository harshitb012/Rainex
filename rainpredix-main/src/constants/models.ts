
import { Models } from '@/types/rainfall';

export const models: Models = {
  'hybrid': { accuracy: 0.89, precision: 0.87, recall: 0.86 },
  'knn': { accuracy: 0.82, precision: 0.81, recall: 0.80 },
  'mlp': { accuracy: 0.85, precision: 0.84, recall: 0.83 },
  'xgboost': { accuracy: 0.88, precision: 0.86, recall: 0.87 }
};

export const MODEL_NAMES = {
  hybrid: 'LSTM + Random Forest (Hybrid)',
  knn: 'KNN',
  mlp: 'MLP',
  xgboost: 'XGBoost'
};
