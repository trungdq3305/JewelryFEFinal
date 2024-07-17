/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { addUser, getAllUsers, searchUser } from '../Configs/axios';
import UserTable from '../Components/UserTable/UserTable';
import AddUserDialog from '../Components/UserTable/AddUserDialog';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadAllUsers();
    } else {
      try {
        const result = await searchUser(searchValue);
        setUsers(result.data.data);
      } catch (error) {
        console.error('Error searching users:', error);
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
      window.alert(error);
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <Box
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center"
  margin="20px"
>
  <Button onClick={handleOpenDialog} sx={{ height: '50px' , margin: '10px',backgroundColor: 'white',
                color: '#3baf80', 
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3baf80',
                },
                height:'50px'}}>
    Add User
  </Button>
  <TextField
    id="filled-search"
    label="Search"
    type="search"
    variant="filled"
    style={{ width: '300px' , marginLeft: '600px', marginBottom: ' 10px'}}
    onChange={onSearchTextChange}
  />
      
      <AddUserDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onAddUser={handleAddUser}
        initialFormData={initialFormData}
        roleMapping={roleMapping}
      />
      <UserTable users={users} />
    </Box>
  );
};

export default ManageUsers;
