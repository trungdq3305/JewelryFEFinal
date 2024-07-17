import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Snackbar,
} from '@mui/material'
const GoldTable = ({ goldList, handleFetchGold }) => {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Id
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Name
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Purchase price
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                SalePrice
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                World price
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Modified By
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Modified Date
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Kara
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Gold Percent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goldList.map((gold, index) => (
              <TableRow key={index}>
                <TableCell>{gold.goldId}</TableCell>
                <TableCell>{gold.goldName}</TableCell>
                <TableCell align="right">
                  {gold.purchasePrice
                    ? Number(gold.purchasePrice).toLocaleString('en')
                    : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {gold.salePrice
                    ? Number(gold.salePrice).toLocaleString('en')
                    : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {gold.worldPrice
                    ? Number(gold.worldPrice).toLocaleString('en')
                    : 'N/A'}
                </TableCell>
                <TableCell align="right">{gold.modifiedBy}</TableCell>
                <TableCell align="right">
                  {new Date(gold.modifiedDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{gold.kara || 'N/A'}</TableCell>
                <TableCell align="right">{gold.goldPercent || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
      <Button
        onClick={handleFetchGold}
        variant="contained"
        sx={{
          background: 'black',
          color: '#ffdbf0',
          marginTop: '10px',
          '&:hover': {
            backgroundColor: '#ffdbf0',
            color: 'black',
          },
        }}
      >
        Get Gold Price
      </Button>
    </>
  )
}

export default GoldTable
