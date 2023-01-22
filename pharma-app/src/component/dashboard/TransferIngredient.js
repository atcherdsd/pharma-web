import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import IngredientAPI from '../../services/ingredient.api.services';
import FetchingSelect from '../FetchingSelect';
import Title from '../Title';
import CustomerAPI from '../../services/customer.api.service';
import NftCreationTable from '../NftCreationTable';
import { Box, MenuItem, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const TransferIngredient = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);

  const customerRoles = {
    supplier: 'supplier',
    producer: 'producer',
  };

  const [, setContexts] = useState([]);
  const [contextId, setContextId] = useState(null);
  const [disabled, setDisabled] = useState(false);

  function getContext(contexts) {
    setContexts(contexts);
  }
  function handleContextSelection(id) {
    setContextId(id);
  }

  // First Customer

  const [firstCustomers, setFirstCustomers] = useState([]);
  const [firstCustomerRole] = useState(customerRoles.supplier);
  const [firstCustomerName, setFirstCustomerName] = useState('');
  const [firstCustomerId, setFirstCustomerId] = useState('');

  const [nftBasicIngredients, setNftBasicIngredients] = useState([]);
  const [nftBasicIngredientID, setNftBasicIngredientID] = useState('');

  const [nftQuantity, setNftQuantity] = useState(null);

  function onFirstCustomerSelect(name, id) {
    setFirstCustomerName(name);
    setFirstCustomerId(id);
  }

  function handleNFTBasicIngredientChange(event) {
    setNftBasicIngredientID(event.target.value);
  }
  function handleNftQuantityChange(event) {
    setNftQuantity(event.target.value);
  }

  // Second Customer

  const [secondCustomers, setSecondCustomers] = useState([]);
  const [secondCustomerRole] = useState(customerRoles.producer);
  const [secondCustomerName, setSecondCustomerName] = useState('');
  const [secondCustomerId, setSecondCustomerId] = useState('');

  function onSecondCustomerSelect(name, id) {
    setSecondCustomerName(name);
    setSecondCustomerId(id);
  }

  useEffect(() => {
    if (contextId) {
      setDisabled(true);
      CustomerAPI.getCustomer(contextId, firstCustomerRole)
        .then((result) => {
          setFirstCustomers(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
      CustomerAPI.getCustomer(contextId, secondCustomerRole)
        .then((result) => {
          setSecondCustomers(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
      setDisabled(false);
    }
  }, [contextId, firstCustomerRole, secondCustomerRole, setDisabled, showErrorAlert]);

  useEffect(() => {
    if (firstCustomerId) {
      IngredientAPI.getIngredients(firstCustomerId)
        .then((result) => {
          setNftBasicIngredients(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
    }
  }, [firstCustomerId, showErrorAlert]);

  // Submit

  const transferData = {
    customer: firstCustomerId,
    destination: secondCustomerId,
    quantity: nftQuantity,
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    try {
      await IngredientAPI.putIngredient(nftBasicIngredientID, transferData);
      showSuccessAlert('NFT successfully transfered');
      cleanUp();
    } catch (err) {
      showErrorAlert(err.response.data.message);
    } finally {
      setDisabled(false);
    }
  }
  function cleanUp() {
    form.current.reset();
    setNftBasicIngredientID('');
    setNftQuantity(null);
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <Box
        component="form"
        noValidate={false}
        sx={{ width: '100%' }}
        ref={form}
        onSubmit={handleSubmit}
      >
        <Title>Select the Business Context</Title>
        <FetchingSelect
          id={'context'}
          label={'PHARMACOM Company Context'}
          type={'getContext'}
          getItems={getContext}
          handleSelect={handleContextSelection}
        ></FetchingSelect>
        <NftCreationTable
          roleValue={firstCustomerRole}
          customers={firstCustomers}
          onCustomerSelect={onFirstCustomerSelect}
          customerName={firstCustomerName}
          roles={customerRoles}
        />

        <Title>Select basic ingredient</Title>
        <TextField
          id="nftBasicIngredient"
          name="nftBasicIngredient"
          select
          size="small"
          fullWidth
          label="BasicIngredient"
          defaultValue=""
          value={nftBasicIngredientID}
          onChange={handleNFTBasicIngredientChange}
          required
          sx={{ mb: 1, mt: 1 }}
        >
          {nftBasicIngredients.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="nftQuantity"
          name="nftQuantity"
          size="small"
          fullWidth
          label="Quantity"
          onChange={handleNftQuantityChange}
          onInput={handleNftQuantityChange}
          required
          sx={{ mb: 4, mt: 1 }}
        />

        <NftCreationTable
          roleValue={secondCustomerRole}
          customers={secondCustomers}
          onCustomerSelect={onSecondCustomerSelect}
          customerName={secondCustomerName}
          roles={customerRoles}
        />
        <LoadingButton
          sx={{ mt: 2 }}
          type="submit"
          fullWidth
          endIcon={<SendIcon />}
          loading={disabled}
          loadingPosition="end"
          variant="contained"
          disabled={disabled}
        >
          <span>TRANSFER NFT</span>
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default TransferIngredient;
