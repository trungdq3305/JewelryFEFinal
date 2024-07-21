import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Select, FormControl, InputLabel, MenuItem, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { getIncomeDaily, getIncomeMonthly } from '../../Configs/axios';

const CounterIncomeDialog = ({ openDialog, handleCloseDialog }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [counterInput, setCounterInput] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [income, setIncome] = useState(null);

  useEffect(() => {
    if (!openDialog) {
      setSearchFilter('');
      setCounterInput('');
      setSearchDate('');
      setIncome(null); // Reset income when dialog is closed
    }
  }, [openDialog]);

  const counterMapping = [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' }
  ];

  const handleView = async () => {
    try {
      let result;
      if (searchFilter === 'Date') {
        result = await getIncomeDaily(searchDate, counterInput);
      } else if (searchFilter === 'Month') {
        result = await getIncomeMonthly(searchDate, counterInput);
      }

      console.log('API result:', result);

      if (result.data.isSuccess && result.data.code === 200) {
        setIncome(result.data.data); // Set income if data is present
      } else {
        console.error('Error fetching data:', result.message);
        setIncome(null); // Handle errors or unexpected responses
      }
    } catch (error) {
      console.error('Error viewing income:', error);
      setIncome(null); // Handle network or other errors
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>View counter income</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth="1200px"
          gap="20px"
        >
          <FormControl fullWidth margin="normal">
            <InputLabel>Search by</InputLabel>
            <Select
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              label="Search by"
              sx={{ height: '50px', margin: '10px' }}
            >
              <MenuItem value="Date">Date</MenuItem>
              <MenuItem value="Month">Month</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Counter number</InputLabel>
            <Select
              value={counterInput}
              onChange={(e) => setCounterInput(e.target.value)}
              label="Counter number"
              sx={{ height: '50px', margin: '10px' }}
            >
              {counterMapping.map(item => (
                <MenuItem key={item.id} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            variant="filled"
            style={{ width: '1000px' }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Counter Number</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Income</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {income !== null ? (
              <TableRow>
                <TableCell align="right">{searchDate}</TableCell>
                <TableCell align="right">{counterInput}</TableCell>
                <TableCell align="right">{income.toLocaleString()}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">Please click &quot;View&quot; to display data.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleView} variant="contained" autoFocus>
          View
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CounterIncomeDialog;
