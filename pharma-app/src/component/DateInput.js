import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Typography } from '@mui/material';

export default function DateInput({ customerRole, roles, handleExpiringDateChange, expiringDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date input"
        value={expiringDate}
        onChange={handleExpiringDateChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
            <Typography component={'div'} marginRight={3}>
              {customerRole === roles[0] && 'NFT Basic Ingredients Expiring'}
              {(customerRole === roles[1] || customerRole === roles[2]) && 'NFT Product Expiring'}
            </Typography>
            <TextField size={'small'} ref={inputRef} {...inputProps} />
            {InputProps?.endAdornment}
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}
