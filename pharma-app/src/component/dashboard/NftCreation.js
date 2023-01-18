import Paper from '@mui/material/Paper';
import { Button, Divider } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useState } from 'react';
import { nftCreationCustomerRoles } from '../../helpers/customerRoles';
import NftSelect from '../NftSelect';

const NftCreation = () => {
  const [disabled, setDisabled] = useState(false);
  const [customerRole, setCustomerRole] = useState(nftCreationCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');

  function onRoleChange(event) {
    setCustomerRole(event.target.value);
  }

  function onCustomerSelect(name, id) {
    setCustomerName(name);
    setCustomerId(id);
  }

  console.log('customerId: ', customerId);
  console.log('customerName: ', customerName);

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <CustomerSelect
        setDisabled={setDisabled}
        customerRole={customerRole}
        onRoleChange={onRoleChange}
        onCustomerSelect={onCustomerSelect}
        customerName={customerName}
        roles={nftCreationCustomerRoles}
      />
      <Divider variant="fullWidth" sx={{ mt: 2, mb: 1, borderWidth: '2px' }} />
      <NftSelect customerRole={customerRole} roles={nftCreationCustomerRoles} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
        NFT GENERATION
      </Button>
    </Paper>
  );
};

export default NftCreation;
