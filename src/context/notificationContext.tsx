import { ToastProvider } from 'react-toast-notifications';
import { IContextProvider } from './appProviders';

const NotificationProvider = ({ children }: IContextProvider) => {
  return <ToastProvider placement="top-center">{children}</ToastProvider>;
};

export default NotificationProvider;
