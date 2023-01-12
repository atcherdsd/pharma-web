import Dashboard from '../container/Dashboard';
import AlertPopup from '../component/AlertPopup';
import { Login } from '../component/Login';
import ResetPassword from '../component/ResetPassword';
import RestorePassword from '../component/RestorePassword';
import CreateContext from '../component/dashboard/CreateContext';
import CreateCustomer from '../component/dashboard/CreateCustomer';
import NftBurning from '../component/dashboard/NftBurning';
import NftCreation from '../component/dashboard/NftCreation';
import NftSelling from '../component/dashboard/NftSelling';

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
