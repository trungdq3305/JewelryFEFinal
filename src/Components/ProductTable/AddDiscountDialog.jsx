import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, Typography } from '@mui/material';
import { getDiscount } from '../../Configs/axios';
const AddDiscountDialog = ({ open, onClose, product, onAddDiscount }) => {
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState('');

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const result = await getDiscount();
        if (result.isSuccess) {
          setDiscounts(result.data);
        }
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchDiscounts();
  }, []);

  const handleAdd = () => {
    onAddDiscount(product.productId, selectedDiscount);
    setSelectedDiscount('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Discount</DialogTitle>
      <DialogContent>
        <Typography>Select a discount:</Typography>
        <Select
          value={selectedDiscount}
          onChange={(e) => setSelectedDiscount(e.target.value)}
          fullWidth
        >
          {discounts.map((discount) => (
            <MenuItem key={discount.discountId} value={discount.discountId}>
              {discount.discountId}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} disabled={!selectedDiscount}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddDiscountDialog;