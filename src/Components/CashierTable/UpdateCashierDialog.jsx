import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const UpdateCashierDialog = ({ openDialog, handleCloseDialog, onUpdateCashier, formData, users, setFormData}) => {
  const [updatedFormData, setUpdatedFormData] = useState({ ...formData });

  // Format date-time fields for display in input fields
  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return ''; // handle empty or undefined input

    const d = new Date(dateString);
    if (isNaN(d.getTime())) return ''; // handle invalid date input

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const statusMapping = [
    { id: 0, label: 'Deactive' },
    { id: 1, label: 'Active' }
  ];

  // Update local state when formData changes
  useEffect(() => {
    setUpdatedFormData({
      ...formData,
      status: formData.status !== undefined ? formData.status : 0 // Default status to 0 (Deactive) if undefined
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData(formData); // Ensure local state is in sync with props
  }, [formData, setFormData]);

  const handleUpdateCashier = () => {
    onUpdateCashier(updatedFormData);
    console.log(updatedFormData);
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Update Cashier</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="startCash"
            label="Start Cash"
            type="datetime-local"
            value={formatDateTimeLocal(updatedFormData.startCash)}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="endCash"
            label="End Cash"
            type="datetime-local"
            value={formatDateTimeLocal(updatedFormData.endCash)}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Cashier Number</InputLabel>
            <Select
              name="cashNumber"
              value={updatedFormData.cashNumber}
              onChange={handleChange}
              label="Cashier Number"
            >
              {[1, 2, 3, 4].map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>User</InputLabel>
            <Select
              name="userId"
              value={updatedFormData.userId}
              onChange={handleChange}
              label="User"
              MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}  // Setting the max height of the dropdown
            >
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={updatedFormData.status}
              onChange={handleChange}
              label="Status"
            >
              {statusMapping.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleUpdateCashier} variant="contained" autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCashierDialog;
