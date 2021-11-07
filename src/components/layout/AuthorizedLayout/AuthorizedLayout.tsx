import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

const AuthorizedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <div>Authorized layout</div>
      <Outlet />
    </>
  );
};

export default AuthorizedLayout;
