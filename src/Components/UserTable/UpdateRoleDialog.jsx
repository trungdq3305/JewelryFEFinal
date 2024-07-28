import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { updateRole } from '../../Configs/axios'; // Adjust the import path as needed

const roleMapping = [
  { id: 1, label: 'Staff' },
  { id: 2, label: 'Manager' },
  { id: 3, label: 'Admin' }
];

const UpdateRoleDialog = ({ open, onClose, user, onUpdateRole }) => {
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (user) {
      const currentRole = roleMapping.find(role => role.id === user.role);
      console.log('Current Role:', currentRole); // Log the current role for debugging
      setSelectedRole(currentRole ? currentRole.id : '');
    }
  }, [user]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleUpdateRole = async () => {
    if (user) {
      try {
        const result = await updateRole(user.userId, selectedRole);
        console.log('Role updated successfully', result);
        onUpdateRole(user.userId, selectedRole); // Pass the updated role back to the parent
        onClose();
      } catch (error) {
        console.error('Error updating role', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Role</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={handleRoleChange}
          >
            {roleMapping.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateRole}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateRoleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onUpdateRole: PropTypes.func.isRequired
};

export default UpdateRoleDialog;
