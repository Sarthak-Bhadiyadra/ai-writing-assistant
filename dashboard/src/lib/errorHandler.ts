import { toast } from 'sonner';
import { logger } from './logger';

export const handleError = (error: any, customMessage?: string) => {
  const message = customMessage || error.message || 'An unexpected error occurred';
  
  // Log the error for debugging
  logger.error(message, error);
  
  // Show toast to user
  toast.error(message, {
    description: error.status ? `Error code: ${error.status}` : undefined,
  });
};

export const handleSuccess = (message: string) => {
  logger.info(message);
  toast.success(message);
};

export const handleInfo = (message: string) => {
  logger.info(message);
  toast(message);
};
