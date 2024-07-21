import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import PropTypes from 'prop-types';

const EditProductDialog = ({ openDialog, handleCloseDialog, productData, goldData, onSaveProduct }) => {
  const [formData, setFormData] = useState(productData);

  useEffect(() => {
    setFormData(productData);
  }, [productData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSaveProduct(formData);
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="productName"
          label="Product Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.productName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          value={formData.category}
          onChange={handleChange}
        />
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel>Material</InputLabel>
          <Select
            name="material"
            value={formData.material}
            onChange={handleChange}
          >
            {goldData.map((gold) => (
              <MenuItem key={gold.goldId} value={gold.goldId}>
                {gold.goldName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="weight"
          label="Weight"
          type="text"
          fullWidth
          variant="standard"
          value={formData.weight}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="machiningCost"
          label="Machining Cost"
          type="text"
          fullWidth
          variant="standard"
          value={formData.machiningCost}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="size"
          label="Size"
          type="text"
          fullWidth
          variant="standard"
          value={formData.size}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="text"
          fullWidth
          variant="standard"
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="desc"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={formData.desc}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="image"
          label="Image"
          type="text"
          fullWidth
          variant="standard"
          value={formData.image}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

EditProductDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  productData: PropTypes.object.isRequired,
  goldData: PropTypes.array.isRequired,
  onSaveProduct: PropTypes.func.isRequired,
};

export default EditProductDialog;
