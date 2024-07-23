import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const BillTable = ({ bills, reload }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [billList, setBillList] = useState(bills);

  useEffect(() => {
    setBillList(bills);
    console.log(bills);
  }, [bills]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - billList.length) : 0;

  const displayRows = rowsPerPage > 0 ? billList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : billList;

  return (
    <TableContainer component={Paper} sx={{  display: 'flex', flexDirection: 'column' }}>
      <Table stickyHeader aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Bill ID</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Customer ID</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Publish Day</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Total Cost</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Cash Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayRows.map((bill) => (
            <TableRow key={bill.billId}>
              <TableCell>{bill.billId}</TableCell>
              <TableCell align="right">{bill.customerId}</TableCell>
              <TableCell align="right">{bill.publishDay}</TableCell>
              <TableCell align="right">{bill.totalCost}</TableCell>
              <TableCell align="right">{bill.cashier.cashNumber}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
          {billList.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No bills found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={billList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </TableContainer>
  );
};

BillTable.propTypes = {
    bills: PropTypes.array.isRequired,
    reload: PropTypes.func.isRequired,
  };
  
  export default BillTable;
  
