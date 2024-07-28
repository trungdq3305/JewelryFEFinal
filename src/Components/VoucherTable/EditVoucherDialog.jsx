import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVoucherDialog = ({ openDialog, handleCloseDialog, onEditVoucher, formData, setFormData }) => {
  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [formData, setFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditVoucher = async () => {
    const requiredFields = ['createdBy', 'expiredDay', 'cost', 'customerCustomerId'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const updatedFormData = {
      ...formData,
      expiredDay: new Date(formData.expiredDay).toISOString().split('T')[0],
    };
    try {
       await onEditVoucher(updatedFormData);
        handleCloseDialog(); 
    } catch (error) {
      console.error('Error updating voucher:', error);
      toast.error('Error updating voucher.');
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Voucher</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="createdBy"
              label="Created By"
              value={formData.createdBy}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay"
              label="Expired Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.expiredDay ? formData.expiredDay.slice(0, 10) : ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cost"
              label="Cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="customerCustomerId"
              label="Customer ID"
              value={formData.customerCustomerId}
              onChange={handleChange}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditVoucher} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditVoucherDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  onEditVoucher: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default EditVoucherDialog;
