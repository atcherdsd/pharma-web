// import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { enumReqType } from '../helpers/EnumReqType';
import useFetchReducer from '../hooks/FetchReducer';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

export default function FetchingSelect({ id, label, type }) {
  const { isSuccsessReq, reqData, isFetching } = useFetchReducer(
    { content: 'start', body: {} },
    enumReqType[type]
  );
  return isSuccsessReq ? (
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
      {reqData.items.map((option) => (
        <MenuItem key={option.id || option.code} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  ) : (
    <TextField
      margin="normal"
      fullWidth
      placeholder="loading"
      size="small"
      disabled
      sx={{ mb: 1, mt: 1 }}
    />
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
