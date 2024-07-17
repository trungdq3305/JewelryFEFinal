import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import GemTable from '../Components/ManageGem/GemTable';
import { getAllGem, addGem, getGems } from '../Configs/axios';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import AddGemDialog from '../Components/ManageGem/AddGemDialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageGem = () => {
  const [gems, setGems] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('gemId');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [inputValue, setInputValue] = useState('');

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
      const response = await getGems(transformedSearchParams);
      console.log('Search response data:', response.data); 
      setGems(Array.isArray(response.data) ? response.data : []); 
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Error searching gems');
    } finally {
      setLoading(false);
    }
  };

  const initialFormData = {
    gemId: '',
    name: '',
    type: 0,
    price: 0,
    desc: '',
    rate: 0,
  };

  const loadGems = async () => {
    setLoading(true);
    try {
      const result = await getAllGem();
      console.log('Load gems data:', result.data); 
      setGems(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error loading gems:', error);
      toast.error('Error loading gems. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewGem = async (formData) => {
    try {
      const response = await addGem(formData);
      if (response.isSuccess) { 
        toast.success('Gem added successfully');
        handleCloseDialog();
        console.log('New Gem added successfully:', response.data);
        await loadGems(); 
      } else {
        toast.error(response.message || 'Error adding new gem');
        console.error('Error adding new gem:', response.message);
      }
    } catch (error) {
      toast.error('Server error occurred');
      console.error('Error adding new gem:', error);
    }
  };

  useEffect(() => {
    loadGems();
  }, []);

  return (
    <><ToastContainer />
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' , justifyContent: 'full'}}>
    <ManagerSideBar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
          <AddGemDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddGem={handleAddNewGem}
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
              Add New Gem
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  label="Search By" sx={{ height: '50px'}}
                >
                  <MenuItem value="gemId">Gem ID</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                margin="normal"
                style={{  marginLeft: '10px' }}
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
          {loading ? <CircularProgress /> : <GemTable gems={gems} reload={loadGems} />}
        </Paper>
      </Box>
    </Box></>
  );
};

export default ManageGem;
