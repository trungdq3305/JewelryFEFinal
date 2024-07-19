import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import StaffDiscountTable from '../Components/ManageDiscount/StaffDiscountTable';
import { getDiscount } from '../Configs/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header/Header';

const StaffDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('id');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [inputValue, setInputValue] = useState('');
  const [searching, setSearching] = useState(false);

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

  useEffect(() => {
    loadDiscounts();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px', margin: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 120, marginRight: '10px' }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150, marginRight: '10px' }}>
                  <InputLabel>Search By</InputLabel>
                  <Select
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                    label="Search By"
                  >
                    <MenuItem value="id">Discount ID</MenuItem>
                    <MenuItem value="productId">Product ID</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  sx={{ marginRight: '10px' }}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{ padding: '10px 20px', backgroundColor: '#2596be', color: 'white', '&:hover': { backgroundColor: '#1976d2' } }}
                >
                  {searching ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                </Button>
              </Box>
            </Box>
            {loading ? <CircularProgress /> : <StaffDiscountTable discounts={discounts} />}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default StaffDiscount;
