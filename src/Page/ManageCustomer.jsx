import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress , Typography} from '@mui/material';
import CustomerTable from '../Components/CustomerTable/CustomerTable';
import {
  getAllCustomers,
  addCustomer,
  getCustomersByName,
  getCustomerByPhone,
} from '../Configs/axios';
import AddCustomerDialog from '../Components/CustomerTable/AddCustomerDialog';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialFormData = {
    fullName: '',
    doB: '',
    address: '',
    email: '',
    phone: '',
    status: true,
  };

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const result = await getAllCustomers();
      setCustomers(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (formData) => {
    try {
      const response = await addCustomer(formData);
      if (response.isSuccess) {
        toast.success('Customer added successfully');
        handleCloseDialog();
        console.log('New customer added successfully:', response.data);
        await loadCustomers();
      } else {
        toast.error(response.message || 'Error adding new customer');
        console.error('Error adding new customer:', response.message);
      }
    } catch (error) {
      toast.error('Server error occurred');
      console.error('Error adding new customer:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchCriteria === 'name') {
        const result = await getCustomersByName(searchValue);
        setCustomers(result.data);
      } else if (searchCriteria === 'phone') {
        const result = await getCustomerByPhone(searchValue);
        setCustomers(result.data);
      }
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error(`Error fetching customers by ${searchCriteria}:`, error);
      setError(`Error fetching customers by ${searchCriteria}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <Paper
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              padding: '10px',
            }}
          >
            <Box sx={{ backgroundColor: '#333', padding: '10px', marginBottom:'20px' }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>Manage Customers</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              
              <Button
                onClick={handleOpenDialog}
                sx={{
                  backgroundColor: '#3baf80',
                  color: 'white',
                  border: '1px solid white',
                  '&:hover': {
                    backgroundColor: '#3baf80',
                    borderColor: 'white',
                  },
                  height: '50px',
                }}
              >
                Add Customer
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontSize: '16px',
                    color: '#333',
                    outline: 'none',
                    marginRight: '10px',
                    height: '55px',
                  }}
                >
                  <option value="name">Name</option>
                  <option value="phone">Phone</option>
                </select>

                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchValue}
                  onChange={handleInputChange}
                  style={{ flex: 1, marginRight: '10px' }} // Added flex: 1 to take remaining space
                />

                <Button
                  onClick={handleSearch}
                  sx={{
                    ml: 2,
                    backgroundColor: '#2596be',
                    color: 'white',
                    border: '1px solid white',
                    '&:hover': {
                      backgroundColor: '#2596be',
                      borderColor: 'white',
                    },
                    height:'55px'
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>

            {error && <Box sx={{ mb: 2, color: 'red' }}>{error}</Box>}

            <AddCustomerDialog
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              onAddCustomer={handleAddCustomer}
              initialFormData={initialFormData}
            />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <CustomerTable customers={customers} reloadCustomers={loadCustomers} />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ManageCustomer;
