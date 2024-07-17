/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { addCashier, getAllCashier, searchCashier } from '../Configs/axios';
import CashierTable from '../Components/CashierTable/CashierTable';
import AddCashierDialog from '../Components/CashierTable/AddCashierDialog';

const ManageCashier = () => {
  const [loading, setLoading] = useState(true);
  const [cashiers, setCashiers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadCashier();
    } else {
      const result = await searchCashier(searchValue);
      setCashiers(result.data.data);
    }
  };
  
  const loadCashier = async () => {
    setLoading(true);
    const result = await getAllCashier();
    setCashiers(result.data);
    console.log(result);
    setLoading(false);
  };

  const handleAddCashier = async (formData) => {
    try {
      const updatedFormData = {
        ...formData,
        cashNumber: Number(formData.cashNumber),
      };
      const result = await addCashier(updatedFormData);
      if (result.code === 400) {
        window.alert(result.message);
      } else {
        console.log(result.data);
        handleCloseDialog();
        loadCashier();
      }
    } catch (error) {
      window.alert(error);
      console.error('Error adding user:', error);
    }
  };
  
  const initialFormData = {
    startCash: '',
    endCash: '',
    cashNumber: '',
    userId: ''
  };

  useEffect(() => {
    loadCashier();
  }, []);
  
  if (loading) return <div>Loading....</div>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="20px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        maxWidth="1200px"
      >
        <Button onClick={handleOpenDialog} sx={{ height: '50px' , margin: '20px',backgroundColor: 'white',
                color: '#3baf80', 
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3baf80',
                },
                height:'50px'}}>
          Add cashier
        </Button>
        <TextField
          id="filled-search"
          label="Search"
          type="search"
          variant="filled"
          style={{ width: '300px' }}
          onChange={onSearchTextChange}
        />
      </Box>
      <AddCashierDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onAddCashier={handleAddCashier}
        initialFormData={initialFormData}
      />
      <CashierTable cashiers={cashiers} />
    </Box>
  );
};

export default ManageCashier;
