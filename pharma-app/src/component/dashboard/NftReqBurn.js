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
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const baseURL = process.env.REACT_APP_BASE_URL;

const NftReqBurn = () => {
  const [disabled, setDisabled] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [customerRole, setCustomerRole] = useState(nftRequestBurnCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);
  const { showSuccessAlert, showErrorAlert } = useAlert();

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

  function onCustomerSelect(name, id) {
    setCustomerName(name);
    setCustomerId(id);
  }

  const onClick = async (event) => {
    event.preventDefault();
    setDisabled(true);
    try {
      await BoxAPI.freeze(hash);
      showSuccessAlert('Successfully!');
    } catch (err) {
      showErrorAlert(err.response.data.message);
    }

    setDisabled(false);
  };

  useEffect(() => {
    if (customerId) {
      LotAPI.getProductNameById(customerId)
        .then((result) => {
          setProductName(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
    }
  }, [customerId, showErrorAlert]);

  useEffect(() => {
    if (lot) {
      BoxAPI.getBoxByLotAndCustomerID(lot, customerId)
        .then((result) => {
          setBox(result.items);
        })
        .catch((err) => {
          showErrorAlert(err.response.data.message);
        });
    }
  }, [customerId, lot, showErrorAlert]);

  useEffect(() => {
    if (hash) {
      BoxAPI.getBoxImage(hash).catch((err) => {
        showErrorAlert(err.response.data.message);
      });
    }
  }, [hash, showErrorAlert]);

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
      {hash && (
        <Card sx={{ maxWidth: 185 }}>
          <CardMedia
            component="img"
            width="164"
            height="164"
            image={`${baseURL}/box/${hash}/qr`}
            alt="QR"
          />
        </Card>
      )}
      <Button
        type="submit"
        onClick={onClick}
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        disabled={disabled}
      >
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
