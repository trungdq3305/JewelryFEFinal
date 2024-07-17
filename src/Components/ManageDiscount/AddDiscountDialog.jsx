import { useState } from 'react';
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

const AddDiscountDialog = ({ openDialog, handleCloseDialog, onAddDiscount, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddNewDiscount = () => {
    const requiredFields = ['expiredDay', 'publishDay', 'cost'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      toast.warn('Please fill in all required fields.');
      return;
    }

    onAddDiscount(formData);
    setFormData(initialFormData); 
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add Discount</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          required
          fullWidth
          name="publishDay"
          label="Publish Day"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.publishDay}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="expiredDay"
          label="Expired Day"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.expiredDay}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddNewDiscount} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDiscountDialog;
