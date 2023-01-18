import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useState } from 'react';
import { nftRequestBurnCustomerRoles } from '../../helpers/customerRoles';

const NftReqBurn = () => {
  const [disabled, setDisabled] = useState(false);
  const [customerRole, setCustomerRole] = useState(nftRequestBurnCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');

  function onRoleChange(event) {
    setCustomerRole(event.target.value);
  }

  function onCustomerSelect(event) {
    setCustomerName(event.target.closest('tr').firstChild.innerText);
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <CustomerSelect
        setDisabled={setDisabled}
        customerRole={customerRole}
        onRoleChange={onRoleChange}
        onCustomerSelect={onCustomerSelect}
        customerName={customerName}
        roles={nftRequestBurnCustomerRoles}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
        REQUEST NFT BURN
      </Button>
    </Paper>
  );
};

export default NftReqBurn;

// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Chart from '../Chart';
// import Deposits from '../Deposits';
// import Orders from '../ContextTable';

// export default function NftSelling() {
//   return (
//     <Grid container spacing={3}>
//       {/* Chart */}
//       <Grid item xs={12} md={8} lg={9}>
//         <Paper
//           sx={{
//             p: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             height: 240,
//           }}
//         >
//           <Chart />
//         </Paper>
//       </Grid>
//       {/* Recent Deposits */}
//       <Grid item xs={12} md={4} lg={3}>
//         <Paper
//           sx={{
//             p: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             height: 240,
//           }}
//         >
//           <Deposits />
//         </Paper>
//       </Grid>
//       {/* Recent Orders */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//           <Orders />
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }
