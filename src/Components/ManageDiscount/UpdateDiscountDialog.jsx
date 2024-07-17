import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDiscountDialog = ({ openDialog, handleCloseDialog, onUpdateDiscount, formData, setFormData }) => {
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

  const handleUpdateDiscount = async () => {
    const requiredFields = ['discountId', 'expiredDay', 'publishDay', 'cost'];
    console.log('Form Data:', formData);

    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const updatedFormData = {
      ...formData,
      expiredDay: new Date(formData.expiredDay).toISOString().split('T')[0],
      publishDay: new Date(formData.publishDay).toISOString().split('T')[0],
    };

    try {
      await onUpdateDiscount(updatedFormData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating discount:', error);
      toast.error('Error updating discount.');
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Discount</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="discountId"
            label="Discount ID"
            value={formData.discountId || ''}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="expiredDay"
            label="Expired Day"
            type="date"
            value={formData.expiredDay ? formData.expiredDay.slice(0, 10) : ''}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="publishDay"
            label="Publish Day"
            type="date"
            value={formData.publishDay ? formData.publishDay.slice(0, 10) : ''}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cost"
            label="Cost"
            type="number"
            value={formData.cost || 0}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateDiscount} variant="contained" autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UpdateDiscountDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  onUpdateDiscount: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default UpdateDiscountDialog;
