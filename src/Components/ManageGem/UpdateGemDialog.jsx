import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const UpdateGemDialog = ({
  openDialog,
  handleCloseDialog,
  onUpdateGem,
  formData,
  setFormData,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleUpdateGem = async () => {
    const requiredFields = ['name', 'type', 'price', 'rate']
    const isFormValid = requiredFields.every(
      (field) => formData[field] !== '' && formData[field] !== undefined
    )

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.')
      setSnackbarOpen(true)
      return
    }

    try {
      await onUpdateGem(formData)
      setSnackbarMessage('Gem updated successfully!')
      setSnackbarOpen(true)
      handleCloseDialog()
    } catch (error) {
      console.error('Error updating gem:', error)
      setSnackbarMessage('Error updating gem.')
      setSnackbarOpen(true)
    }
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Gem</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="gemId"
            label="Gem ID"
            value={formData.gemId}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              fullWidth
              value={formData.type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value={1}>Type 1</MenuItem>
              <MenuItem value={2}>Type 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="desc"
            label="Description"
            value={formData.desc}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="rate"
            label="Rate"
            type="number"
            value={formData.rate}
            onChange={handleChange}
            inputProps={{ step: '0.1' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateGem} variant="contained" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateGemDialog
