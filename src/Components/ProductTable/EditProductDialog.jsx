import { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Paper, FormControlLabel, Checkbox, InputAdornment
} from '@mui/material';
import { getAllGem, editProduct, updateProductGem } from '../../Configs/axios';
import axios from 'axios';

const EditProductDialog = ({ openDialog, handleCloseDialog, product, onEditProduct, goldData }) => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    category: '',
    material: '',
    weight: '',
    machiningCost: '',
    size: '',
    amount: '',
    desc: '',
    image: '',
    markupRate: ''
  });
  const [propChecks, setPropChecks] = useState({});
  const [gemData, setGemData] = useState([]);
  const [gemAmounts, setGemAmounts] = useState({});

  useEffect(() => {
    const fetchGemData = async () => {
      try {
        const result = await getAllGem();
        if (result.isSuccess) {
          setGemData(result.data);
          const initialPropChecks = result.data.reduce((acc, gem, index) => {
            acc[`gemProp${index + 1}`] = false;
            return acc;
          }, {});
          setPropChecks(initialPropChecks);
        }
      } catch (error) {
        console.error('Error fetching gem data:', error);
      }
    };

    fetchGemData();
  }, []);

  useEffect(() => {
    if (product && goldData.length && gemData.length) {
      const materialGold = goldData.find(gold => gold.goldName === product.material);
      const materialId = materialGold ? materialGold.goldId : '';
      setFormData({
        productId: product.productId,
        productName: product.productName,
        category: product.category,
        material: materialId,
        weight: product.weight,
        machiningCost: product.machiningCost,
        size: product.size,
        amount: product.amount,
        desc: product.desc,
        image: product.image,
        markupRate: product.markupRate
      });

      const initialGemAmounts = {};
      const initialPropChecks = {};

      if (product.productGems && typeof product.productGems === 'object') {
        Object.entries(product.productGems).forEach(([gemName, amount], index) => {
          const gem = gemData.find(g => g.name === gemName);
          if (gem) {
            initialGemAmounts[`gemProp${index + 1}`] = { gemId: gem.gemId, amount: amount.toString() };
            initialPropChecks[`gemProp${index + 1}`] = true;
          }
        });
      }
      setGemAmounts(initialGemAmounts);
      setPropChecks(initialPropChecks);
    }
  }, [product, goldData, gemData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGemChange = (event) => {
    const { name, value } = event.target;
    const propName = name.split('.')[0];
    setGemAmounts((prevAmounts) => ({
      ...prevAmounts,
      [propName]: { ...prevAmounts[propName], gemId: value }
    }));
  };

  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    const propName = name.split('.')[0];
    setGemAmounts((prevAmounts) => ({
      ...prevAmounts,
      [propName]: { ...prevAmounts[propName], amount: value }
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPropChecks((prevChecks) => ({ ...prevChecks, [name]: checked }));
  };

  const handleEditProduct = async () => {
    const editedProduct = {
      ...formData,
      productGems: [{ gemName: 'string' }] // Ensure this matches the API's requirement
    };

    try {
      const response = await editProduct(editedProduct);
      if (response.isSuccess) {
        const formattedGemData = {
          productId: formData.productId,
          gem: Object.keys(gemAmounts).reduce((acc, key) => {
            const gemInfo = gemAmounts[key];
            if (gemInfo.gemId && gemInfo.amount) {
              acc[gemInfo.gemId] = gemInfo.amount.toString(); // Ensure amounts are strings
            }
            return acc;
          }, {})
        };
        const gemResponse = await updateProductGem(formattedGemData);
        if (gemResponse.isSuccess) {
          console.log('Product and gem data updated successfully');
          handleCloseDialog();

          // Handle successful update here
        } else {
          console.error('Error updating product gem:', gemResponse.message || 'Unknown error');
        }
      } else {
        console.error('Error editing product:', response.message || 'Unknown error');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error occurred:', error);
      }
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Paper sx={{ padding: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            name="productId"
            label="Product Id"
            value={formData.productId}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="normal"
            fullWidth
            name="productName"
            label="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Material</InputLabel>
            <Select
              name="material"
              value={formData.material}
              onChange={handleChange}
            >
              {goldData.map((gold) => (
                <MenuItem key={gold.goldId} value={gold.goldId}>{gold.goldName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            name="weight"
            label="Weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">grams</InputAdornment>
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="machiningCost"
            label="Machining Cost"
            type="number"
            value={formData.machiningCost}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="size"
            label="Size"
            value={formData.size}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
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
            fullWidth
            name="image"
            label="Image"
            value={formData.image}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="markupRate"
            label="Markup Rate"
            type="number"
            value={formData.markupRate || ''}
            onChange={handleChange}
          />
          {gemData.map((gem, index) => (
            <div key={gem.gemId}>
              <FormControlLabel
                control={<Checkbox checked={!!propChecks[`gemProp${index + 1}`]} onChange={handleCheckboxChange} name={`gemProp${index + 1}`} />}
                label={`Additional Property ${index + 1}`}
              />
              {propChecks[`gemProp${index + 1}`] && (
                <div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gem Type</InputLabel>
                    <Select
                      name={`gemProp${index + 1}.gemId`}
                      value={gemAmounts[`gemProp${index + 1}`]?.gemId || ''}
                      onChange={handleGemChange}
                    >
                      {gemData.map((g) => (
                        <MenuItem key={g.gemId} value={g.gemId}>{g.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    fullWidth
                    name={`gemProp${index + 1}.amount`}
                    label="Amount"
                    type="number"
                    value={gemAmounts[`gemProp${index + 1}`]?.amount || ''}
                    onChange={handleAmountChange}
                  />
                </div>
              )}
            </div>
          ))}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleEditProduct} color="primary" variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
