import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import DiscountTable from '../Components/ManageDiscount/DiscountTable';
import { addDiscount, getDiscount } from '../Configs/axios';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import AddDiscountDialog from '../Components/ManageDiscount/AddDiscountDialog';

const ManageDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('id');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewDiscount = async (formData) => {
    try {
      await addDiscount(formData);
      await loadDiscounts(); 
      setSnackbarMessage('Discount added successfully');
      setSnackbarOpen(true);
      handleCloseDialog();
      console.log('New discount added successfully:', formData);
    } catch (error) {
      console.error('Error adding new discount:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
    
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh'}}>
    <ManagerSideBar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
          <AddDiscountDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddDiscount={handleAddNewDiscount}
            initialFormData={initialFormData}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Button variant="contained" onClick={handleOpenDialog} sx={{ height: '50px' , margin: '20px',backgroundColor: 'white',
                color: '#3baf80', 
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3baf80',
                },
                height:'50px'}}>
              Add Discount
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"  sx={{ height: '50px' , margin : '10px'}}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  label="Search By" sx={{ height: '50px' }}
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
                style={{ marginLeft: '10px' }}
              />
              <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 , padding : '5px',background: 'white',color: '#2596be', 
                border: '1px solid #2596be',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#2596be',
                },}}>
                Search
              </Button>
            </Box>
          </Box>

          <DiscountTable discounts={discounts} reload={loadDiscounts} />
        </Paper>
      </Box>
    </Box>
    </>
  );
};

export default ManageDiscount;