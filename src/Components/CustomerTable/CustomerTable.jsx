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
  Button,
  Box,
  TablePagination,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditCustomerDialog from './EditCustomerDialog';
import CustomerBillDialog from './CustomerBillDialog';
import { editCustomer, updateCustomerStatus } from '../../Configs/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const initialFormData = {
  fullName: '',
  doB: '',
  address: '',
  email: '',
  phone: '',
  point: '',
  rate: '',
};

const CustomerTable = ({ customers, reloadCustomers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(initialFormData);
  const [openBillDialog, setOpenBillDialog] = useState(false);
  const [bills, setBills] = useState([]);
  const [customerList, setCustomerList] = useState(customers);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  const handleEdit = (discount) => {
    setEditData(discount);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditCustomer = async (formData) => {
    try {
      await editCustomer(formData);
      toast.success(`Customer ${formData.customerId} updated successfully`);
      handleCloseDialog();
      reloadCustomers();
    } catch (error) {
      toast.error('Error updating customer.');
      console.error('Error editing customer:', error);
    }
  };

  const handleChangeStatus = async (customerId) => {
    try {
      await updateCustomerStatus(customerId);
      toast.success('Updating status successfully');
      reloadCustomers();
    } catch (error) {
      toast.error('Error updating status.');
      console.error('Error updating status:', error);
    }
  };

  const handleShowBills = (customer) => {
    setBills(customer.bills);
    setOpenBillDialog(true);
  };

  const buttonStyle = {
    width: '100%',
    margin: '5px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - customerList.length) : 0;

  const displayRows = rowsPerPage > 0 ? customerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : customerList;

  return (
    <>
      <EditCustomerDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditCustomer={handleEditCustomer}
        formData={editData}
        setFormData={setEditData}
      />
      <CustomerBillDialog
        open={openBillDialog}
        onClose={() => setOpenBillDialog(false)}
        bills={bills}
      />
      <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Birth</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Point</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Rate</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((customer) => (
              <TableRow key={customer.customerId}>
                <TableCell>{customer.customerId}</TableCell>
                <TableCell align="right">{customer.fullName}</TableCell>
                <TableCell align="right">{customer.doB}</TableCell>
                <TableCell align="right">{customer.address}</TableCell>
                <TableCell align="right">{customer.email}</TableCell>
                <TableCell align="right">{customer.phone}</TableCell>
                <TableCell align="right">{customer.point}</TableCell>
                <TableCell align="right">{customer.rate}</TableCell>
                <TableCell align="right">{customer.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleEdit(customer)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: '#FFA500',
                      border: '1px solid #FFA500',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: '#FFA500',
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleChangeStatus(customer.customerId)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: 'green',
                      border: '1px solid green',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'green',
                      },
                    }}
                  >
                    Change Status
                  </Button>
                  <Button
                    onClick={() => handleShowBills(customer)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: '#007BFF',
                      border: '1px solid #007BFF',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: '#007BFF',
                      },
                    }}
                  >
                    Show Bills
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={10} />
              </TableRow>
            )}
            {customerList.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={customerList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  reloadCustomers: PropTypes.func.isRequired,
};

export default CustomerTable;
