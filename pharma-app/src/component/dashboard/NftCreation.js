import Paper from '@mui/material/Paper';
import { Box, Divider } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useRef, useState } from 'react';
import { nftCreationCustomerRoles } from '../../helpers/customerRoles';
import NftSelect from '../NftSelect';
import useAlert from '../../hooks/useAlert';
import IngredientAPI from '../../services/ingredient.api.services';
import LotAPI from '../../services/lot.api.service';
import BoxAPI from '../../services/box.api.service';
import createLotData from '../../helpers/createLotData';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

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
    setExpiringDate(value.toISOString());
  }

  const ingredientData = {
    customer: customerId,
    name: ingredientName,
    description: ingredientDescription,
    expires: expiringDate,
    quantity: 100,
  };

  // Producer

  const [nftQuantity, setNftQuantity] = useState(null);
  const [nftProductName, setNftProductName] = useState();
  const [productDescription, setProductDescription] = useState('');
  const [nftBasicIngredientID, setNftBasicIngredientID] = useState([]);
  const [uploadFile, setUploadFile] = useState('');

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

  // Distributor

  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [countryCode, setCountryCode] = useState('');

  function handleChangeLot(event) {
    if (!event.target.value) setHash(null);
    setLot(event.target.value);
  }
  function handleChangeHash(event) {
    setHash(event.target.value);
  }
  function handleCountrySelection(event, newValue) {
    setCountryCode(newValue);
  }

  const reboxData = {
    customer: customerId,
    expires: expiringDate,
    country: countryCode ? countryCode.code : '',
  };

  // Submit

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
        await LotAPI.postLot(createLotData(customerId, data, expiringDate, nftBasicIngredientID));
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
      setNftQuantity(null);
      setNftProductName('');
      setProductDescription('');
      setNftBasicIngredientID([]);
      setUploadFile('');
    } else if (customerRole === nftCreationCustomerRoles[2]) {
      setCountryCode('');
      setLot('');
      setHash('');
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
        />
        <LoadingButton
          sx={{ mt: 1 }}
          type="submit"
          fullWidth
          endIcon={<SendIcon />}
          loading={disabled}
          loadingPosition="end"
          variant="contained"
          disabled={disabled}
        >
          <span>NFT GENERATION</span>
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default NftCreation;
