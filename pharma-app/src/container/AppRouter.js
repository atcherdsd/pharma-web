import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthVerify from './AuthVerify';
import routes from '../component/helpers/routes';
import AlertPopup from '../component/AlertPopup';

const AppRouter = () => {
  return (
    <>
      <Routes>
        {routes.public.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route
          element={
            <>
              <AlertPopup />
              <PrivateRoute />
            </>
          }
        >
          <Route path={routes.rootPrivate.path} element={routes.rootPrivate.element}>
            {routes.private.map((route) => (
              <Route path={route.path} element={route.element} key={route.path} />
            ))}
          </Route>
        </Route>
      </Routes>
      <AuthVerify />
    </>
  );
};

export default AppRouter;
