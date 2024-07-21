import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper } from '@mui/material';

const AddProductDialog = ({ openDialog, handleCloseDialog, onAddProduct, initialFormData, goldData }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [propChecks, setPropChecks] = useState({
    additionalProp1: false,
    additionalProp2: false,
    additionalProp3: false
  });

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [mainKey, subKey] = name.split('.');

    const isNumericField = ['machiningCost', 'amount', 'gem.additionalProp2', 'gem.additionalProp3'].includes(name);
    const isDecimalField = ['weight', 'size', 'markupRate'].includes(name);

    if (isNumericField && value !== '' && isNaN(value)) {
      return;
    }

    if (isDecimalField && value !== '' && isNaN(parseFloat(value))) {
      return;
    }

    const parsedValue = isNumericField ? parseInt(value, 10) : isDecimalField ? parseFloat(value) : value;

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: parsedValue
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue
      }));
    }
  };

  const handleAddProduct = () => {
    onAddProduct(formData);
    setFormData(initialFormData); // Reset the form
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="productName"
            label="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Necklace">Necklace</MenuItem>
              <MenuItem value="Bracelet">Bracelet</MenuItem>
              <MenuItem value="Ring">Ring</MenuItem>
              <MenuItem value="Charm">Charm</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Material</InputLabel>
            <Select
              name="material"
              value={formData.material}
              onChange={handleChange}
            >
              {goldData && goldData.length > 0 ? (
                goldData.map((gold) => (
                  <MenuItem key={gold.goldId} value={gold.goldName}>{gold.goldName}</MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="weight"
            label="Weight"
            type="text"
            value={formData.weight}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="machiningCost"
            label="Machining Cost"
            type="number"
            value={formData.machiningCost}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="size"
            label="Size"
            type="text"
            value={formData.size}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
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
            name="image"
            label="Image"
            value={formData.image}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="markupRate"
            label="Markup Rate"
            type="text"
            value={formData.markupRate}
            onChange={handleChange}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddProduct} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
