import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import routes from '../helpers/routes';

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
    </>
  );
};

export default AppRouter;
