import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import LotAPI from '../services/lot.api.service';
// import BoxAPI from '../services/box.api.service';
import useAlert from '../hooks/useAlert';
import Title from './Title';
import DateInput from './DateInput';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

export default function NftSelect({ customerRole, roles, id }) {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientDescription, setIngredientDescription] = useState('');

  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);
  const { showErrorAlert } = useAlert();

  function handleIngredientNameChange(event) {
    const value = event.target.value;
    setIngredientName(value);
  }
  function handleIngredientDescriptionChange(event) {
    const value = event.target.value;
    setIngredientDescription(value);
  }

  function handleChangeLot(event) {
    const value = event.target.value;
    setLot(value);
  }

  function handleChangeHash(event) {
    const value = event.target.value;
    setHash(value);
  }

  // useEffect(() => {
  //   LotAPI.getProductNameById(id)
  //     .then((result) => {
  //       setProductName(result.items);
  //     })
  //     .catch((err) => showErrorAlert(err.response.data.message));
  // }, [id, showErrorAlert]);

  // useEffect(() => {
  //   if (lot) {
  //     BoxAPI.getBoxByLotAndCustomerID(lot, id)
  //       .then((result) => {
  //         setBox(result.items);
  //       })
  //       .catch((err) => {
  //         showErrorAlert(err.response.data.message);
  //       });
  //   }
  // }, [id, lot, showErrorAlert]);

  // useEffect(() => {
  //   if (hash) {
  //     BoxAPI.getBoxImage(hash)
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .catch((err) => {
  //         showErrorAlert(err.response.data.message);
  //       });
  //   }
  // }, [hash, showErrorAlert]);

  return (
    <>
      {customerRole === roles[0] && (
        <>
          <Title>Fill the NFT basic ingredient to create</Title>
          <TextField
            id="ingredientName"
            name="ingredientName"
            size="small"
            fullWidth
            label="NFTBasicIngredientName"
            value={ingredientName}
            onChange={handleIngredientNameChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
          <TextField
            id="ingredientDescription"
            name="ingredientDescription"
            size="small"
            fullWidth
            label="NFTBasicIngredientDescription"
            value={ingredientDescription}
            onChange={handleIngredientDescriptionChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
        </>
      )}
      {customerRole === roles[1] && (
        <>
          <Title>Fill the NFT Product attributes</Title>
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
        </>
      )}
      {customerRole === roles[2] && <Title>NFT re-boxing</Title>}
      <DateInput customerRole={customerRole} roles={roles} />
    </>
  );
}
