import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DiscountTable from '../Components/ManageDiscount/DiscountTable';
import { addDiscount, getDiscount } from '../Configs/axios';
import AddDiscountDialog from '../Components/ManageDiscount/AddDiscountDialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header/Header'

const StaffDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState('id');
    const [statusFilter, setStatusFilter] = useState('all'); 
    const [inputValue, setInputValue] = useState('');
    const [searching, setSearching] = useState(false);
  
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
      setSearching(true);
      const transformedSearchParams = {
        [searchCriteria]: inputValue,
        status: statusFilter === 'all' ? undefined : statusFilter, 
      };
  
      try {
        const response = await getDiscount(transformedSearchParams); 
        console.log('Search response data:', response.data);
        setDiscounts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Error searching discounts');
      } finally {
        setSearching(false);
      }
    };
  
    const initialFormData = {
      discountId: '',
      createdBy: '',
      expiredDay: '',
      publishDay: '',
      amount: 0,
      cost: 0,
    };
  
    const loadDiscounts = async () => {
      setLoading(true);
      try {
        const result = await getDiscount(); 
        console.log('Load discounts data:', result.data);
        setDiscounts(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error('Error loading discounts:', error);
        toast.error('Error loading discounts');
      } finally {
        setLoading(false);
      }
    };
  
    const handleAddNewDiscount = async (formData) => {
      try {
        const response = await addDiscount(formData);
        if (response.isSuccess) {
          toast.success('Discount added successfully');
          handleCloseDialog();
          console.log('New discount added successfully:', response.data);
          await loadDiscounts(); 
        } else {
          toast.error(response.message || 'Error adding new discount');
          console.error('Error adding new discount:', response.message);
        }
      } catch (error) {
        toast.error('Server error occurred');
        console.error('Error adding new discount:', error);
      }
    };
  
    useEffect(() => {
      loadDiscounts();
    }, []);
    return (
        <>
          <ToastContainer />
          <Header></Header>
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
                <AddDiscountDialog
                  openDialog={openDialog}
                  handleCloseDialog={handleCloseDialog}
                  onAddDiscount={handleAddNewDiscount}
                  initialFormData={initialFormData}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <Button variant="contained" onClick={handleOpenDialog} sx={{ height: '50px', margin: '20px', backgroundColor: 'white', color: '#3baf80', border: '1px solid #3baf80', '&:hover': { backgroundColor: 'white', borderColor: '#3baf80' } }}>
                    Add Discount
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Search By</InputLabel>
                      <Select
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value)}
                        label="Search By"
                        sx={{ height: '50px' }}
                      >
                        <MenuItem value="id">Discount ID</MenuItem>
                        <MenuItem value="productId">Product ID</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Search"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      sx={{ marginLeft: '10px' }}
                    />
                    <Button variant="contained" onClick={handleSearch} sx={{ ml: 2, padding: '5px', background: 'white', color: '#2596be', border: '1px solid #2596be', '&:hover': { backgroundColor: 'white', borderColor: '#2596be' } }}>
                      {searching ? <CircularProgress size={24} /> : 'Search'}
                    </Button>
                  </Box>
                </Box>
                {loading ? <CircularProgress /> : <DiscountTable discounts={discounts} reload={loadDiscounts} />}
              </Paper>
            </Box>
          </Box>
        </>
      );
    };
    
    export default StaffDiscount;