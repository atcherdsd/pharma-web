import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import FetchingSelect from '../FetchingSelect';
import { useRef, useState, useEffect } from 'react';
import Title from '../Title';
import NftCreationTable from '../NftCreationTable';
import useAlert from '../../hooks/useAlert';
import CustomerAPI from '../../services/customer.api.service';

const NftReqBurn = () => {
  const form = useRef(null);
  const [contexts, setContexts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [roleValue, setRoleValue] = useState('supplier');
  const [disabled, setDisabled] = useState(false);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  function getContext(contexts) {
    setContexts(contexts);
  }

  function handleRadioChange(event) {
    setRoleValue(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // setDisabled(true);
    // if (password === confirmPassword) {
    //   setCheckPassword(true);
    // try {
    //   await CustomerAPI.postCustomer(createCustomerBody(data, contexts, countries));
    //   cleanUp();
    //   showSuccessAlert('Successfully added');
    // } catch (err) {
    //   showErrorAlert(err.response.data.message);
    // }
    // } else {
    //   setCheckPassword(false);
    // }
    //   setDisabled(false);
  }

  useEffect(() => {
    CustomerAPI.getCustomer()
      .then((result) => {
        setCustomers(result.items);
      })
      .catch((err) => showErrorAlert(err.response.data.message));
  }, [showErrorAlert]);

  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'left' }}>
      <Box
        component="form"
        noValidate={false}
        sx={{ width: '100%' }}
        onSubmit={handleSubmit}
        ref={form}
      >
        <Title>Select the Business Context</Title>
        <FetchingSelect
          id={'context'}
          label={'PHARMACOM Company Context'}
          type={'getContext'}
          getItems={getContext}
        ></FetchingSelect>

        <FormControl sx={{ mt: 2, mb: 2 }}>
          <FormLabel id="row-radio-buttons-group-label">
            <Title>Select the Role</Title>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label"
            defaultValue="supplier"
            value={roleValue}
            name="roles"
            onChange={handleRadioChange}
          >
            <FormControlLabel value="supplier" control={<Radio />} label="Supplier" />
            <FormControlLabel value="producer" control={<Radio />} label="Producer" />
            <FormControlLabel value="distributor" control={<Radio />} label="Distributor" />
          </RadioGroup>
        </FormControl>
        <NftCreationTable roleValue={roleValue} customers={customers} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
          REQUEST NFT BURN
        </Button>
      </Box>
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
