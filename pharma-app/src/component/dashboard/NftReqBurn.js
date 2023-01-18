import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import Title from '../Title';
import SelectProductName from '../SelectProductName';
import { nftRequestBurnCustomerRoles } from '../../helpers/customerRoles';
import useAlert from '../../hooks/useAlert';
import BoxAPI from '../../services/box.api.service';
import LotAPI from '../../services/lot.api.service';

const NftReqBurn = () => {
  const [disabled, setDisabled] = useState(false);
  const [customerRole, setCustomerRole] = useState(nftRequestBurnCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);
  const { showErrorAlert } = useAlert();

  function handleChangeLot(event) {
    const value = event.target.value;
    setLot(value);
  }

  function handleChangeHash(event) {
    const value = event.target.value;
    setHash(value);
  }

  function onRoleChange(event) {
    setCustomerRole(event.target.value);
  }

  function onCustomerSelect(event) {
    setCustomerName(event.target.closest('tr').firstChild.innerText);
  }

  useEffect(() => {
    LotAPI.getProductNameById(2)
      .then((result) => {
        setProductName(result.items);
      })
      .catch((err) => showErrorAlert(err.response.data.message));
  }, [showErrorAlert]);

  // useEffect(() => {
  //   if (lot) {
  //     BoxAPI.getBoxByLotAndCustomerID(lot, id)
  //       .then((result) => {
  //         setBox(result.items);
  //       })
  //       .catch((err) => {
  //         showErrorAlert(err.response.data.message);
  //       });
  //   }
  // }, [id, lot, showErrorAlert]);

  // useEffect(() => {
  //   if (hash) {
  //     BoxAPI.getBoxImage(hash)
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .catch((err) => {
  //         showErrorAlert(err.response.data.message);
  //       });
  //   }
  // }, [hash, showErrorAlert]);

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
      <Title>Select a specific NFT</Title>
      <SelectProductName
        handleChangeLot={handleChangeLot}
        handleChangeHash={handleChangeHash}
        productName={productName}
        box={box}
      ></SelectProductName>
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
