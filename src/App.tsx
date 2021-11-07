import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import Login from './components/pages/Login/Login';
import NewPassword from './components/pages/NewPassword/NewPassword';
import { AppRoutes } from './constants/routes';
import './global.scss';

const UnauthorizedLayout = React.lazy(
  () => import('./components/layout/UnauthorizedLayout/UnauthorizedLayout')
);
const AuthorizedLayout = React.lazy(
  () => import('./components/layout/AuthorizedLayout/AuthorizedLayout')
);

const App = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/auth" element={<UnauthorizedLayout />}>
          <Route path={AppRoutes.LOGIN} element={<Login />}></Route>
          <Route
            path={AppRoutes.FORGOTTEN_PASSWORD}
            element={<ForgotPassword />}
          ></Route>
          <Route
            path={AppRoutes.CHANGE_PASSWORD}
            element={<NewPassword />}
          ></Route>
        </Route>
        <Route path="/" element={<AuthorizedLayout />}>
          <Route index element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default App;
