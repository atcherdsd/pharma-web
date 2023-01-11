import Dashboard from '../../container/Dashboard';
import AlertPopup from '../AlertPopup';
import { Login } from '../Login';
import ResetPassword from '../ResetPassword';
import RestorePassword from '../RestorePassword';
import CreateContext from '../dashboard/CreateContext';
import CreateCustomer from '../dashboard/CreateCustomer';
import NftBurning from '../dashboard/NftBurning';
import NftCreation from '../dashboard/NftCreation';
import NftSelling from '../dashboard/NftSelling';

const paths = {
  restorePassword: 'restore-password',
  resetPassword: 'reset-password',
  dashboard: 'dashboard',
  addContext: 'add-context',
  addCustomer: 'add-customer',
  nftCreation: 'nft-creation',
  nftSelling: 'nft-selling',
  nftBurning: 'nft-burning',
};

const routes = {
  public: [
    {
      path: '/',
      element: (
        <>
          <AlertPopup />
          <Login />
        </>
      ),
    },
    {
      path: paths.restorePassword,
      element: (
        <>
          <AlertPopup />
          <RestorePassword />
        </>
      ),
    },
    {
      path: paths.resetPassword,
      element: (
        <>
          <AlertPopup />
          <ResetPassword />
        </>
      ),
    },
  ],
  rootPrivate: {
    path: paths.dashboard,
    element: <Dashboard />,
  },
  private: [
    {
      path: paths.addContext,
      element: <CreateContext />,
    },
    {
      path: paths.addCustomer,
      element: <CreateCustomer />,
    },
    {
      path: paths.nftCreation,
      element: <NftCreation />,
    },
    {
      path: paths.nftSelling,
      element: <NftSelling />,
    },
    {
      path: paths.nftBurning,
      element: <NftBurning />,
    },
  ],
};

export default routes;
