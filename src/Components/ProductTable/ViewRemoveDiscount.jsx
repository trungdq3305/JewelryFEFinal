import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableContainer,
  TableHead, TableRow, Paper, Box, TablePagination,
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { removeProductDiscount } from '../../Configs/axios';

const ConfirmDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Removal</DialogTitle>
    <DialogContent>
      <DialogContentText>Are you sure you want to remove this discount?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>No</Button>
      <Button onClick={onConfirm}>Yes</Button>
    </DialogActions>
  </Dialog>
);

const DiscountDialog = ({ open, onClose, discounts, product }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);

  const handleRemoveClick = (discountId) => {
    setSelectedDiscountId(discountId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleRemove = async () => {
    if (selectedDiscountId) {
      const data = await removeProductDiscount(selectedDiscountId, product.productId);
      if (data.isSuccess) {
        // Handle successful removal
        setOpenConfirmDialog(false);
        // Optionally refresh the discounts list or handle UI updates here
      } else {
        // Handle error
        console.error(data.message);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Discounts</DialogTitle>
        <DialogContent>
          <Table stickyHeader aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Discount ID</TableCell>
                <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Created By</TableCell>
                <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Expired Day</TableCell>
                <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Publish Day</TableCell>
                <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Cost</TableCell>
                <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts && discounts.length > 0 ? (
                discounts.map((discount, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">{discount.discountId}</TableCell>
                    <TableCell align="right">{discount.createdBy}</TableCell>
                    <TableCell align="right">{discount.expiredDay}</TableCell>
                    <TableCell align="right">{discount.publishDay}</TableCell>
                    <TableCell align="right">{discount.cost}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleRemoveClick(discount.discountId)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No discounts available.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleRemove}
      />
    </>
  );
};

DiscountDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  discounts: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DiscountDialog;
