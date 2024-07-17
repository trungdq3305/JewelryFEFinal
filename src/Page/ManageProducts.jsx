import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import ProductTable from '../Components/ProductTable/ProductTable';
import { getAllProducts, addProduct, searchProduct } from '../Configs/axios';
import AddProductDialog from '../Components/ProductTable/AddProductDialog';

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  };

  const initialFormData = {
    productName: '',
    category: '',
    material: '',
    weight: '',
    machiningCost: '',
    size: '',
    amount: '',
    desc: '',
    image: '',
    gem: {
      additionalProp1: 0,
      additionalProp2: 0,
      additionalProp3: 0
    },
    markupRate: ''
  };

  const materialMapping = [
    { value: '1', label: 'Vàng SJC 1L - 10L - 1KG' },
    { value: '2', label: 'Vàng nh?n SJC 99,99 1 ch?, 2 ch?, 5 ch?' },
    { value: '3', label: 'Vàng nh?n SJC 99,99 0,3 ch?, 0,5 ch?' },
    { value: '4', label: 'Vàng n? trang 99,99%' },
    { value: '5', label: 'Vàng n? trang 99%' },
    { value: '6', label: 'Vàng n? trang 75%' },
    { value: '7', label: 'Vàng n? trang 58,3%' },
    { value: '8', label: 'Vàng n? trang 41,7%' }
  ]

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadProducts();
    } else {
      const result = await searchProduct(searchValue);
      setProducts(result.data.data);
    }
  };

  const loadProducts = async () => {
    setLoading(true)
    const result = await getAllProducts('', '', '', '')
    setProducts(result.data)
    setLoading(false)
  }

  const handleAddProduct = async (formData) => {
    const requiredFields = [
      'productName',
      'category',
      'material',
      'weight',
      'machiningCost',
      'size',
      'amount',
      'desc',
      'image'
    ]
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      window.alert('Please fill out all required fields.');
      return
    }

    try {
      await addProduct(reformatData(formData));
      handleCloseDialog();
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error)
      // Handle error state or display error message to user
    }
  };

  const reformatData = (formData) => {
    const item = materialMapping.find(item => item.label === formData.material);
    const value = item ? item.value : null;
    return {
      ...formData,
      material: value
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <>
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
            maxHeight: '80vh',
            overflow: 'hidden',
            padding: '10px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Button
              onClick={handleOpenDialog} sx={{ height: '50px' , margin: '20px',backgroundColor: 'white',
                color: '#3baf80', 
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3baf80',
                },
                height:'50px'}}
            >
              Add Product
            </Button>
            <TextField
              id="filled-search"
              label="Search"
              type="search"
              variant="filled"
              style={{ width: '300px' }}
              onChange={onSearchTextChange}
            />
          </Box>
          <AddProductDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddProduct={handleAddProduct}
            initialFormData={initialFormData}
          />
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <ProductTable products={products} />
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default ManageProducts