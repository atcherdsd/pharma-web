import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LotAPI from '../services/lot.api.service';
import BoxAPI from '../services/box.api.service';
import useAlert from '../hooks/useAlert';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

export default function SelectProductName({ id }) {
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);
  const { showErrorAlert } = useAlert();

  function handleChangeLot(event) {
    const value = event.target.value;
    setLot(value);
  }

  function handleChangeHash(event) {
    const value = event.target.value;
    setHash(value);
  }

  useEffect(() => {
    LotAPI.getProductNameById(id)
      .then((result) => {
        setProductName(result.items);
      })
      .catch((err) => showErrorAlert(err.response.data.message));
  }, [id, showErrorAlert]);

  useEffect(() => {
    if (lot) {
      BoxAPI.getBoxByLotAndCustomerID(lot, id)
        .then((result) => {
          setBox(result.items);
        })
        .catch((err) => {
          showErrorAlert(err.response.data.message);
        });
    }
  }, [id, lot, showErrorAlert]);

  useEffect(() => {
    if (hash) {
      BoxAPI.getBoxImage(hash)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          showErrorAlert(err.response.data.message);
        });
    }
  }, [hash, showErrorAlert]);

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
