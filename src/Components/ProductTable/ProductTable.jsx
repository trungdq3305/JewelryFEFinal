// import { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableFooter, TableContainer, TableHead, TableRow, Paper, Box, TablePagination, Button } from '@mui/material';
// import EditProductDialog from './EditProductDialog';
// import PropTypes from 'prop-types';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import { addDiscount, editProduct } from '../../Configs/axios';

// import { useTheme } from '@mui/material/styles';
// import { propTypes } from 'react-bootstrap/esm/Image';

// function TablePaginationActions(props) {
//   const { count, page, rowsPerPage, onPageChange } = props;
//   const theme = useTheme(); // Use useTheme hook to get the theme

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };


//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


// const initialFormData = {
//   productName: '',
//   category: '',
//   material: '',
//   weight: '',
//   machiningCost: '',
//   size: '',
//   amount: '',
//   desc: '',
//   image: '',
//   gem: {
//     additionalProp1: 0,
//     additionalProp2: 0,
//     additionalProp3: 0
//   },
//   markupRate: ''
// };


// const ProductTable = ({ products, goldData, discountData }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5)
//   const [openEditDialog, setopenEditDialog] = useState(false);
//   const [openAddDiscountDialog, setOpenAddDiscountDialog] = useState(false);
//   const [editData, setEditData] = useState(initialFormData);
//   // const [gemForm, setGemForm] = useState({
//   //   productId: '',
//   //   gem: {
//   //     additionalProp1: '',
//   //     additionalProp2: '',
//   //     additionalProp3: ''
//   //   }
//   // }
//   const handleEdit = (product) => {
//     handleopenEditDialog()
//     const materialGold = goldData.find(gold => gold.goldName === product.material);
//     setEditData({
//       ...initialFormData,
//       ...product,
//       material: materialGold ? materialGold.goldId : '',
//     });
//   };
//   // const addProductDiscount = async(productId,discountId) => {
//   //   try {
//   //     await addDiscount(productId,discountId);
//   //     handleCloseDialog();
//   //     loadProducts();
//   //   } catch (error) {
//   //     console.error('Error adding discount:', error);
//   //   }
//   // };


//   const handleopenEditDialog = () => {
//     setopenEditDialog(true);
//   };

//   const handleCloseEditDialog = () => {
//     setopenEditDialog(false);
//   };
//   const handleOpenAddDiscountDialog = () => {
//     setOpenAddDiscountDialog(true)
//   }
//   const handleCloseAddDiscountDialog = () => {
//     setOpenAddDiscountDialog(false)
//   }
//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSaveProduct = async (formData) => {
//     try {
//       await editProduct(formData);
//       handleCloseEditDialog();
//       // Refresh products data if necessary
//     } catch (error) {
//       console.error('Error editing product:', error);
//     }
//   };
//   // const handleAddGem = async()

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Id</TableCell>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Material</TableCell>
//               <TableCell>Weight</TableCell>
//               <TableCell>Machining Cost</TableCell>
//               <TableCell>Size</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(rowsPerPage > 0
//               ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : products
//             ).map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.productId}</TableCell>
//                 <TableCell>{product.productName}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>{product.material}</TableCell>
//                 <TableCell>{product.weight}</TableCell>
//                 <TableCell>{product.machiningCost}</TableCell>
//                 <TableCell>{product.size}</TableCell>
//                 <TableCell>{product.amount}</TableCell>
//                 <TableCell>{product.desc}</TableCell>
//                 <TableCell>{product.image}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEdit(product)}>Edit</Button>
//                   <Button > Add Gem </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={9} />
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 colSpan={9}
//                 count={products.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 SelectProps={{
//                   inputProps: {
//                     'aria-label': 'rows per page',
//                   },
//                   native: true,
//                 }}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       <EditProductDialog
//         openEditDialog={openEditDialog}
//         handleCloseEditDialog={handleCloseEditDialog}
//         productData={editData}
//         goldData={goldData}
//         onSaveProduct={handleSaveProduct}
//       />
//       {/* <openAddDiscountDialog>
//       openAddDiscountDialog={openAddDiscountDialog}
//       handleCloseAddDiscountDialog={handleCloseAddDiscountDialog}
//       openAddDiscount={addProductDiscount}
//       discountData={discountData}
//       </openAddDiscountDialog> */}
//     </>
//   );
// };

// ProductTable.propTypes = {
//   products: PropTypes.array.isRequired,
//   goldData: PropTypes.array.isRequired,
//   // discountData: propTypes.array.isRequired
// };
// export default ProductTable

import { useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableContainer, TableHead, TableRow, Paper, Box, TablePagination, Button } from '@mui/material';
import EditProductDialog from './EditProductDialog';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const theme = useTheme();

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
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
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

const ProductTable = ({ products, goldData, discountData, onEditProduct }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setopenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setopenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Machining Cost</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
              {/* Add more headers as needed */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.material}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.machiningCost}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.desc}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(product)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {selectedProduct && (
        <EditProductDialog
          openDialog={openEditDialog}
          handleCloseDialog={handleCloseEditDialog}
          product={selectedProduct}
          goldData={goldData}
          // discountData={discountData}
        />
      )}
    </>
  );
};

export default ProductTable;
