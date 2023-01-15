import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ResourceAPI from '../services/resource.api.service';
import ContextAPI from '../services/context.api.service';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

export default function FetchingSelect({ id, label, type, getItems }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (type == 'getContext') {
      ContextAPI.getContext()
        .then((result) => {
          setItems(result.items);
          getItems(result.items);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      ResourceAPI.getCountry()
        .then((result) => {
          setItems(result.items);
          getItems(result.items);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, []);
  return (
    <TextField
      id={id}
      name={id}
      select
      size="small"
      fullWidth
      label={label}
      defaultValue=""
      required
      sx={{ mb: 1, mt: 1 }}
    >
      {items.map((option) => (
        <MenuItem key={option.id || option.code} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

{
  /* <Autocomplete
      id={id}
      name={id}
      fullWidth
      open={open}
      required
      size="small"
      sx={{ mb: 1, mt: 1 }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={isFetching}
      renderInput={(params) =>
        isSuccsessReq ? (
          <TextField
            required
            size="small"
            name={id}
            {...params}
            label={label}
            defaultValue=""
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        ) : (
          <TextField
            margin="normal"
            fullWidth
            placeholder="loading"
            size="small"
            disabled
            sx={{ mb: 1, mt: 1 }}
          />
        )
      }
    /> */
}
