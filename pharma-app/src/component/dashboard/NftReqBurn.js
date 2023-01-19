import { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import Title from '../Title';
import SelectProductName from '../SelectProductName';
import { nftRequestBurnCustomerRoles } from '../../helpers/customerRoles';
import useAlert from '../../hooks/useAlert';
import BoxAPI from '../../services/box.api.service';
import LotAPI from '../../services/lot.api.service';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const baseURL = process.env.REACT_APP_BASE_URL;

const NftReqBurn = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [contextId, setContextId] = useState(null);
  const [customerRole, setCustomerRole] = useState(nftRequestBurnCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);

  function handleChangeLot(event) {
    const value = event.target.value;
    setLot(value);
  }

  function handleChangeHash(event) {
    const value = event.target.value;
    setHash(value);
  }

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

  useEffect(() => {
    if (customerId) {
      LotAPI.getProductNameById(customerId)
        .then((result) => {
          setProductName(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
    }
  }, [customerId, showErrorAlert]);

  useEffect(() => {
    if (lot) {
      BoxAPI.getBoxByLotAndCustomerID(lot, customerId)
        .then((result) => {
          setBox(result.items);
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

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    // if (customerRole === nftCreationCustomerRoles[0]) {
    try {
      await BoxAPI.freeze(hash);
      showSuccessAlert('Request successfully sent');
      cleanUp();
    } catch (err) {
      showErrorAlert(err.response.data.message);
    }
    // }
    setDisabled(false);
  }
  function cleanUp() {
    form.current.reset();
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
          roles={nftRequestBurnCustomerRoles}
        />
        <Title>Select a specific NFT</Title>
        <SelectProductName
          handleChangeLot={handleChangeLot}
          handleChangeHash={handleChangeHash}
          productName={productName}
          box={box}
        ></SelectProductName>
        {hash && (
          <Card sx={{ maxWidth: 185 }}>
            <CardMedia
              component="img"
              width="164"
              height="164"
              image={`${baseURL}/box/${hash}/qr`}
              alt="QR"
            />
          </Card>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
          REQUEST NFT BURN
        </Button>
      </Box>
    </Paper>
  );
};

export default NftReqBurn;
