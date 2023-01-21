// import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

export default function SelectProductName({
  handleChangeLot,
  handleChangeHash,
  productName,
  box,
  lot,
  loadingProduct,
}) {
  const defaultLotProps = {
    options: productName,
    getOptionLabel: (option) => option.name || '',
  };
  const defaultBoxProps = {
    options: box,
    getOptionLabel: (option) => option.hash || '',
  };
  return (
    <div>
      <Autocomplete
        sx={{ mb: 1, mt: 1 }}
        {...defaultLotProps}
        id="lotName"
        required
        onChange={handleChangeLot}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="NFTProductName"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingProduct ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {lot && (
        <Autocomplete
          sx={{ mb: 1, mt: 1 }}
          {...defaultBoxProps}
          id="hash"
          onChange={handleChangeHash}
          renderInput={(params) => <TextField {...params} label="NFTBox" variant="standard" />}
        />
      )}
      {/* <TextField
        id="productName"
        name="productName"
        select
        size="small"
        fullWidth
        label="NFTProductName"
        defaultValue=""
        onChange={handleChangeLot}
        required
        sx={{ mb: 1, mt: 1 }}
      >
        {productName.map((lot) => (
          <MenuItem key={lot.id} value={lot.id}>
            {lot.name}
          </MenuItem>
        ))}
      </TextField> */}
      {/* <TextField
        id="nftBox"
        name="nftBox"
        select
        size="small"
        fullWidth
        label="nftBox"
        defaultValue=""
        onChange={handleChangeHash}
        required
        sx={{ mb: 1, mt: 1 }}
      >
        {box.map((box) => (
          <MenuItem key={box.index} value={box.hash}>
            {box.hash}
          </MenuItem>
        ))}
      </TextField> */}
    </div>
  );
}

{
  /* <Autocomplete
  id="country-select-demo"
  sx={{ width: 300 }}
  options={productName}
  autoHighlight
  getOptionLabel={(option) => option.name || ''}
  onChange={handleChangeLot}
  renderOption={(props, option) => (
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      {option.name}
    </Box>
  )}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Choose a country"
      inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
    />
  )}
></Autocomplete>; */
}
