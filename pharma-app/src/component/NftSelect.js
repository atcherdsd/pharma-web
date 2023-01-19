import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import LotAPI from '../services/lot.api.service';
// import BoxAPI from '../services/box.api.service';
import useAlert from '../hooks/useAlert';
import Title from './Title';
import DateInput from './DateInput';
import { Box, Button } from '@mui/material';
import IngredientAPI from '../services/ingredient.api.services';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

export default function NftSelect({
  customerRole,
  roles,
  handleIngredientNameChange,
  handleIngredientDescriptionChange,
  handleExpiringDateChange,
  expiringDate,
  customerId,
  handleNftQuantityChange,
  handleNftBoxChange,
  handleProductNameChange,
  handleProductDescriptionChange,
  nftBasicIngredientID,
  handleNFTBasicIngredientChange,
  onChangeFile,
}) {
  const { showErrorAlert } = useAlert();

  const [nftBasicIngredients, setNftBasicIngredients] = useState([]);

  const [nftReboxedQuantity, setNftReboxedQuantity] = useState('');

  function handleChangeLot(event, newValue) {
    setLot(newValue);
  }

  function handleChangeHash(event, newValue) {
    setHash(newValue);
  }

  function handleNftReboxedQuantityChange(event) {
    const value = event.target.value;
    setNftReboxedQuantity(value);
  }

  useEffect(() => {
    if (customerId) {
      IngredientAPI.getIngredients(customerId)
        .then((result) => {
          setNftBasicIngredients(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
    }
  }, [customerId, showErrorAlert]);

  // useEffect(() => {
  //   if (lot) {
  //     BoxAPI.getBoxByLotAndCustomerID(lot, customerId)
  //       .then((result) => {
  //         setBox(result.items);
  //       })
  //       .catch((err) => {
  //         showErrorAlert(err.response.data.message);
  //       });
  //   }
  // }, [customerId, lot, showErrorAlert]);

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
            id="nftBox"
            name="nftBox"
            size="small"
            fullWidth
            label="NFTBox"
            onChange={handleNftBoxChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
          <TextField
            id="nftQuantity"
            name="nftQuantity"
            size="small"
            fullWidth
            label="NFTQuantity"
            onChange={handleNftQuantityChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
          <TextField
            id="productName"
            name="productName"
            size="small"
            fullWidth
            label="NFTProductName"
            onChange={handleProductNameChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
          <TextField
            id="productDescription"
            name="productDescription"
            size="small"
            fullWidth
            label="NFTProductDescription"
            onChange={handleProductDescriptionChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
          <TextField
            id="nftBasicIngredients"
            name="nftBasicIngredients"
            select
            size="small"
            fullWidth
            label="NFTBasicIngredients"
            defaultValue=""
            value={nftBasicIngredientID}
            onChange={handleNFTBasicIngredientChange}
            required
            sx={{ mb: 1, mt: 1 }}
          >
            {nftBasicIngredients.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', gap: '1rem' }} required>
            <TextField
              margin="normal"
              required
              fullWidth
              name="file"
              id="file"
              placeholder={'NFTLeaflet (XML file with tags for any languages available)'}
              size="small"
              sx={{ mb: 1, mt: 1 }}
            />
            <Button variant="contained" component="label" sx={{ mt: 1, mb: 1, pt: 0, pb: 0 }}>
              Upload
              <input hidden accept=".xml" type="file" name="fileUpload" onChange={onChangeFile} />
            </Button>
          </Box>
        </>
      )}
      {customerRole === roles[2] && (
        <>
          <Title>NFT re-boxing</Title>
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
            {/* {productName.map((lot) => (
              <MenuItem key={lot.id} value={lot.id}>
                {lot.name}
              </MenuItem>
            ))} */}
          </TextField>
          <TextField
            id="nftBox"
            name="nftBox"
            select
            size="small"
            fullWidth
            label="NFTLotNumber"
            defaultValue=""
            onChange={handleChangeHash}
            required
            sx={{ mb: 1, mt: 1 }}
          >
            {/* {box.map((box) => (
              <MenuItem key={box.index} value={box.hash}>
                {box.hash}
              </MenuItem>
            ))} */}
          </TextField>
          <TextField
            id="nftReboxedQuantity"
            name="nftReboxedQuantity"
            size="small"
            fullWidth
            label="NFTReboxedQuantity"
            value={nftReboxedQuantity}
            onChange={handleNftReboxedQuantityChange}
            required
            sx={{ mb: 1, mt: 1 }}
          />
        </>
      )}
      <DateInput
        customerRole={customerRole}
        roles={roles}
        handleExpiringDateChange={handleExpiringDateChange}
        expiringDate={expiringDate}
      />
    </>
  );
}
