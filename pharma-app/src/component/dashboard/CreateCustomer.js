import { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { inputData, role } from '../../helpers/InputDataForAddCustomer';
import FetchingSelect from '../FetchingSelect';
import createCustomerBody from '../../helpers/createCustomerBody';
import CustomerAPI from '../../services/customer.api.service';
import useAlert from '../../hooks/useAlert';

export default function CreateCustomer() {
  const form = useRef(null);
  const [contexts, setContexts] = useState([]);
  const [contextId, setContextId] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [uploadFile, setUploadFile] = useState('');
  const [checkPassword, setCheckPassword] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  function cleanUp() {
    form.current.reset();
    setUploadFile('');
  }

  function getContext(contexts) {
    setContexts(contexts);
  }

  function handleContextSelection(id) {
    setContextId(id);
  }

  function handleCountrySelection(event, newValue) {
    setCountryCode(newValue);
  }

  function onChange(event) {
    let file = event.target.value;
    let index = file.indexOf('fakepath');
    let fileName = file.slice(index + 9);
    setUploadFile(fileName);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    setDisabled(true);
    if (password === confirmPassword) {
      setCheckPassword(true);
      try {
        await CustomerAPI.postCustomer(createCustomerBody(data, contexts, countryCode.code));
        cleanUp();
        showSuccessAlert('Successfully added');
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    } else {
      setCheckPassword(false);
    }
    setDisabled(false);
  }
  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'left' }}>
      <Box
        component="form"
        noValidate={false}
        sx={{ width: '100%' }}
        onSubmit={handleSubmit}
        ref={form}
      >
        <FetchingSelect
          id={'context'}
          label={'PHARMACOM Company Context'}
          type={'getContext'}
          getItems={getContext}
          handleSelect={handleContextSelection}
        ></FetchingSelect>
        <TextField
          id="role"
          name="role"
          select
          size="small"
          fullWidth
          label="PHARMACOM Company Role"
          defaultValue=""
          required
          sx={{ mb: 1, mt: 1 }}
        >
          {role.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        {inputData.map((input, index) => {
          return input.id == 'country' ? (
            <FetchingSelect
              id={input.id}
              label={'Country of Residence'}
              type={'getCountry'}
              key={index}
              handleSelect={handleCountrySelection}
            ></FetchingSelect>
          ) : input.id == 'document' ? (
            <Box sx={{ display: 'flex', gap: '1rem' }} key={index} required>
              <TextField
                margin="normal"
                required
                fullWidth
                name="file"
                id="file"
                value={uploadFile}
                placeholder={'Company ProofOfIdentity Document (PDF, PNG, etc..)'}
                size="small"
                sx={{ mb: 1, mt: 1 }}
              />
              <Button variant="contained" component="label" sx={{ mt: 1, mb: 1, pt: 0, pb: 0 }}>
                Upload
                <input
                  hidden
                  accept=".pdf, .docx, .png, .jpeg"
                  type="file"
                  name="fileUpload"
                  onChange={onChange}
                />
              </Button>
            </Box>
          ) : (
            <TextField
              key={index}
              margin="normal"
              required={input.required}
              id={input.id}
              name={input.id}
              placeholder={input.placeholder}
              fullWidth
              size="small"
              sx={{ mb: 1, mt: 1 }}
            />
          );
        })}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={checkPassword ? false : true}
          helperText={checkPassword ? '' : 'Passwords do not match'}
          size="small"
          sx={{ mb: 1, mt: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          error={checkPassword ? false : true}
          helperText={checkPassword ? '' : 'Passwords do not match'}
          size="small"
          sx={{ mb: 1, mt: 1 }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
          Add
        </Button>
      </Box>
    </Paper>
  );
}
