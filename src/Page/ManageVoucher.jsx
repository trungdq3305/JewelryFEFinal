import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VoucherTable from '../Components/VoucherTable/VoucherTable';
import { getAllVouchers, addVoucher, getVouchers } from '../Configs/axios';
import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('expiredDay');
  const [inputValue, setInputValue] = useState('');
  const [searching, setSearching] = useState(false);
  const [dateValue, setDateValue] = useState(dayjs());

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);

    let transformedSearchParams = {};
    if (searchCriteria === 'expiredDay') {
      if (dayjs(dateValue).isValid()) {
        transformedSearchParams = {
          expiredDay: dateValue.format('YYYY-MM-DD'),
        };
      } else {
        toast.error('Please select a valid date');
        setSearching(false);
        return;
      }
    } else {
      transformedSearchParams[searchCriteria] = inputValue;
    }

    try {
      const response = await getVouchers(transformedSearchParams);
      setVouchers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Error searching vouchers');
    } finally {
      setSearching(false);
    }
  };

  const initialFormData = {
    expiredDay: '',
    publishedDay: '',
    cost: '',
    customerCustomerId: '',
  };

  const loadVouchers = async () => {
    setLoading(true);
    try {
      const result = await getAllVouchers();
      setVouchers(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error loading vouchers:', error);
      toast.error('Error loading vouchers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVoucher = async (formData) => {
    try {
      const response = await addVoucher(formData);
      if (response.isSuccess) {
        toast.success('Voucher added successfully');
        handleCloseDialog();
        await loadVouchers();
      } else {
        toast.error(response.message || 'Error adding new voucher');
      }
    } catch (error) {
      toast.error('Server error occurred');
      console.error('Error adding voucher:', error);
    }
  };

  useEffect(() => {
    loadVouchers();
  }, []);

  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
          <ManagerSideBar />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <Box sx={{ backgroundColor: '#333', padding: '10px' }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>Manage Vouchers</Typography>
            </Box>
            <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Button onClick={handleOpenDialog} sx={{ backgroundColor: '#3baf80', color: 'white', border: '1px solid white', height: '50px', '&:hover': { backgroundColor: '#3baf80', borderColor: 'white' } , marginTop: '10px'}}>Add Voucher</Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControl fullWidth margin="normal" sx={{paddingRight: '10px' }}>
                    <InputLabel>Search By</InputLabel>
                    <Select
                      value={searchCriteria}
                      onChange={(e) => setSearchCriteria(e.target.value)}
                      label="Search By"
                      sx={{ height: '55px' , marginTop:'-8px'}}
                    >
                      <MenuItem value="expiredDay">Expired Day</MenuItem>
                      <MenuItem value="customerId">Customer ID</MenuItem>
                      <MenuItem value="customerName">Customer Name</MenuItem>
                      <MenuItem value="customerPhone">Customer Phone</MenuItem>
                      <MenuItem value="customerEmail">Customer Email</MenuItem>
                    </Select>
                  </FormControl>
                  {searchCriteria === 'expiredDay' ? (
                    <DatePicker
                      label="Select Date"
                      value={dateValue}
                      onChange={(newValue) => setDateValue(newValue)}
                      renderInput={(params) => <TextField {...params} sx={{ marginLeft: '10px' , height: '50px'}} />}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      label="Search"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      sx={{ marginLeft: '10px' , height: '50px', marginTop:'0px'}}
                    />
                  )}
                  <Button variant="contained" onClick={handleSearch} sx={{ ml: 2, padding: '5px', background: '#2596be', color: 'white', border: '1px solid #2596be', '&:hover': { backgroundColor: '#2596be', borderColor: '#2596be' }, height: '50px'}}>
                    {searching ? <CircularProgress size={24} /> : 'Search'}
                  </Button>
                </Box>
              </Box>
              <AddVoucherDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} onAddVoucher={handleAddVoucher} initialFormData={initialFormData} />
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {loading ? <CircularProgress /> : <VoucherTable vouchers={vouchers} reloadVouchers={loadVouchers} />}
              </Box>
            </Paper>
          </Box>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default ManageVoucher;
