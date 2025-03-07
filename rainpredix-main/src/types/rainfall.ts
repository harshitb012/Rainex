
export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
}

export interface Models {
  [key: string]: ModelMetrics;
}

export interface FormInputs {
  minTemp: number;
  maxTemp: number;
  rainfall: number;
  evaporation: number;
  sunshine: number;
  windSpeed9am: number;
  windSpeed3pm: number;
  humidity9am: number;
  humidity3pm: number;
  pressure9am: number;
  pressure3pm: number;
  cloud9am: number;
  cloud3pm: number;
  temp9am: number;
  temp3pm: number;
}

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

export interface PredictionResponse {
  prediction: boolean;
  error?: string;
}
