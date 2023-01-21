import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useAlert from '../hooks/useAlert';
import Title from './Title';
import DateInput from './DateInput';
import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IngredientAPI from '../services/ingredient.api.services';
import LotAPI from '../services/lot.api.service';
import BoxAPI from '../services/box.api.service';
import FetchingSelect from './FetchingSelect';

const baseURL = process.env.REACT_APP_BASE_URL;

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function NftSelect({
  customerRole,
  roles,
  handleIngredientNameChange,
  handleIngredientDescriptionChange,
  handleExpiringDateChange,
  expiringDate,
  customerId,
  handleNftQuantityChange,
  // handleNftBoxChange,
  handleProductNameChange,
  handleProductDescriptionChange,
  nftBasicIngredientID,
  handleNFTBasicIngredientChange,
  onChangeFile,
  uploadFile,
  handleChangeLot,
  lot,
  hash,
  handleChangeHash,
  // handleNftReboxedQuantityChange,
  handleCountrySelection,
}) {
  const { showErrorAlert } = useAlert();
  const theme = useTheme();

  const [countries, setCountries] = useState([]);
  const [nftBasicIngredients, setNftBasicIngredients] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [boxes, setBoxes] = useState([]);

  function getCountry(country) {
    setCountries(country);
  }

  useEffect(() => {
    if (customerId && customerRole === roles[1]) {
      IngredientAPI.getIngredients(customerId)
        .then((result) => {
          setNftBasicIngredients(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
    } else if (customerId && customerRole === roles[2]) {
      LotAPI.getProductNameById(customerId)
        .then((result) => {
          setProductNames(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
    }
  }, [customerId, customerRole, roles, showErrorAlert]);

  useEffect(() => {
    if (lot) {
      BoxAPI.getBoxByLotAndCustomerID(lot, customerId)
        .then((result) => {
          setBoxes(result.items);
        })
        .catch((err) => {
          showErrorAlert(err.response.data.message);
        });
    }
  }, [customerId, lot, showErrorAlert]);

  useEffect(() => {
    if (hash) {
      BoxAPI.getBoxImage(hash).catch((err) => {
        showErrorAlert(err.response.data.message);
      });
    }
  }, [hash, showErrorAlert]);

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
          {/* <TextField
            id="nftBox"
            name="nftBox"
            size="small"
            fullWidth
            label="NFTBox"
            onChange={handleNftBoxChange}
            required
            sx={{ mb: 1, mt: 1 }}
          /> */}
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
          <FormControl fullWidth sx={{ mb: 1, mt: 1 }} required>
            <InputLabel sx={{ top: '-0.25rem' }} id="multiple-name">
              NFTBasicIngredients
            </InputLabel>
            <Select
              labelId="multiple-name"
              id="nftBasicIngredients"
              name="nftBasicIngredients"
              multiple
              size="small"
              value={nftBasicIngredientID}
              onChange={handleNFTBasicIngredientChange}
              input={<OutlinedInput label="NFTBasicIngredients" />}
            >
              {nftBasicIngredients.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  style={getStyles(item, nftBasicIngredientID, theme)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: '1rem' }} required>
            <TextField
              margin="normal"
              required
              fullWidth
              name="file"
              id="file"
              value={uploadFile}
              label={'NFTLeaflet (XML file with tags for any languages available)'}
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
            id="productNames"
            name="productNames"
            select
            size="small"
            fullWidth
            label="NFTProductName"
            value={lot}
            onChange={handleChangeLot}
            required
            sx={{ mb: 1, mt: 1 }}
          >
            {productNames.map((lot) => (
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
            label="NFTLotNumber"
            value={hash}
            onChange={handleChangeHash}
            required
            sx={{ mb: 1, mt: 1 }}
          >
            {boxes.map((box) => (
              <MenuItem key={box.index} value={box.hash}>
                {box.hash}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField
            id="nftReboxedQuantity"
            name="nftReboxedQuantity"
            size="small"
            fullWidth
            label="NFTReboxedQuantity"
            onChange={handleNftReboxedQuantityChange}
            required
            sx={{ mb: 1, mt: 1 }}
          /> */}
          {hash && (
            <Card sx={{ maxWidth: 185, margin: '0 auto' }}>
              <CardMedia
                component="img"
                width="164"
                height="164"
                image={`${baseURL}/box/${hash}/qr`}
                alt="QR"
              />
            </Card>
          )}
          <FetchingSelect
            id={'country'}
            label={'New Country'}
            type={'getCountry'}
            getItems={getCountry}
            handleSelect={handleCountrySelection}
          ></FetchingSelect>
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
