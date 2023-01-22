import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useRef, useState, useEffect } from 'react';
import { nftBurningCustomerRoles } from '../../helpers/customerRoles';
import useAlert from '../../hooks/useAlert';
import BoxAPI from '../../services/box.api.service';
import LotAPI from '../../services/lot.api.service';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import SelectProductName from '../SelectProductName';
import Title from '../Title';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const baseURL = process.env.REACT_APP_BASE_URL;

const NftBurning = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [contextId, setContextId] = useState(null);
  const [customerRole, setCustomerRole] = useState(nftBurningCustomerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);

  function handleChangeLot(event, newValue) {
    if (!newValue) {
      setHash(null);
    }
    setLot(newValue);
  }

  function handleChangeHash(event, newValue) {
    setHash(newValue);
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
      setLoadingProduct(true);
      LotAPI.getProductNameById(customerId)
        .then((result) => {
          setProductName(result.items);
          setLoadingProduct(false);
        })
        .catch((err) => {
          showErrorAlert(err.response.data.message);
          setLoadingProduct(false);
        });
    }
  }, [customerId, showErrorAlert]);

  useEffect(() => {
    if (lot) {
      BoxAPI.getBoxByLotAndCustomerID(lot.id, customerId, 2)
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
      BoxAPI.getBoxImage(hash.hash).catch((err) => {
        showErrorAlert(err.response.data.message);
      });
    }
  }, [hash, showErrorAlert]);

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    if (hash) {
      try {
        await BoxAPI.burn(hash.hash, hash.customer);
        showSuccessAlert('NFT successfully burned');
        cleanUp();
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    }
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
          roles={nftBurningCustomerRoles}
        />
        <Title sx={{ mb: 1, mt: 2 }}>Select a specific NFT</Title>
        <SelectProductName
          handleChangeLot={handleChangeLot}
          handleChangeHash={handleChangeHash}
          productName={productName}
          box={box}
          lot={lot}
          loadingProduct={loadingProduct}
        ></SelectProductName>
        {hash && (
          <Card sx={{ maxWidth: 185, margin: '0 auto' }}>
            <CardMedia
              component="img"
              width="164"
              height="164"
              image={`${baseURL}/box/${hash.hash}/qr`}
              alt="QR"
            />
          </Card>
        )}
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
          <span>BURN</span>
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default NftBurning;
