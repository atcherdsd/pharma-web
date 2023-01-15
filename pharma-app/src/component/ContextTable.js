import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

export default function ContextTable({ contexts, count, isSuccsess, isError }) {
  return (
    <React.Fragment>
      <Title>Currently available business context</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{`Total count: ${count ? count : 'No contexts'}`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isSuccsess &&
            contexts.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          {isError &&
            contexts.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
