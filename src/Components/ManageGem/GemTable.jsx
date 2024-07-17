import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { updateGem} from '../../Configs/axios';
import UpdateGemDialog from './UpdateGemDialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const initialFormData = {
  gemId: '',
  name: '',
  type: 0,
  price: 0,
  desc: '',
  rate: 0,
};

const GemTable = ({ gems, reload }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(initialFormData);
  const [gemList, setGemList] = useState(gems);
  
  useEffect(() => {
    setGemList(gems);
  }, [gems]);

  const handleUpdateGem = (gem) => {
    setEditData(gem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(initialFormData); 
  };
  const buttonStyle = {
    width: '100px', 
    margin: '5px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  };
  const handleEditGem = async (formData) => {
    const requiredFields = ['name', 'type', 'price', 'rate'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await updateGem(formData); 
      setGemList(gemList.map(gem => gem.gemId === formData.gemId ? formData : gem));
      toast.success(`Gem ${formData.gemId} updated successfully`);
    } catch (error) {
      toast.error('Error updating gem.');
      console.error('Error updating gem:', error);
    } finally {
      handleCloseDialog();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };


  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - gemList.length) : 0;

  const displayRows = rowsPerPage > 0 ? gemList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : gemList;

  return (
    <>
      <UpdateGemDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onUpdateGem={handleEditGem}
        formData={editData}
        setFormData={setEditData}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Id</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Type</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Desc</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Rate</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((gem) => (
              <TableRow key={gem.gemId}>
                <TableCell>{gem.gemId}</TableCell>
                <TableCell align="right">{gem.name}</TableCell>
                <TableCell align="right">{gem.type}</TableCell>
                <TableCell align="right">{gem.price}</TableCell>
                <TableCell align="right">{gem.desc}</TableCell>
                <TableCell align="right">{gem.rate}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleUpdateGem(gem)}
                    sx={{
                      ...buttonStyle,
                      backgroundColor: 'white',
                      color: '#FFA500',
                      border: '1px solid #FFA500',
                      '&:hover': {
                        backgroundColor: 'white',
                        borderColor: '#FFA500',
                      },
                    }}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
            {gemList.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No gems found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={gemList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

GemTable.propTypes = {
  gems: PropTypes.array.isRequired,
  reload: PropTypes.func.isRequired,
};

export default GemTable;
