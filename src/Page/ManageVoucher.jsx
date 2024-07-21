import { useEffect, useState } from 'react';
import { Box, Button, Paper, Snackbar } from '@mui/material';
import VoucherTable from '../Components/VoucherTable/VoucherTable';
import { getAllVouchers, addVoucher, getVouchers } from '../Configs/axios';
import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('expiredDay');
  const [searchParams, setSearchParams] = useState({
    expiredDay: { Year: '', Month: '', Day: '' },
    customerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    let transformedSearchParams = {};
    switch (searchCriteria) {
      case 'expiredDay':
        if (!searchParams.expiredDay.Year || !searchParams.expiredDay.Month || !searchParams.expiredDay.Day) {
          setSnackbarMessage('Please enter Year, Month, and Day.');
          setSnackbarOpen(true);
          setLoading(false);
          return;
        }
        transformedSearchParams = {
          'expiredDay.Year': searchParams.expiredDay.Year,
          'expiredDay.Month': searchParams.expiredDay.Month,
          'expiredDay.Day': searchParams.expiredDay.Day,
        };
        break;
      case 'customerId':
        transformedSearchParams.customerId = searchParams.customerId;
        break;
      case 'customerName':
        transformedSearchParams.customerName = searchParams.customerName;
        break;
      case 'customerPhone':
        transformedSearchParams.customerPhone = searchParams.customerPhone;
        break;
      case 'customerEmail':
        transformedSearchParams.customerEmail = searchParams.customerEmail;
        break;
      default:
        break;
    }

    try {
      const vouchers = await getVouchers(transformedSearchParams);
      setVouchers(vouchers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initialFormData = {
    expiredDay: { year: '', month: '', day: '' },
    publishedDay: { year: '', month: '', day: '' },
    cost: '',
    customerCustomerId: '',
  };

  const loadVouchers = async () => {
    setLoading(true);
    const result = await getAllVouchers();
    setVouchers(result.data);
    setLoading(false);
  };

  const handleAddVoucher = async (formData) => {
    try {
      const formattedFormData = {
        ...formData,
        expiredDay: new Date(formData.expiredDay.year, formData.expiredDay.month - 1, formData.expiredDay.day).toISOString(),
        publishedDay: new Date(formData.publishedDay.year, formData.publishedDay.month - 1, formData.publishedDay.day).toISOString(),
      };
      
      await addVoucher(formattedFormData);
      handleCloseDialog();
      loadVouchers();
    } catch (error) {
      console.error('Error adding voucher:', error);
    }
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const params = {
          expiredDay: { Year: '', Month: '', Day: '' },
          customerId: '',
          customerName: '',
          customerPhone: '',
          customerEmail: '',
        };
        const vouchers = await getVouchers(params);
        setVouchers(vouchers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    setSearchParams({
      expiredDay: { Year: '', Month: '', Day: '' },
      customerId: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
    });
  }, [searchCriteria]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (loading) return <div>Loading....</div>;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <ManagerSideBar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Button onClick={handleOpenDialog} sx={{ backgroundColor: 'white', color: '#3baf80', border: '1px solid #3baf80', height: '50px', '&:hover': { backgroundColor: 'white', borderColor: '#3baf80' } }}>Add voucher</Button>
              <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', fontSize: '16px', color: '#333', outline: 'none', width: '200px', margin: '10px 0' }}>
                  <option value="expiredDay">Expired Day</option>
                  <option value="customerId">Customer ID</option>
                  <option value="customerName">Customer Name</option>
                  <option value="customerPhone">Customer Phone</option>
                  <option value="customerEmail">Customer Email</option>
                </select>
                {searchCriteria === 'expiredDay' ? (
                  <div>
                    <input type="number" placeholder="Year" style={{ width: '80px', padding: '5px', margin: '5px', height: '40px' }} value={searchParams.expiredDay.Year} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, expiredDay: { ...prevParams.expiredDay, Year: e.target.value } }))} />
                    <input type="number" placeholder="Month" style={{ width: '80px', padding: '5px', margin: '5px', height: '40px' }} value={searchParams.expiredDay.Month} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, expiredDay: { ...prevParams.expiredDay, Month: e.target.value } }))} />
                    <input type="number" placeholder="Day" style={{ width: '80px', padding: '5px', margin: '5px', height: '40px' }} value={searchParams.expiredDay.Day} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, expiredDay: { ...prevParams.expiredDay, Day: e.target.value } }))} />
                  </div>
                ) : searchCriteria === 'customerId' ? (
                  <div>
                    <input type="text" placeholder="Customer ID" style={{ padding: '5px', margin: '5px', height: '40px' }} value={searchParams.customerId} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, customerId: e.target.value }))} />
                  </div>
                ) : searchCriteria === 'customerName' ? (
                  <div>
                    <input type="text" placeholder="Customer Name" style={{ padding: '5px', margin: '5px', height: '40px' }} value={searchParams.customerName} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, customerName: e.target.value }))} />
                  </div>
                ) : searchCriteria === 'customerPhone' ? (
                  <div>
                    <input type="text" placeholder="Customer Phone" style={{ padding: '5px', margin: '5px', height: '40px' }} value={searchParams.customerPhone} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, customerPhone: e.target.value }))} />
                  </div>
                ) : searchCriteria === 'customerEmail' ? (
                  <div>
                    <input type="email" placeholder="Customer Email" style={{ padding: '5px', margin: '5px', height: '40px' }} value={searchParams.customerEmail} onChange={(e) => setSearchParams((prevParams) => ({ ...prevParams, customerEmail: e.target.value }))} />
                  </div>
                ) : null}
                <button type="submit" style={{ backgroundColor: 'white', color: '#2596be', border: '1px solid #2596be', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#f7faff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; }}>SEARCH</button>
              </form>
            </Box>
            <AddVoucherDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} onAddVoucher={handleAddVoucher} initialFormData={initialFormData} />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <VoucherTable vouchers={vouchers.data} reloadVouchers={loadVouchers} />
            </Box>
          </Paper>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} key={'topcenter'} />
    </>
  );
};

export default ManageVoucher;
