import { useToasts } from 'react-toast-notifications';
import { ErrorResponse } from '../api/apiClient';
import { Notifications } from '../constants/notifications';

const useNotifications = () => {
  const toasts = useToasts();

  const success = (message: string) => {
    return toasts.addToast(message, { appearance: 'success' });
  };
  const error = (message: string) => {
    return toasts.addToast(message, { appearance: 'error' });
  };
  const info = (message: string) => {
    return toasts.addToast(message, { appearance: 'info' });
  };
  const warning = (message: string) => {
    return toasts.addToast(message, { appearance: 'warning' });
  };

  const handleErrorResponse = (response: ErrorResponse) => {
    return error(
      response.messages.map((message) => Notifications[message]).join(',')
    );
  };

  return { success, error, info, warning, handleErrorResponse };
};

export default useNotifications;
