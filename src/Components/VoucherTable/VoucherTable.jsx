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
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { deleteVoucher, editVoucher } from '../../Configs/axios';
import EditVoucherDialog from './EditVoucherDialog';
import CustomerInfoDialog from './CustomerInfoDialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
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
  createdBy: '',
  expiredDay: '',
  publishedDay: '',
  cost: '',
  customerCustomerId: '',
};

const VoucherTable = ({ vouchers, reloadVouchers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(initialFormData);
  const [openCustomerInfoDialog, setOpenCustomerInfoDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    setEditData(initialFormData);
  }, [vouchers]);

  const handleShowCustomerInfo = (voucher) => {
    setCustomerInfo(voucher.customerCustomer);
    setOpenCustomerInfoDialog(true);
  };

  const handleCloseCustomerInfoDialog = () => {
    setOpenCustomerInfoDialog(false);
  };

  const handleEdit = (voucher) => {
    setEditData(voucher);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(initialFormData);
  };

  const handleDelete = async (voucherId) => {
    try {
      await deleteVoucher(voucherId);
      toast.success(`Voucher ${voucherId} deleted successfully`);
      reloadVouchers();
    } catch (error) {
      toast.error('Error deleting voucher');
      console.error('Error deleting voucher:', error);
    }
  };

  const handleEditVoucher = async (formData) => {
    try {
      await editVoucher(formData);
      handleCloseDialog();
      reloadVouchers();
      toast.success(`Voucher ${formData.voucherId} updated successfully`);
    } catch (error) {
      toast.error('Error updating voucher');
      console.error('Error updating voucher:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - vouchers.length) : 0;

  const displayRows = rowsPerPage > 0 ? vouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : vouchers;

  return (
    <>
      <EditVoucherDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditVoucher={handleEditVoucher}
        formData={editData}
        setFormData={setEditData}
      />
      <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Id</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Created By</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Expired Day</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Published Day</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Cost</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Customer Id</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((voucher) => (
              <TableRow key={voucher.voucherId}>
                <TableCell>{voucher.voucherId}</TableCell>
                <TableCell align="right">{voucher.createdBy}</TableCell>
                <TableCell align="right">{voucher.expiredDay}</TableCell>
                <TableCell align="right">{voucher.publishedDay}</TableCell>
                <TableCell align="right">{voucher.cost}</TableCell>
                <TableCell align="right">{voucher.customerCustomerId}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleEdit(voucher)}
                    sx={{
                      color: '#FFA500',
                      '&:hover': {
                        color: '#FFA500',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleShowCustomerInfo(voucher)}
                    sx={{
                      color: '#2596be',
                      '&:hover': {
                        color: '#2596be',
                      },
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(voucher.voucherId)}
                    sx={{
                      color: 'red',
                      '&:hover': {
                        color: 'red',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
            {vouchers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No vouchers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={vouchers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
      />
      <CustomerInfoDialog
        open={openCustomerInfoDialog}
        onClose={handleCloseCustomerInfoDialog}
        customerInfo={customerInfo}
      />
    </>
  );
};

VoucherTable.propTypes = {
  vouchers: PropTypes.array.isRequired,
  reloadVouchers: PropTypes.func.isRequired,
};

export default VoucherTable;
