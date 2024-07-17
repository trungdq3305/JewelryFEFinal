import { Box } from '@mui/material';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import { Outlet } from 'react-router-dom';
const ManagerHomePage = () => {
  return (
    <>
    
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <ManagerSideBar />
          <Box >
            <Outlet />
          </Box>
      </Box>
    </>
  )
}

export default ManagerHomePage
