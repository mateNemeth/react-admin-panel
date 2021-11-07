import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './authContext';
import NotificationProvider from './notificationContext';
import ClientProvider from './queryClientContext';

export interface IContextProvider {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IContextProvider) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <NotificationProvider>
        <ClientProvider>
          <AuthProvider>
            <Router>{children}</Router>
          </AuthProvider>
        </ClientProvider>
      </NotificationProvider>
    </React.Suspense>
  );
};

export default AppProviders;
