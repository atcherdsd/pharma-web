import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountryAutocomplete({ id, label, country, handleChangeCountry }) {
  const defaultLotProps = {
    options: country,
    getOptionLabel: (option) => option.name || '',
  };
  return (
    <Autocomplete
      sx={{ mb: 1, mt: 1 }}
      {...defaultLotProps}
      id={id}
      name={id}
      fullWidth
      size="small"
      onChange={handleChangeCountry}
      renderInput={(params) => <TextField {...params} label={label} required />}
    />
  );
}
