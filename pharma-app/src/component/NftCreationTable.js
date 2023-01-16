import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { styled } from '@mui/material/styles';
import { headCellsNftTableData } from '../helpers/nftTableData';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
}));

function filterCustomers(array, role) {
  return array
    .filter((customer) => {
      return customer.role === role;
    })
    .map((filteredCustomer) => {
      console.log(filteredCustomer);
      return (
        <StyledTableRow key={filteredCustomer.name}>
          <StyledTableCell>{filteredCustomer.name}</StyledTableCell>
          <StyledTableCell>{filteredCustomer.country}</StyledTableCell>
          <StyledTableCell>{filteredCustomer.representative_email}</StyledTableCell>
          <StyledTableCell>{filteredCustomer?.representative_phone}</StyledTableCell>
          <StyledTableCell>{filteredCustomer.wallet}</StyledTableCell>
        </StyledTableRow>
      );
    });
}

export default function NftCreationTable({ roleValue, customers }) {
  return (
    <React.Fragment>
      <Title>Select the NFT issuer</Title>
      <Table
        size="small"
        sx={{
          border: '1px solid grey',
          borderRadius: '5px',
          borderCollapse: 'inherit',
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
        <TableBody>{roleValue && filterCustomers(customers, roleValue)}</TableBody>
      </Table>
    </React.Fragment>
  );
}
