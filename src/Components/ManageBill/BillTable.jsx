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
  Modal,
  Typography,
  Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { format } from 'date-fns';

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
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

  const handleCustomerClick = (customerId) => {
    const customer = billList.find(bill => bill.customerId === customerId)?.customer;
    setSelectedCustomer(customer);
  };

  const handleCloseCustomerModal = () => {
    setSelectedCustomer(null);
  };

  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - billList.length) : 0;

  const displayRows = rowsPerPage > 0 ? billList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : billList;

  return (
    <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Table stickyHeader aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Bill ID</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Customer ID</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Publish Day</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Total Cost</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Cash Number</TableCell>
            <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayRows.map((bill) => (
            <TableRow key={bill.billId}>
              <TableCell>{bill.billId}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleCustomerClick(bill.customerId)}>
                  {bill.customerId}
                </Button>
              </TableCell>
              <TableCell align="right">{format(new Date(bill.publishDay), 'dd-MM-yyyy HH:mm:ss')}</TableCell>
              <TableCell align="right">{bill.totalCost}</TableCell>
              <TableCell align="right">{bill.cashier.cashNumber}</TableCell>
              <TableCell align="right">
                {bill.payment === 1 ? 'Pay by Cash' : 'Pay by Card'}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          {billList.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No bills found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={billList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      <Modal
        open={!!selectedCustomer}
        onClose={handleCloseCustomerModal}
        aria-labelledby="customer-details-title"
        aria-describedby="customer-details-description"
      >
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 1, maxWidth: 400, margin: 'auto', mt: 5 }}>
          {selectedCustomer && (
            <>
              <Typography id="customer-details-title" variant="h6" component="h2">
                Customer Details
              </Typography>
              <Typography id="customer-details-description" sx={{ mt: 2 }}>
                <strong>Full Name:</strong> {selectedCustomer.fullName}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Date of Birth:</strong> {format(new Date(selectedCustomer.doB), 'dd-MM-yyyy')}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Address:</strong> {selectedCustomer.address}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Email:</strong> {selectedCustomer.email}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Phone:</strong> {selectedCustomer.phone}
              </Typography>
              <Button onClick={handleCloseCustomerModal} variant="contained" color="primary" sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
};

BillTable.propTypes = {
  bills: PropTypes.array.isRequired,
  reload: PropTypes.func.isRequired,
};

export default BillTable;
