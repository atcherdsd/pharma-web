import Paper from '@mui/material/Paper';
import { Box, Button, Divider } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useRef, useState } from 'react';
import { nftCreationCustomerRoles } from '../../helpers/customerRoles';
import NftSelect from '../NftSelect';
import useAlert from '../../hooks/useAlert';
import IngredientAPI from '../../services/ingredient.api.services';

const NftCreation = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [contextId, setContextId] = useState(null);
  const [customerRole, setCustomerRole] = useState(nftCreationCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');

  function onRoleChange(event) {
    setCustomerRole(event.target.value);
  }

  function handleContextSelection(id) {
    setContextId(id);
  }

  function onCustomerSelect(name, id) {
    setCustomerName(name);
    setCustomerId(id);
  }

  console.log('customerId: ', customerId);
  console.log('customerName: ', customerName);

  // Supplier

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientDescription, setIngredientDescription] = useState('');
  const [expiringDate, setExpiringDate] = useState(null);

  function handleIngredientNameChange(event) {
    const value = event.target.value;
    setIngredientName(value);
  }
  function handleIngredientDescriptionChange(event) {
    const value = event.target.value;
    setIngredientDescription(value);
  }
  function handleExpiringDateChange(value) {
    setExpiringDate(value);
  }

  const ingredientData = {
    customer: customerId,
    name: ingredientName,
    description: ingredientDescription,
    expires: expiringDate,
    quantity: 100,
  };

  // Producer

  // function handleChangeHash(event) {
  //   const value = event.target.value;
  //   setHash(value);
  // }
  // function handleNftQuantityChange(event) {
  //   const value = event.target.value;
  //   setNftQuantity(value);
  // }
  // function handleChangeLot(event) {
  //   const value = event.target.value;
  //   setLot(value);
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    if (customerRole === nftCreationCustomerRoles[0]) {
      try {
        await IngredientAPI.postIngredient(ingredientData);
        showSuccessAlert('NFT successfully created');
        cleanUp();
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    }
    setDisabled(false);
  }
  function cleanUp() {
    form.current.reset();
    setIngredientName('');
    setIngredientDescription('');
    setExpiringDate(null);
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
        <CustomerSelect
          setDisabled={setDisabled}
          contextId={contextId}
          handleContextSelection={handleContextSelection}
          customerRole={customerRole}
          onRoleChange={onRoleChange}
          onCustomerSelect={onCustomerSelect}
          customerName={customerName}
          roles={nftCreationCustomerRoles}
        />
        <Divider variant="fullWidth" sx={{ mt: 2, mb: 1, borderWidth: '2px' }} />
        <NftSelect
          customerRole={customerRole}
          roles={nftCreationCustomerRoles}
          handleIngredientNameChange={handleIngredientNameChange}
          handleIngredientDescriptionChange={handleIngredientDescriptionChange}
          handleExpiringDateChange={handleExpiringDateChange}
          expiringDate={expiringDate}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
          NFT GENERATION
        </Button>
      </Box>
    </Paper>
  );
};

export default NftCreation;
