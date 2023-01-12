import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  return accessToken && refreshToken ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoute;
