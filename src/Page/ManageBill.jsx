import React, { useEffect, useState } from 'react';
import { Box, Paper, CircularProgress, TextField, Button, MenuItem } from '@mui/material';
import BillTable from '../Components/ManageBill/BillTable';
import { getAllBills, getAllBills1, getAllBills2 } from '../Configs/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageBill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cashNumber, setCashNumber] = useState('');

  const formatDate = (date) => {
    return date ? new Date(date).toISOString() : '';
  };

  const loadBills = async (axiosFunc, startDate, endDate, cashNumber, sortByTotalCost, sortByTotalCostDesc) => {
    setLoading(true);
    try {
      const result = await axiosFunc(formatDate(startDate), formatDate(endDate), cashNumber, sortByTotalCost, sortByTotalCostDesc);
      console.log('Load bills data:', result);
      setBills(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error loading bills:', error);
      toast.error('Error loading bills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills(getAllBills, '', '', '', '', '');
  }, []);

  const handleSearch = (axiosFunc, sortByTotalCost, sortByTotalCostDesc) => {
    loadBills(axiosFunc, startDate, endDate, cashNumber, sortByTotalCost, sortByTotalCostDesc);
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', justifyContent: 'full' }}>
        <ManagerSideBar />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Cashier"
                value={cashNumber}
                onChange={(e) => setCashNumber(e.target.value)}
                style={{ width: '100px' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </TextField>
              <Button variant="contained" onClick={() => handleSearch(getAllBills, '', '')} sx={{ ml: 2 ,
                    backgroundColor: 'white',
                color: '#2596be', 
                border: '1px solid #2596be',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#2596be',
                },}}>Search</Button>
              <Button variant="contained" onClick={() => handleSearch(getAllBills1, true, '')} sx={{ ml: 2 ,
                    backgroundColor: 'white',
                color: '#2596be', 
                border: '1px solid #2596be',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#2596be',
                },}}>Sort By Total Cost</Button>
              <Button variant="contained" onClick={() => handleSearch(getAllBills2, true, true)} sx={{ ml: 2 ,
                    backgroundColor: 'white',
                color: '#2596be', 
                border: '1px solid #2596be',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#2596be',
                },}}>Sort By Total Cost Desc</Button>
            </Box>
            {loading ? <CircularProgress /> : <BillTable bills={bills} reload={() => loadBills(getAllBills, startDate , endDate , cashNumber, '', '')} />}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ManageBill;
