import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import EditVoucherDialog from './EditVoucherDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { deleteVoucher, editVoucher } from '../../Configs/axios'
import CustomerInfoDialog from './CustomerInfoDialog'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

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
  )
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const initialFormData = {
  createdBy: '',
  expiredDay: '',
  publishedDay: '',
  cost: '',
  customerCustomerId: '',
}

const initialSearchFormData = {
  customerId: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  expiredDay: '',
  expiredMonth: '',
  expiredYear: '',
}

const VoucherTable = ({ vouchers, reloadVouchers }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState(initialFormData)
  const [openCustomerInfoDialog, setOpenCustomerInfoDialog] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({})
  const [deleteSuccess, setDeleteSuccess] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [searchFormData, setSearchFormData] = useState(initialSearchFormData)
  const [searchResults, setSearchResults] = useState([])

  const handleShowCustomerInfo = (voucher) => {
    setCustomerInfo(voucher.customerCustomer)
    setOpenCustomerInfoDialog(true)
  }

  const handleCloseCustomerInfoDialog = () => {
    setOpenCustomerInfoDialog(false)
  }

  const handleEdit = (voucher) => {
    handleOpenDialog()

    setEditData({
      ...initialFormData,
      ...voucher,
    })
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vouchers.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDelete = async (voucherId) => {
    try {
      await deleteVoucher(voucherId)
      setDeleteSuccess(true)
      setOpenSnackbar(true)
      reloadVouchers() // Reload vouchers after deleting
      console.log(`Voucher ${voucherId} deleted successfully`)
    } catch (error) {
      setDeleteSuccess(false)
      setOpenSnackbar(true)
      console.error('Error deleting voucher:', error)
    } finally {
      setPage(0) // Reset the page to 0
      setRowsPerPage(5) // Reset the rows per page to 5
    }
  }
  const buttonStyle = {
    width: '100%', // Adjust the width as needed
    margin: '5px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleEditVoucher = async (formData) => {
    const requiredFields = [
      'createdBy',
      'expiredDay',
      'publishedDay',
      'cost',
      'customerCustomerId',
    ]
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field])
    console.log(isAnyFieldEmpty)
    console.log(formData)
    // if (isAnyFieldEmpty) {
    //   window.alert('Please fill out all required fields.')
    //   return
    // }
    try {
      const result = await editVoucher(formData)
      console.log(result)
      handleCloseDialog()
      reloadVouchers() // Reload vouchers after editing
    } catch (error) {
      console.error('Error editing voucher:', error)
      // Handle error state or display error message to user
    }
  }

  const voucherList = Array.isArray(vouchers) ? vouchers : []

  return (
    <>
      <EditVoucherDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditVoucher={handleEditVoucher}
        formData={editData}
        setFormData={setEditData}
      />
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={deleteSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {deleteSuccess ? 'Voucher deleted successfully!' : 'Error deleting voucher.'}
        </Alert>
      </Snackbar>
      <TableContainer component={Paper} sx={{  display: 'flex', flexDirection: 'column' }}>
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
          <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {(rowsPerPage > 0
              ? voucherList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : voucherList
            ).map((voucher) => (
              <TableRow key={voucher.voucherId}>
                <TableCell component="th" scope="row" style={{ width: 50 }}>
                  {voucher.voucherId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {voucher.createdBy}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {voucher.expiredDay}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {voucher.publishedDay}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {voucher.cost}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {voucher.customerCustomerId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Button onClick={() => handleEdit(voucher)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: '#FFA500', 
                      border: '1px solid #FFA500',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: '#FFA500',
                      },
                    }}>Edit</Button>
                  <Button onClick={() => handleShowCustomerInfo(voucher)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: '#2596be', 
                      border: '1px solid #2596be',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: '2596be',
                      },
                    }}>Customer</Button>
                  <Button onClick={() => handleDelete(voucher.voucherId)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: 'red', 
                      border: '1px solid red',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'red',
                      },
                    }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={11}
                count={voucherList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <CustomerInfoDialog
        open={openCustomerInfoDialog}
        onClose={handleCloseCustomerInfoDialog}
        customerInfo={customerInfo}
      />
    </>
  )
}
VoucherTable.propTypes = {
  vouchers: PropTypes.array.isRequired,
  reloadVouchers: PropTypes.func.isRequired, // Add this line
}

export default VoucherTable
