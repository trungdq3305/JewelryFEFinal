import { Box } from '@mui/material'
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar'
import { Outlet } from 'react-router-dom';
import AccountPopover from '../Components/Avatar/Avatar'
const ManageIncome = () => {
  return (
    <>

      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <ManagerSideBar />
        <AccountPopover />
        <Box >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default ManageIncome
