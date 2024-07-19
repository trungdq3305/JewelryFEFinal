import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { getTotalIncome, getIncomeByCashNumber, getIncomeByMonth, TotalBill } from '../Configs/axios';
import AdminSideBar from '../Components/Sidebar/AdminSideBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const DashBoardAdminPage = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [incomeByCashNumber, setIncomeByCashNumber] = useState([]);
  const [incomeByMonth, setIncomeByMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const totalIncomeData = await getTotalIncome();
      setTotalIncome(totalIncomeData?.data || 0);

      const incomeByCashNumberData = await getIncomeByCashNumber();
      setIncomeByCashNumber(incomeByCashNumberData?.data || []);

      const incomeByMonthData = await getIncomeByMonth();
      setIncomeByMonth(incomeByMonthData?.data || []);

      const totalBillData = await TotalBill();
      setTotalBill(totalBillData?.data || 0);
    };

    fetchData();
  }, []);

  const incomeByCashNumberChart = {
    labels: incomeByCashNumber.map((item) => `Cash ${item.cashNumber}`),
    datasets: [
      {
        label: 'Total Income',
        data: incomeByCashNumber.map((item) => item.totalIncome),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const incomeByMonthChart = {
    labels: incomeByMonth.map((item) => `${item.year}-${item.month}`),
    datasets: [
      {
        label: 'Total Income',
        data: incomeByMonth.map((item) => item.totalIncome),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box display="flex">
      <AdminSideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* Total Income and Total Bills Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 3, backgroundColor: '#f5f5f5', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                  Total Income
                </Typography>
                <Typography variant="h4" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                  {totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ')}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                  Total Bills
                </Typography>
                <Typography variant="h4" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                  {totalBill.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Income by Cash Number Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                  Income by Cash Number
                </Typography>
                {incomeByCashNumber.length > 0 ? (
                  <Bar data={incomeByCashNumberChart} />
                ) : (
                  <Typography variant="body1" color="textSecondary">No data available</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Income by Month Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                  Income by Month
                </Typography>
                {incomeByMonth.length > 0 ? (
                  <Line data={incomeByMonthChart} />
                ) : (
                  <Typography variant="body1" color="textSecondary">No data available</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Income by Cash Number Table and Income by Month Table */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Income by Cash Number Table */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#f5f5f5', padding: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="div" color="primary" gutterBottom>
                      Income by Cash Number (Table)
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Cash Number</TableCell>
                            <TableCell>Total Income</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {incomeByCashNumber.map((row) => (
                            <TableRow key={row.cashNumber}>
                              <TableCell>{row.cashNumber}</TableCell>
                              <TableCell>{row.totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Income by Month Table */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#f5f5f5', padding: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="div" color="primary" gutterBottom>
                      Income by Month (Table)
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Month</TableCell>
                            <TableCell>Total Income</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {incomeByMonth.map((row) => (
                            <TableRow key={`${row.year}-${row.month}`}>
                              <TableCell>{row.year}</TableCell>
                              <TableCell>{row.month}</TableCell>
                              <TableCell>{row.totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashBoardAdminPage;
