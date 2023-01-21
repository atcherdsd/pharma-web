import Paper from '@mui/material/Paper';
import { Box, Button, Divider } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useRef, useState } from 'react';
import { nftCreationCustomerRoles } from '../../helpers/customerRoles';
import NftSelect from '../NftSelect';
import useAlert from '../../hooks/useAlert';
import IngredientAPI from '../../services/ingredient.api.services';
import LotAPI from '../../services/lot.api.service';
import BoxAPI from '../../services/box.api.service';

const NftCreation = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [contextId, setContextId] = useState(null);
  const [customerRole, setCustomerRole] = useState(nftCreationCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');

  function onRoleChange(event) {
    setCustomerRole(event.target.value);
  }

  function handleContextSelection(id) {
    setContextId(id);
  }

  function onCustomerSelect(name, id) {
    setCustomerName(name);
    setCustomerId(id);
  }

  // Supplier

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientDescription, setIngredientDescription] = useState('');
  const [expiringDate, setExpiringDate] = useState(null);

  function handleIngredientNameChange(event) {
    setIngredientName(event.target.value);
  }
  function handleIngredientDescriptionChange(event) {
    setIngredientDescription(event.target.value);
  }
  function handleExpiringDateChange(value) {
    setExpiringDate(value);
  }

  const ingredientData = {
    customer: customerId,
    name: ingredientName,
    description: ingredientDescription,
    expires: expiringDate,
    quantity: 100,
  };

  // Producer

  // const [nftBox, setNftBox] = useState();
  const [nftQuantity, setNftQuantity] = useState();
  const [nftProductName, setNftProductName] = useState();
  const [productDescription, setProductDescription] = useState('');
  const [nftBasicIngredientID, setNftBasicIngredientID] = useState([]);
  const [uploadFile, setUploadFile] = useState('');

  // function handleNftBoxChange(event) {
  //   setNftBox(event.target.value);
  // }
  function handleNftQuantityChange(event) {
    setNftQuantity(event.target.value);
  }
  function handleProductNameChange(event) {
    setNftProductName(event.target.value);
  }
  function handleProductDescriptionChange(event) {
    setProductDescription(event.target.value);
  }
  function handleNFTBasicIngredientChange(event) {
    const {
      target: { value },
    } = event;
    setNftBasicIngredientID(typeof value === 'string' ? value.split(',') : value);
  }
  function onChangeFile(event) {
    let file = event.target.value;
    let index = file.indexOf('fakepath');
    let fileName = file.slice(index + 9);
    setUploadFile(fileName);
  }

  const lotData = {
    customer: customerId,
    name: nftProductName,
    boxes: nftQuantity,
    description: productDescription,
    expires: expiringDate,
    leaflet: uploadFile,
    ingredients: nftBasicIngredientID,
  };

  // Distributor

  const [countryCode, setCountryCode] = useState('');
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [nftReboxedQuantity, setNftReboxedQuantity] = useState('');

  function handleCountrySelection(code) {
    setCountryCode(code);
  }
  function handleChangeLot(event) {
    setLot(event.target.value);
  }
  function handleChangeHash(event) {
    setHash(event.target.value);
  }
  function handleNftReboxedQuantityChange(event) {
    setNftReboxedQuantity(event.target.value);
  }

  const reboxData = {
    customer: customerId,
    country: countryCode,
    expires: expiringDate,
  };

  // Submit

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    if (customerRole === nftCreationCustomerRoles[0]) {
      try {
        await IngredientAPI.postIngredient(ingredientData);
        showSuccessAlert('NFT successfully generated');
        cleanUp();
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    } else if (customerRole === nftCreationCustomerRoles[1]) {
      try {
        await LotAPI.postLot(lotData);
        showSuccessAlert('NFT successfully generated');
        cleanUp();
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    } else if (customerRole === nftCreationCustomerRoles[2]) {
      try {
        await BoxAPI.rebox(hash, reboxData);
        showSuccessAlert('NFT successfully reboxed');
        cleanUp();
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    }
    setDisabled(false);
  }
  function cleanUp() {
    form.current.reset();
    if (customerRole === nftCreationCustomerRoles[0]) {
      setIngredientName('');
      setIngredientDescription('');
    } else if (customerRole === nftCreationCustomerRoles[1]) {
      // setNftBox('');
      setNftQuantity('');
      setNftProductName('');
      setProductDescription('');
      setNftBasicIngredientID('');
      setUploadFile('');
    } else if (customerRole === nftCreationCustomerRoles[2]) {
      setCountryCode('');
      setLot('');
      setHash('');
      setNftReboxedQuantity('');
    }
    setExpiringDate(null);
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <Box
        component="form"
        noValidate={false}
        sx={{ width: '100%' }}
        ref={form}
        onSubmit={handleSubmit}
      >
        <CustomerSelect
          setDisabled={setDisabled}
          contextId={contextId}
          handleContextSelection={handleContextSelection}
          customerRole={customerRole}
          onRoleChange={onRoleChange}
          onCustomerSelect={onCustomerSelect}
          customerName={customerName}
          roles={nftCreationCustomerRoles}
        />
        <Divider variant="fullWidth" sx={{ mt: 2, mb: 1, borderWidth: '2px' }} />
        <NftSelect
          customerRole={customerRole}
          roles={nftCreationCustomerRoles}
          handleIngredientNameChange={handleIngredientNameChange}
          handleIngredientDescriptionChange={handleIngredientDescriptionChange}
          handleExpiringDateChange={handleExpiringDateChange}
          expiringDate={expiringDate}
          customerId={customerId}
          handleNftQuantityChange={handleNftQuantityChange}
          // handleNftBoxChange={handleNftBoxChange}
          handleProductNameChange={handleProductNameChange}
          handleProductDescriptionChange={handleProductDescriptionChange}
          nftBasicIngredientID={nftBasicIngredientID}
          handleNFTBasicIngredientChange={handleNFTBasicIngredientChange}
          onChangeFile={onChangeFile}
          handleCountrySelection={handleCountrySelection}
          handleChangeLot={handleChangeLot}
          uploadFile={uploadFile}
          lot={lot}
          hash={hash}
          handleChangeHash={handleChangeHash}
          handleNftReboxedQuantityChange={handleNftReboxedQuantityChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
          NFT GENERATION
        </Button>
      </Box>
    </Paper>
  );
};

export default NftCreation;
