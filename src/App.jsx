// import { Fragment } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { routes } from './Configs/routes'
import { Outlet } from 'react-router'
import { UserProvider } from './Context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DiamondIcon from '@mui/icons-material/Diamond'


function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
