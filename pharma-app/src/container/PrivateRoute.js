import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  return accessToken && refreshToken ? <Outlet /> : <Outlet />;
};

export default PrivateRoute;
