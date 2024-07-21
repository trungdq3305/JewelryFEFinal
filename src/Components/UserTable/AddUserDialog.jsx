import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, MenuItem, Select, FormControl, InputLabel, Button, Paper } from '@mui/material'

const roleMapping = [
  { id: 1, label: 'Staff' },
  { id: 2, label: 'Manager' },
  { id: 3, label: 'Admin' }
]

const AddUserDialog = ({ openDialog, handleCloseDialog, onAddUser, initialFormData, roleMapping }) => {
  const [formData, setFormData] = useState(initialFormData)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }
  const handleAddUser = () => {
    if (validateFormData()) {
      const roleItem = roleMapping.find(item => item.label === formData.role);
      const roleValue = roleItem ? roleItem.id : ''
      onAddUser({ ...formData, role: roleValue })
      setFormData(initialFormData)
    } else {
      alert('Please fill in all required fields.');
    }
  };
  const validateFormData = () => {
    const requiredFields = ['fullName', 'role', 'phone', 'doB', 'address'];
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
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {
                roleMapping.map(item =>
                  <MenuItem key={item.id} value={item.label}>
                    {item.label}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone number"
            type="text"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="doB"
            label="Date of birth"
            type='date'
            value={formData.doB}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}

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
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddUser} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddUserDialog