import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddVoucherDialog = ({ openDialog, handleCloseDialog, onAddVoucher, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddVoucher = () => {
    const requiredFields = ['cost', 'customerCustomerId', 'expiredDay', 'publishedDay'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      toast.warn('Please fill in all required fields');
      return;
    }

    const formattedFormData = {
      ...formData,
      expiredDay: new Date(formData.expiredDay).toISOString(),
      publishedDay: new Date(formData.publishedDay).toISOString(),
    };

    onAddVoucher(formattedFormData);
    setFormData(initialFormData);
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add Voucher</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          required
          fullWidth
          name="customerCustomerId"
          label="Customer ID"
          value={formData.customerCustomerId}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="cost"
          label="Cost ( > 100000 )"
          value={formData.cost}
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
          value={formData.expiredDay}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="publishedDay"
          label="Published Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.publishedDay}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddVoucher} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddVoucherDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  onAddVoucher: PropTypes.func.isRequired,
  initialFormData: PropTypes.object.isRequired,
};

export default AddVoucherDialog;
