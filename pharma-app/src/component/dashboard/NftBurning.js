import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useState } from 'react';
import { roles } from '../../helpers/nftCreationCustomerRoles';

const NftBurning = () => {
  const [disabled, setDisabled] = useState(false);
  const [customerRole, setCustomerRole] = useState(roles[0]);

  function onRoleChange(event) {
    setCustomerRole(event.target.value);
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <CustomerSelect
        setDisabled={setDisabled}
        onRoleChange={onRoleChange}
        customerRole={customerRole}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
        BURN
      </Button>
    </Paper>
  );
};

export default NftBurning;
