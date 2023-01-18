import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Title from './Title';
import FetchingSelect from './FetchingSelect';
import NftCreationTable from './NftCreationTable';
import CustomerAPI from '../services/customer.api.service';
import { useRef, useState, useEffect } from 'react';
import useAlert from '../hooks/useAlert';
import transformToUpperCase from '../helpers/transformToUpperCase';
import { roles } from '../helpers/nftCreationCustomerRoles';

const CustomerSelect = ({
  setDisabled,
  customerRole,
  onRoleChange,
  onCustomerSelect,
  customerName,
}) => {
  const form = useRef(null);
  const [contexts, setContexts] = useState([]);
  const [contextId, setContextId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  function getContext(contexts) {
    setContexts(contexts);
  }

  function handleContextSelection(id) {
    setContextId(id);
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
    if (contextId) {
      setDisabled(true);
      CustomerAPI.getCustomer(contextId, customerRole)
        .then((result) => {
          setCustomers(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
      setDisabled(false);
    }
  }, [contextId, customerRole, setDisabled, showErrorAlert]);

  return (
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
        handleSelect={handleContextSelection}
      ></FetchingSelect>

      <FormControl sx={{ mt: 2, mb: 2 }}>
        <FormLabel id="row-radio-buttons-group-label">
          <Title>Select the Role</Title>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="row-radio-buttons-group-label"
          defaultValue={customerRole}
          value={customerRole}
          name="roles"
          onChange={onRoleChange}
        >
          {roles.map((item) => {
            return (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio />}
                label={transformToUpperCase(item)}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <NftCreationTable
        roleValue={customerRole}
        customers={customers}
        onCustomerSelect={onCustomerSelect}
        customerName={customerName}
      />
    </Box>
  );
};

export default CustomerSelect;
