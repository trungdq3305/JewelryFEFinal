import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import { alpha } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useAuth } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const AccountPopover = () => {
  const [open, setOpen] = useState(null)
  const navigate = useNavigate()
  const { logOut } = useAuth()

  // Retrieve user information from localStorage
  const userStr = localStorage.getItem('user');
  const user = JSON.parse(userStr);
  const userId = user ? user.userId : null;

  // Define menu options with paths
  const MENU_OPTIONS = [
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      path: `/Profile/${userId}`, 
    },
    
  ];

  // Handle opening the popover
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // Handle closing the popover
  const handleClose = () => {
    setOpen(null);
  };

  // Handle logout
  const handleLogout = () => {
    logOut();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userId}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              navigate(option.path); // Navigate to the path
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover
