import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Paper, FormControl, Select, MenuItem,InputLabel } from '@mui/material'


const AddCashierDialog = ({ openDialog, handleCloseDialog, onAddCashier, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }
  const handleAddCashier = () => {
    if (validateFormData()) {
      onAddCashier(formData)
      setFormData(initialFormData)
    } else {
      alert('Please fill in all required fields.');

    }
  };
  const validateFormData = () => {
    const requiredFields = ['startCash', 'endCash', 'cashNumber', 'userId'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false
      }
    }
    return true
  }

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="startCash"
            label="Start Date"
            type="datetime-local"
            value={formData.startCash}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="endCash"
            label="End Date"
            type="datetime-local"
            value={formData.endCash}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}

          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Cashier Number</InputLabel>
            <Select
              name="cashNumber"
              value={formData.cashNumber}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="userId"
            label="User Id"
            value={formData.userId}
            onChange={handleChange}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddCashier} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog >
  )
}
export default AddCashierDialog