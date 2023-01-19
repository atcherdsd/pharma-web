import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useRef, useState } from 'react';
import { nftRequestBurnCustomerRoles } from '../../helpers/customerRoles';
import useAlert from '../../hooks/useAlert';

const NftReqBurn = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [contextId, setContextId] = useState(null);
  const [customerRole, setCustomerRole] = useState(nftRequestBurnCustomerRoles[0]);
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

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    // if (customerRole === nftCreationCustomerRoles[0]) {
    try {
      // await IngredientAPI.postIngredient(ingredientData);
      showSuccessAlert('Request successfully sent');
      cleanUp();
    } catch (err) {
      showErrorAlert(err.response.data.message);
    }
    // }
    setDisabled(false);
  }
  function cleanUp() {
    form.current.reset();
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
          roles={nftRequestBurnCustomerRoles}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
          REQUEST NFT BURN
        </Button>
      </Box>
    </Paper>
  );
};

export default NftReqBurn;
