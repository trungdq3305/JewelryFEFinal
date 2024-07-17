import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { addUser, getAllUsers, searchUser } from '../Configs/axios';
import UserTable from '../Components/UserTable/UserTable';
import AddUserDialog from '../Components/UserTable/AddUserDialog';
import LoginBackground from '../assets/Login.png';
import { useAuth } from '../Context/UserContext';

const AdminHomepage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut(); // Call logout function from context or wherever it's defined
  };

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadAllUsers();
    } else {
      try {
        const result = await searchUser(searchValue);
        setUsers(result.data.data);
      } catch (error) {
        console.error('Error searching user:', error);
      }
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialFormData = {
    role: '',
    fullName: '',
    doB: '',
    phone: '',
    address: ''
  };

  const roleMapping = [
    { id: 1, label: 'Staff' },
    { id: 2, label: 'Manager' },
    { id: 3, label: 'Admin' }
  ];

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      setUsers(result.data.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (formData) => {
    try {
      const result = await addUser(formData);
      if (result.code === 400) {
        window.alert(result.message);
      } else {
        console.log(result.data);
        handleCloseDialog();
        loadAllUsers();
      }
    } catch (error) {
      window.alert('Error adding user:', error);
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        backgroundImage: `url(${LoginBackground})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '0', 
        }}
      >
        <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#fff' }}>
          Welcome admin
        </Typography>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '0', 
          
        }}
      >
        <Button
          onClick={handleLogout}
          variant="contained"
          color="primary"
          sx={{backgroundColor: '#584c4c',
            color: 'white', 
            border: '1px solid white',
            '&:hover': {
              backgroundColor: '#584c4c',
              borderColor: 'white',
            },
            height:'50px'}}
        >
          Logout
        </Button>
      </Box>
      <Paper
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderRadius: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          <Button
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: 'white',
              color: '#3baf80',
              border: '1px solid #3baf80',
              '&:hover': {
                backgroundColor: 'white',
                borderColor: '#3baf80'
              },
              height: '50px'
            }}
          >
            Add User
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
        <AddUserDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          onAddUser={handleAddUser}
          initialFormData={initialFormData}
          roleMapping={roleMapping}
        />
        <UserTable users={users} />
      </Paper>
    </Box>
  );
};

export default AdminHomepage;
