import { Route, Routes } from 'react-router-dom';
import RestorePassword from '../component/RestorePassword';
import ResetPassword from '../component/ResetPassword';
import Dashboard from './Dashboard';
import { Login } from '../component/Login';
import CreateContext from '../component/dashboard/CreateContext';
import CreateCustomer from '../component/dashboard/CreateCustomer';
import NftCreation from '../component/dashboard/NftCreation';
import NftSelling from '../component/dashboard/NftSelling';
import NftBurning from '../component/dashboard/NftBurning';
// import AlertPopup from '../component/AlertPopup';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="restore-password" element={<RestorePassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="add-context" element={<CreateContext />} />
        <Route path="add-customer" element={<CreateCustomer />} />
        <Route path="nft-creation" element={<NftCreation />} />
        <Route path="nft-selling" element={<NftSelling />} />
        <Route path="nft-burning" element={<NftBurning />} />
      </Route>
    </Routes>
  );
}
