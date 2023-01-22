import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useRef, useState, useEffect } from 'react';
import { nftRequestTransferOwnerRoles } from '../../helpers/customerRoles';
import { nftRequestTransferDistRoles } from '../../helpers/customerRoles';
import useAlert from '../../hooks/useAlert';
import BoxAPI from '../../services/box.api.service';
import LotAPI from '../../services/lot.api.service';
import CustomerAPI from '../../services/customer.api.service';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import SelectProductName from '../SelectProductName';
import Title from '../Title';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import transformToUpperCase from '../../helpers/transformToUpperCase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { headCellsNftTableData } from '../../helpers/nftTableData';
import { customerTableColors } from '../../helpers/customerTableColors';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const baseURL = process.env.REACT_APP_BASE_URL;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: customerTableColors.backgroundColorHead,
  },
  [`&.${tableCellClasses.body}:nth-of-type(even)`]: {
    textAlign: 'right',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: customerTableColors.backgroundHoverRow,
  },
  '&:active': {
    backgroundColor: customerTableColors.backgroundActiveRow,
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: customerTableColors.backgroundSelectedRow,
  },
}));

function filterCustomers(array, role, onCustomerClick, customerName) {
  return array
    .filter((customer) => {
      return customer.role === role;
    })
    .map((filteredCustomer) => {
      return (
        <StyledTableRow
          key={filteredCustomer.name}
          onClick={onCustomerClick}
          selected={customerName === filteredCustomer.name}
        >
          <StyledTableCell>{filteredCustomer.name}</StyledTableCell>
          <StyledTableCell>{filteredCustomer.country}</StyledTableCell>
          <StyledTableCell>{filteredCustomer.representative_email}</StyledTableCell>
          <StyledTableCell>{filteredCustomer?.representative_phone}</StyledTableCell>
          <StyledTableCell>{filteredCustomer.wallet}</StyledTableCell>
        </StyledTableRow>
      );
    });
}

const NftSelling = () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [contextId, setContextId] = useState(null);
  const [distContextId, setDistContextId] = useState(null);
  const [customerRole, setCustomerRole] = useState(nftRequestTransferOwnerRoles[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [lot, setLot] = useState('');
  const [hash, setHash] = useState('');
  const [productName, setProductName] = useState([]);
  const [box, setBox] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [distRole, setDistRole] = useState(nftRequestTransferDistRoles[0]);
  const [distName, setDistName] = useState('');
  const [distId, setDistId] = useState('');
  const [customers, setCustomers] = useState([]);

  function onCustomerClick(event) {
    const distName = event.target.closest('tr').firstChild.innerText;
    const distItem = customers.find((elem) => Object.values(elem).includes(distName));
    const distId = distItem.id;
    onDistSelect(distName, distId);
  }

  function onDistSelect(name, id) {
    setDistName(name);
    setDistId(id);
  }

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

  function onDistRoleChange(event) {
    setDistRole(event.target.value);
  }

  function handleContextSelection(id) {
    setContextId(id);
    setDistContextId(id);
  }

  function onCustomerSelect(name, id) {
    setCustomerName(name);
    setCustomerId(id);
  }

  useEffect(() => {
    if (distContextId) {
      setDisabled(true);
      CustomerAPI.getCustomer(distContextId, distRole)
        .then((result) => {
          setCustomers(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
      setDisabled(false);
    }
  }, [distId, distRole, setDisabled, showErrorAlert]);

  useEffect(() => {
    if (customerId) {
      setLoadingProduct(true);
      LotAPI.getProductNameById(customerId)
        .then((result) => {
          setProductName(result.items);
        })
        .catch((err) => showErrorAlert(err.response.data.message));
      setLoadingProduct(false);
    }
  }, [customerId, showErrorAlert]);

  useEffect(() => {
    if (lot) {
      BoxAPI.getBoxByLotAndCustomerID(lot.id, customerId, 1)
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
        await BoxAPI.transfer(hash.hash, hash.customer, distId);
        showSuccessAlert('NFT successfully transfer');
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
          roles={nftRequestTransferOwnerRoles}
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
        <Title sx={{ mb: 1, mt: 2 }}>Select NFT destination</Title>
        <FormControl sx={{ mt: 2, mb: 2 }}>
          <FormLabel id="row-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label"
            defaultValue={distRole}
            value={distRole}
            name="distRoles"
            onChange={onDistRoleChange}
          >
            {nftRequestTransferDistRoles.map((item) => {
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={transformToUpperCase(item)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <Table
          size="small"
          sx={{
            border: '1px solid grey',
            borderRadius: '5px',
            borderCollapse: 'inherit',
            mt: 2,
            mb: 3,
          }}
        >
          <TableHead>
            <TableRow>
              {headCellsNftTableData.map((cell) => (
                <StyledTableCell
                  key={cell.id}
                  align={'left'}
                  padding={'normal'}
                  // sortDirection={orderBy === headCell.id ? order : false}
                >
                  {cell.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {distRole && filterCustomers(customers, distRole, onCustomerClick, distName)}
          </TableBody>
        </Table>
        <LoadingButton
          sx={{ mt: 2 }}
          type="submit"
          fullWidth
          endIcon={<SendIcon />}
          loading={disabled}
          loadingPosition="end"
          variant="contained"
          disabled={disabled}
        >
          <span>TRANSFER NFT</span>
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default NftSelling;
