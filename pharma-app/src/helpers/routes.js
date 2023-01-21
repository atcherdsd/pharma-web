import Dashboard from '../container/Dashboard';
import { Login } from '../component/Login';
import ResetPassword from '../component/ResetPassword';
import RestorePassword from '../component/RestorePassword';
import CreateContext from '../component/dashboard/CreateContext';
import CreateCustomer from '../component/dashboard/CreateCustomer';
import NftBurning from '../component/dashboard/NftBurning';
import NftCreation from '../component/dashboard/NftCreation';
import TransferIngredient from '../component/dashboard/TransferIngredient';
import NftReqBurn from '../component/dashboard/NftReqBurn';
import NftSelling from '../component/dashboard/NftSelling';

const paths = {
  restorePassword: 'restore-password',
  resetPassword: 'reset-password',
  dashboard: 'dashboard',
  addContext: 'add-context',
  addCustomer: 'add-customer',
  nftCreation: 'nft-creation',
  transferIngredient: 'transfer-ingredient',
  nftSelling: 'nft-selling',
  nftReqBurn: 'nft-req-burn',
  nftBurning: 'nft-burning',
};

const routes = {
  public: [
    {
      path: '/',
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: paths.restorePassword,
      element: (
        <>
          <RestorePassword />
        </>
      ),
    },
    {
      path: paths.resetPassword,
      element: (
        <>
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
      path: paths.transferIngredient,
      element: <TransferIngredient />,
    },
    {
      path: paths.nftSelling,
      element: <NftSelling />,
    },
    {
      path: paths.nftReqBurn,
      element: <NftReqBurn />,
    },
    {
      path: paths.nftBurning,
      element: <NftBurning />,
    },
  ],
};

export default routes;
