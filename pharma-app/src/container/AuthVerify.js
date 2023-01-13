import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import removeUserDataFromLS from '../helpers/utils';

const AuthVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const expDateRefreshToken = localStorage.getItem('expires');
    if (refreshToken) {
      if (Date.parse(expDateRefreshToken) < Date.now()) {
        removeUserDataFromLS();
        navigate('/');
      }
    }
  }, [location, navigate]);

  return <React.Fragment></React.Fragment>;
};

export default AuthVerify;
