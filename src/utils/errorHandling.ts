import { toast } from 'react-toastify';

export class AppError extends Error {
  public code?: string;
  public severity: 'warning' | 'error';

  constructor(message: string, code?: string, severity: 'warning' | 'error' = 'error') {
    super(message);
    this.code = code;
    this.severity = severity;
    this.name = 'AppError';

    // Fix prototype chain for AppError
    Object.setPrototypeOf(this, AppError.prototype);

    // Capture stack trace for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export const handleError = (error: unknown): void => {
  console.error('Error occurred:', error);

  if (error instanceof AppError) {
    toast(error.message, {
      type: error.severity === 'warning' ? 'warning' : 'error',
      position: 'top-right',
      autoClose: 5000
    });
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  // Handle unexpected errors
  console.error('Unhandled error type:', error);
  toast.error('An unexpected error occurred. Please contact support.');
};
