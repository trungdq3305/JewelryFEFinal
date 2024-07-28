import { useEffect } from 'react'
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCustomerDialog = ({
  openDialog,
  handleCloseDialog,
  onEditCustomer,
  formData,
  setFormData,
}) => {
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

  const handleEditCustomer = async() => {
    const requiredFields = [
      'fullName',
      'doB',
      'address',
      'email',
      'phone',
      'point',
      'rate',
    ]
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const updatedFormData = {
      ...formData,
      doB: new Date(formData.doB).toISOString().split('T')[0],
    };

    try {
      await onEditCustomer(updatedFormData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error updating customer.');
    }
  };


  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="doB"
            label="Date of birth"
            type="date"
            value={formData.doB ? formData.doB.slice(0, 10) : ''}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="point"
              label="Point"
              value={formData.point}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="rate"
              label="Rate"
              value={formData.rate}
              onChange={handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditCustomer} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
EditCustomerDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  onEditCustomer: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default EditCustomerDialog
