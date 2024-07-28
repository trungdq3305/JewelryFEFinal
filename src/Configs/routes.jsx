import StaffHomepage from '../Page/StaffHomepage'
import AdminHomepage from '../Page/AdminHomepage'
import Login from '../Components/Login'
import ManagerPage from '../Page/ManagerPage'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ProtectedRoutes from './ProtectedRoutes'
import ManagerHomePage from '../Page/ManagerHomePage'
import ProductDetailPage from '../Page/ProductDetailPage'
import BillPage from '../Page/BillPage'
import ManageVoucher from '../Page/ManageVoucher'
import ManageGem from '../Page/ManageGem'
import ManageProducts from '../Page/ManageProducts'
import ManageUsers from '../Page/ManageUsers.jsx'
import ManageCustomer from '../Page/ManageCustomer.jsx'
import ManageDiscount from '../Page/ManageDiscount'
import ManageCashier from '../Page/ManageCashier.jsx'
import StaffCustomer from '../Page/StaffCustomer.jsx'
import StaffDiscount from '../Page/StaffDiscount.jsx'
import GoldPage from '../Page/GoldPage.jsx'
import ManageGold from '../Page/ManageGold.jsx'
import DashBoardManagePage from '../Page/DashBoardManagePage.jsx'
import DashBoardAdminPage from '../Page/DashBoardAdminPage.jsx'
import PolicyPage from '../Page/PolicyPage.jsx'
import PaymentResponsePage from '../Page/PaymentResponsePage.jsx'
import Profile from '../Page/Profile.jsx'
import { History } from '@mui/icons-material'
import HistoryPage from '../Page/HistoryPage.jsx'
import BillDetailPage from '../Page/BillDetailPage.jsx'
import ManageBill from '../Page/ManageBill.jsx'
import AdminProfile from '../Page/AdminProfile.jsx'
import AdminUsers from '../Page/AdminUsers.jsx'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Login /> },
      {
        path: 'StaffPage',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <StaffHomepage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'AdminPages',
        element: (
          <ProtectedRoutes allowedRoles={[3]}>
            <ManageUsers />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'AdminPage',
        element: (
          <ProtectedRoutes allowedRoles={[3]}>
            <DashBoardAdminPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagePage',
        element: (
          <ProtectedRoutes allowedRoles={[2]}>
            <ManagerPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagerHomePage',
        element: (
          <ProtectedRoutes allowedRoles={[2, 3]}>
            <ManagerHomePage />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: 'ManageProducts',
            element: (
              <ProtectedRoutes allowedRoles={[2]}>
                <ManageProducts />
              </ProtectedRoutes>
            ),
          },
          {
            path: 'ManageUsers',
            element: (
              <ProtectedRoutes allowedRoles={[2, 3]}>
                <ManageUsers />
              </ProtectedRoutes>
            ),
          },
          {
            path: 'ManageGold',
            element: (
              <ProtectedRoutes allowedRoles={[2, 3]}>
                <ManageGold />
              </ProtectedRoutes>
            ),
          },
          {
            path: 'ManageCashier',
            element: (
              <ProtectedRoutes allowedRoles={[2]}>
                <ManageCashier />
              </ProtectedRoutes>
            ),
          },
          {
            path: 'ManageCustomer',
            element: (
              <ProtectedRoutes allowedRoles={[1, 2]}>
                <ManageCustomer />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: 'ViewDetailPage/:id',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <ProductDetailPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'BillPage',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <BillPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagerHomePage/ManageGem',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <ManageGem />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagerHomePage/ManageVoucher',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <ManageVoucher />
          </ProtectedRoutes>
        ),
      },

      {
        path: 'ManagerHomePage/ManageDiscount',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <ManageDiscount />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagerHomePage/Dashboard',
        element: (
          <ProtectedRoutes allowedRoles={[2]}>
            <DashBoardManagePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'StaffPage/StaffDiscount',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <StaffDiscount />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'StaffPage/StaffCustomer',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <StaffCustomer />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'StaffPage/Goldrate',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <GoldPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'PolicyPage',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2, 3]}>
            <PolicyPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'PaymentResponse',
        element: <PaymentResponsePage />,
      },
      {
        path: 'History',
        element: (
          <ProtectedRoutes allowedRoles={[1, 2]}>
            <HistoryPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'Profile/:userId',

        element: (
          <ProtectedRoutes allowedRoles={[1, 2, 3]}>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'AdminProfile/:userId',

        element: (
          <ProtectedRoutes allowedRoles={[1, 2, 3]}>
            <AdminProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'BillDetail/:billId',

        element: (
          <ProtectedRoutes allowedRoles={[1, 2, 3]}>
            <BillDetailPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'ManagerHomePage/ManageBill',

        element: (
          <ProtectedRoutes allowedRoles={[ 2 ]}>
            <ManageBill />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'AdminUsers',
        element: (
          <ProtectedRoutes allowedRoles={[3]}>
            <AdminUsers />
          </ProtectedRoutes>
        ),
      },
    ],
  },
])
