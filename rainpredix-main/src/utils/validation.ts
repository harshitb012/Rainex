
/**
 * Validation utilities for rainfall prediction form data
 */

import { FormInputs } from '@/types/rainfall';

export const validateFormInputs = (data: FormInputs): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Temperature validation
  if (Number(data.minTemp) > Number(data.maxTemp)) {
    errors.push('Minimum temperature cannot be greater than maximum temperature');
  }

  // Humidity validation (0-100%)
  if (Number(data.humidity9am) < 0 || Number(data.humidity9am) > 100 || 
      Number(data.humidity3pm) < 0 || Number(data.humidity3pm) > 100) {
    errors.push('Humidity must be between 0 and 100%');
  }

  // Cloud cover validation (0-8 oktas)
  if (Number(data.cloud9am) < 0 || Number(data.cloud9am) > 8 || 
      Number(data.cloud3pm) < 0 || Number(data.cloud3pm) > 8) {
    errors.push('Cloud cover must be between 0 and 8 oktas');
  }

  // Pressure validation (reasonable range: 900-1100 hPa)
  if (Number(data.pressure9am) < 900 || Number(data.pressure9am) > 1100 || 
      Number(data.pressure3pm) < 900 || Number(data.pressure3pm) > 1100) {
    errors.push('Pressure values seem unreasonable');
  }

  // Negative value validation
  const nonNegativeFields: Array<keyof FormInputs> = [
    'rainfall',
    'evaporation',
    'sunshine',
    'windSpeed9am',
    'windSpeed3pm'
  ];

  nonNegativeFields.forEach(field => {
    if (Number(data[field]) < 0) {
      errors.push(`${String(field)} cannot be negative`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatValidationErrors = (errors: string[]): string => {
  return errors.join('. ');
};
