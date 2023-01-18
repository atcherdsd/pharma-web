import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

export default function SelectProductName({ handleChangeLot, handleChangeHash, productName, box }) {
  return (
    <div>
      <TextField
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
      </TextField>
      <TextField
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
      </TextField>
      <img
        src={'http://134.0.115.216/v1/box/dec9fdea-c307-497b-8757-bf4af7f4b18d/qr'}
        alt={'logo'}
      ></img>
    </div>
  );
}
