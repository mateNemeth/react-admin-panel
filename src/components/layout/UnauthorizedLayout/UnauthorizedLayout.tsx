import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import logo from '../../../assets/images/logo-placeholder.jpg';

import styles from './UnauthorizedLayout.module.scss';

const UnauthorizedLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} />
      <Outlet />
    </div>
  );
};

export default UnauthorizedLayout;
