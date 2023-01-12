import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { inputData, role } from '../../helpers/InputDataForAddCustomer';
import RoleSelect from '../RoleSelect';

export default function CreateCustomer() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  }
  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'left' }}>
      <Box component="form" noValidate={false} sx={{ width: '100%' }} onSubmit={handleSubmit}>
        <RoleSelect></RoleSelect>
        <TextField
          id="role"
          name="role"
          select
          size="small"
          fullWidth
          label="PHARMACOM Company Role"
          defaultValue=""
          required
        >
          {role.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        {inputData.map((input, index) => {
          return (
            <TextField
              key={index + input.id}
              margin="normal"
              required
              id={input.id}
              name={input.id}
              type={input.id === 'password' || input.id === 'confirmPassword' ? 'password' : ''}
              placeholder={input.placeholder}
              fullWidth
              size="small"
              // sx={{ mr: '1rem', mt: 2, mb: 2 }}
            />
          );
        })}
        <Button type="submit" fullWidth variant="contained" sx={{}}>
          Add
        </Button>
      </Box>
    </Paper>
  );
}
