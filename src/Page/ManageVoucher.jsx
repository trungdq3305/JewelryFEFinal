import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Snackbar } from '@mui/material';
import VoucherTable from '../Components/VoucherTable/VoucherTable';
import { getAllVouchers, addVoucher, getVouchers } from '../Configs/axios';
import AddVoucherDialog from '../Components/VoucherTable/AddVoucherDialog';
import SearchIcon from '@mui/icons-material/Search';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';

const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('expiredDay');
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialSearchParams = {
    expiredDay: {
      Year: '',
      Month: '',
      Day: '',
    },
    customerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Kiểm tra xem các trường Year, Month, và Day đã được nhập đủ hay chưa
    

    let transformedSearchParams = {};

    // Depending on the search criteria, set the appropriate fields in transformedSearchParams
    switch (searchCriteria) {
      case 'expiredDay':
        if (
          !searchParams.expiredDay.Year ||
          !searchParams.expiredDay.Month ||
          !searchParams.expiredDay.Day
        ) {
          setSnackbarMessage('Please enter Year, Month, and Day.');
          setSnackbarOpen(true);
          setLoading(false);
          return;
        }
        transformedSearchParams = {
          ...searchParams,
          'expiredDay.Year': searchParams.expiredDay.Year,
          'expiredDay.Month': searchParams.expiredDay.Month,
          'expiredDay.Day': searchParams.expiredDay.Day,
        };
        delete transformedSearchParams.expiredDay; // Remove nested expiredDay object
        break;
      case 'customerId':
        transformedSearchParams = {
          ...searchParams,
          customerId: searchParams.customerId,
        };
        break;
      case 'customerName':
        transformedSearchParams = {
          ...searchParams,
          customerName: searchParams.customerName,
        };
        break;
      case 'customerPhone':
        transformedSearchParams = {
          ...searchParams,
          customerPhone: searchParams.customerPhone,
        };
        break;
      case 'customerEmail':
        transformedSearchParams = {
          ...searchParams,
          customerEmail: searchParams.customerEmail,
        };
        break;
      default:
        break;
    }

    try {
      const vouchers = await getVouchers(transformedSearchParams);
      console.log(transformedSearchParams);
      console.log('Received vouchers:', vouchers);
      setVouchers(vouchers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initialFormData = {
    expiredDay: {
      year: '',
      month: '',
      day: '',
    },
    publishedDay: {
      year: '',
      month: '',
      day: '',
    },
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
      await addVoucher(formData);
      handleCloseDialog();
      loadVouchers();
      console.log(formData);
    } catch (error) {
      console.error('Error adding voucher:', error);
      // Handle error state or display error message to user
    }
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const params = {
          expiredDay: {
            Year: '',
            Month: '',
            Day: '',
          },
          customerId: '',
          customerName: '',
          customerPhone: '',
          customerEmail: '',
        };
        console.log(params);
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
    setSearchParams(initialSearchParams);
  }, [searchCriteria]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <div>Loading....</div>;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <ManagerSideBar />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <Paper
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',

              overflow: 'hidden',
              padding: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <Button onClick={handleOpenDialog} 
              sx={{
                backgroundColor: 'white',
                color: '#3baf80', 
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3baf80',
                },
                height:'50px'
              }}>Add voucher</Button>
              <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontSize: '16px',
                    color: '#333',
                    outline: 'none',
                    width: '200px',
                    margin: '10px 0',
                  }}
                >
                  <option value="expiredDay">Expired Day</option>
                  <option value="customerId">Customer ID</option>
                  <option value="customerName">Customer Name</option>
                  <option value="customerPhone">Customer Phone</option>
                  <option value="customerEmail">Customer Email</option>
                </select>
                

                {searchCriteria === 'expiredDay' ? (
                  <div>
                    <input
                      type="number"
                      placeholder="Year"
                      style={{ width: '80px', padding: '5px', margin: '5px', height: '40px' }}
                      value={searchParams.expiredDay.Year}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          expiredDay: {
                            ...prevParams.expiredDay,
                            Year: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Month"
                      style={{ width: '80px', padding: '5px', margin: '5px' , height: '40px'}}
                      value={searchParams.expiredDay.Month}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          expiredDay: {
                            ...prevParams.expiredDay,
                            Month: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Day"
                      style={{ width: '80px', padding: '5px', margin: '5px' , height: '40px'}}
                      value={searchParams.expiredDay.Day}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          expiredDay: {
                            ...prevParams.expiredDay,
                            Day: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerId' ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Customer ID"
                      style={{ padding: '5px', margin: '5px' , height: '40px'}}
                      value={searchParams.customerId}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerId: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerName' ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      style={{ padding: '5px', margin: '5px' , height: '40px'}}
                      value={searchParams.customerName}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerName: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerPhone' ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Customer Phone"
                      style={{ padding: '5px', margin: '5px' , height: '40px'}}
                      value={searchParams.customerPhone}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerPhone: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : searchCriteria === 'customerEmail' ? (
                  <div>
                    <input
                      type="email"
                      placeholder="Customer Email"
                      style={{ padding: '5px', margin: '5px' , height: '40px'}}
                      value={searchParams.customerEmail}
                      onChange={(e) =>
                        setSearchParams((prevParams) => ({
                          ...prevParams,
                          customerEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : null}
                
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'white',
                    color: '#4277d3',
                    border: 'none',
                    padding: '10px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                    backgroundColor: 'white',
                color: '#2596be', 
                border: '1px solid #2596be',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#2596be',
                },
                  }}
                  
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f7faff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  SEARCH
                </button>
              </form>
            </Box>

            <AddVoucherDialog
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              onAddVoucher={handleAddVoucher}
              initialFormData={initialFormData}
            />

            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <VoucherTable vouchers={vouchers.data} reloadVouchers={loadVouchers} />
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Snackbar to display error message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        key={'topcenter'}
      />
    </>
  );
};

export default ManageVoucher;
