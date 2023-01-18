import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useState } from 'react';
import { nftBurningCustomerRoles } from '../../helpers/customerRoles';

const NftBurning = () => {
  const [disabled, setDisabled] = useState(false);
  const [customerRole, setCustomerRole] = useState(nftBurningCustomerRoles[0]);
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
        roles={nftBurningCustomerRoles}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
        BURN
      </Button>
    </Paper>
  );
};

export default NftBurning;
