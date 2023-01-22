import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { styled } from '@mui/material/styles';
import { headCellsNftTableData } from '../helpers/nftTableData';
import { customerTableColors } from '../helpers/customerTableColors';

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

export default function NftCreationTable({
  roleValue,
  customers,
  onCustomerSelect,
  customerName,
  roles,
}) {
  function onCustomerClick(event) {
    const customerName = event.target.closest('tr').firstChild.innerText;
    const customerItem = customers.find((elem) => Object.values(elem).includes(customerName));
    const customerId = customerItem.id;
    onCustomerSelect(customerName, customerId);
  }

  return (
    <React.Fragment>
      <Title>
        {Array.isArray(roles) &&
          roles.includes('supplier') &&
          !roles.includes('reseller') &&
          'Select the NFT issuer'}
        {Array.isArray(roles) &&
          !roles.includes('supplier') &&
          roles.includes('reseller') &&
          'Select the customer'}
        {Array.isArray(roles) &&
          !roles.includes('supplier') &&
          roles.includes('reseller') &&
          'Select the NFT owner/author'}
        {!Array.isArray(roles) && roleValue === 'supplier' && 'Select supplier'}
        {!Array.isArray(roles) && roleValue === 'producer' && 'Select producer'}
      </Title>
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
          {roleValue && filterCustomers(customers, roleValue, onCustomerClick, customerName)}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
