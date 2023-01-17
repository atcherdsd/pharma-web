import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Title from './Title';
import FetchingSelect from './FetchingSelect';
import NftCreationTable from './NftCreationTable';
import CustomerAPI from '../services/customer.api.service';
import { useRef, useState, useEffect } from 'react';
import useAlert from '../hooks/useAlert';
import { role } from '../helpers/customerNftRole';
import transformToUpperCase from '../helpers/transformToUpperCase';

const CustomerSelect = ({ setDisabled }) => {
  const form = useRef(null);
  const [contexts, setContexts] = useState([]);
  const [contextId, setContextId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [roleValue, setRoleValue] = useState(role[0]);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  function getContext(contexts) {
    setContexts(contexts);
  }

  function handleContextSelection(id) {
    setContextId(id);
  }

  function onRoleChange(event) {
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
    if (contextId) {
      setDisabled(true);
      CustomerAPI.getCustomer(contextId, roleValue)
        .then((result) => {
          setCustomers(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
      setDisabled(false);
    }
  }, [contextId, roleValue, setDisabled, showErrorAlert]);

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
          defaultValue={role[0]}
          value={roleValue}
          name="roles"
          onChange={onRoleChange}
        >
          {role.map((item) => {
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
      <NftCreationTable roleValue={roleValue} customers={customers} />
    </Box>
  );
};

export default CustomerSelect;
