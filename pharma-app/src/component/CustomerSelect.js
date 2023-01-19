import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Title from './Title';
import FetchingSelect from './FetchingSelect';
import NftCreationTable from './NftCreationTable';
import CustomerAPI from '../services/customer.api.service';
import { useState, useEffect } from 'react';
import useAlert from '../hooks/useAlert';
import transformToUpperCase from '../helpers/transformToUpperCase';

const CustomerSelect = ({
  setDisabled,
  contextId,
  handleContextSelection,
  customerRole,
  onRoleChange,
  onCustomerSelect,
  customerName,
  roles,
}) => {
  const [contexts, setContexts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { showErrorAlert } = useAlert();

  function getContext(contexts) {
    setContexts(contexts);
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
    <>
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
        roles={roles}
      />
    </>
  );
};

export default CustomerSelect;
