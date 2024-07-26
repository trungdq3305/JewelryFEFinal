// import React, { useState, useEffect } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle,
//   TextField, FormControl, InputLabel, Select, MenuItem,
//   Button, Paper, FormControlLabel, Checkbox
// } from '@mui/material';
// import PropTypes from 'prop-types';
// import { getAllGem } from '../../Configs/axios';

// const EditProductDialog = ({ openEditDialog, handleCloseEditDialog, productData, goldData, onSaveProduct }) => {
//   const [formData, setFormData] = useState(productData);
//   const [propChecks, setPropChecks] = useState({});
//   const [gemData, setGemData] = useState([]);
//   const [gemAmounts, setGemAmounts] = useState({});

//   useEffect(() => {
//     setFormData(productData);
//     getGemList();
//     initializeGemData(productData.gem);
//   }, [productData]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     // Ensure numerical fields are validated
//     if (['weight', 'machiningCost', 'size', 'amount', 'markupRate'].includes(name)) {
//       const parsedValue = parseFloat(value);
//       if (isNaN(parsedValue) || parsedValue < 0) return;
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: parsedValue
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value
//       }));
//     }
//   };

//   const handleCheckChange = (event) => {
//     const { name, checked } = event.target;
//     const gemKey = name; // Use name directly as gemKey

//     if (checked) {
//       setPropChecks((prevChecks) => ({
//         ...prevChecks,
//         [name]: checked
//       }));
//       setGemAmounts((prevAmounts) => ({
//         ...prevAmounts,
//         [gemKey]: { gemId: '', amount: '' }
//       }));
//     } else {
//       const newChecks = { ...propChecks };
//       delete newChecks[name];
//       setPropChecks(newChecks);

//       const newAmounts = { ...gemAmounts };
//       delete newAmounts[gemKey];
//       setGemAmounts(newAmounts);
//     }
//   };

//   const handleGemChange = (event) => {
//     const { name, value } = event.target;
//     const gemKey = name.split('.')[0]; // Extract gem key

//     setGemAmounts((prevAmounts) => ({
//       ...prevAmounts,
//       [gemKey]: {
//         ...prevAmounts[gemKey],
//         gemId: value
//       }
//     }));
//   };

//   const handleAmountChange = (event) => {
//     const { name, value } = event.target;
//     const gemKey = name.split('.')[0]; // Extract gem key

//     const parsedValue = parseFloat(value);
//     if (isNaN(parsedValue) || parsedValue < 0) return;

//     setGemAmounts((prevAmounts) => ({
//       ...prevAmounts,
//       [gemKey]: {
//         ...prevAmounts[gemKey],
//         amount: parsedValue
//       }
//     }));
//   };

//   const handleSave = () => {
//     const updatedGemData = {};
//     Object.keys(gemAmounts).forEach((key) => {
//       const { gemId, amount } = gemAmounts[key];
//       if (gemId && amount) {
//         updatedGemData[gemId] = parseInt(amount, 10);
//       }
//     });

//     const updatedFormData = {
//       ...formData,
//       gem: updatedGemData
//     };
//     onSaveProduct(updatedFormData);
//     setGemAmounts({});
//     setPropChecks({});
//   };

//   const getGemList = async () => {
//     try {
//       const result = await getAllGem();
//       if (result.isSuccess) {
//         setGemData(result.data);
//         const initialPropChecks = result.data.reduce((acc, gem, index) => {
//           acc[`gemProp${index + 1}`] = false;
//           return acc;
//         }, {});
//         setPropChecks(initialPropChecks);
//       }
//     } catch (error) {
//       console.error('Error fetching gem data:', error);
//     }
//   };

//   const initializeGemData = (gems) => {
//     if (!gems) return;
//     const initialGemAmounts = {};
//     const initialPropChecks = {};

//     Object.entries(gems).forEach(([gemId, amount], index) => {
//       initialGemAmounts[`gemProp${index + 1}`] = { gemId, amount };
//       initialPropChecks[`gemProp${index + 1}`] = true;
//     });

//     setGemAmounts(initialGemAmounts);
//     setPropChecks(initialPropChecks);
//   };

//   return (
//     <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
//       <DialogTitle>Edit Product</DialogTitle>
//       <DialogContent>
//         <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
//           <TextField
//             margin="dense"
//             name="productName"
//             label="Product Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={formData.productName}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="category"
//             label="Category"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={formData.category}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth variant="standard" margin="dense">
//             <InputLabel>Material</InputLabel>
//             <Select
//               name="material"
//               value={formData.material}
//               onChange={handleChange}
//             >
//               {goldData.map((gold) => (
//                 <MenuItem key={gold.goldId} value={gold.goldId}>
//                   {gold.goldName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             margin="dense"
//             name="weight"
//             label="Weight"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={formData.weight || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="machiningCost"
//             label="Machining Cost"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={formData.machiningCost || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="size"
//             label="Size"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={formData.size || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="amount"
//             label="Amount"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={formData.amount || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="desc"
//             label="Description"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={formData.desc}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="image"
//             label="Image"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={formData.image}
//             onChange={handleChange}
//           />

//           {gemData.map((gem, index) => (
//             <div key={gem.gemId}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={propChecks[`gemProp${index + 1}`] || false}
//                     onChange={handleCheckChange}
//                     name={`gemProp${index + 1}`}
//                   />
//                 }
//                 label={`Add Gem ${index + 1}`}
//               />
//               {propChecks[`gemProp${index + 1}`] && (
//                 <div>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Gem Type</InputLabel>
//                     <Select
//                       name={`gemProp${index + 1}.gemId`}
//                       value={gemAmounts[`gemProp${index + 1}`]?.gemId || ''}
//                       onChange={handleGemChange}
//                     >
//                       {gemData.map((g) => (
//                         <MenuItem key={g.gemId} value={g.gemId}>{g.name}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <TextField
//                     margin="normal"
//                     fullWidth
//                     name={`gemProp${index + 1}.amount`}
//                     label="Amount"
//                     type="number"
//                     value={gemAmounts[`gemProp${index + 1}`]?.amount || ''}
//                     onChange={handleAmountChange}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </Paper>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseEditDialog}>Cancel</Button>
//         <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// EditProductDialog.propTypes = {
//   openEditDialog: PropTypes.bool.isRequired,
//   handleCloseEditDialog: PropTypes.func.isRequired,
//   productData: PropTypes.object.isRequired,
//   goldData: PropTypes.array.isRequired,
//   onSaveProduct: PropTypes.func.isRequired,
// };

// export default EditProductDialog;

// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

// const EditProductDialog = ({ open, handleClose, product, goldData = [], gemData = [] }) => {
//   const [formData, setFormData] = useState({ ...product });
//   const [propChecks, setPropChecks] = useState({});
//   const [gemAmounts, setGemAmounts] = useState({});

//   useEffect(() => {
//     setFormData({ ...product });
//     const initialChecks = {};
//     const initialAmounts = {};

//     // Initialize checkboxes and gem amounts based on product data
//     product.gems?.forEach((gem, index) => {
//       initialChecks[`gemProp${index + 1}`] = true;
//       initialAmounts[`gemProp${index + 1}`] = { gemId: gem.gemId, amount: gem.amount };
//     });

//     setPropChecks(initialChecks);
//     setGemAmounts(initialAmounts);
//   }, [product]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleCheckChange = (event) => {
//     const { name, checked } = event.target;
//     setPropChecks({
//       ...propChecks,
//       [name]: checked
//     });
//   };

//   const handleGemChange = (event) => {
//     const { name, value } = event.target;
//     const gemProp = name.split('.')[0];
//     setGemAmounts({
//       ...gemAmounts,
//       [gemProp]: {
//         ...gemAmounts[gemProp],
//         gemId: value
//       }
//     });
//   };

//   const handleAmountChange = (event) => {
//     const { name, value } = event.target;
//     const gemProp = name.split('.')[0];
//     setGemAmounts({
//       ...gemAmounts,
//       [gemProp]: {
//         ...gemAmounts[gemProp],
//         amount: value
//       }
//     });
//   };

//   const handleSave = () => {
//     const updatedGems = Object.values(gemAmounts).filter(gem => gem.gemId && gem.amount > 0);
//     const updatedProduct = {
//       ...formData,
//       gems: updatedGems
//     };

//     console.log('Updated Product:', updatedProduct);
//     handleClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Edit Product</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           name="productName"
//           label="Product Name"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.productName || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="category"
//           label="Category"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.category || ''}
//           onChange={handleChange}
//         />
//         <FormControl fullWidth variant="standard" margin="dense">
//           <InputLabel>Material</InputLabel>
//           <Select
//             name="material"
//             value={formData.material || ''}
//             onChange={handleChange}
//           >
//             {goldData.map((gold) => (
//               <MenuItem key={gold.goldId} value={gold.goldId}>
//                 {gold.goldName}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           margin="dense"
//           name="weight"
//           label="Weight"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={formData.weight || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="machiningCost"
//           label="Machining Cost"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={formData.machiningCost || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="size"
//           label="Size"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={formData.size || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="amount"
//           label="Amount"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={formData.amount || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="desc"
//           label="Description"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.desc || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="image"
//           label="Image"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.image || ''}
//           onChange={handleChange}
//         />

//         {gemData.map((gem, index) => (
//           <div key={gem.gemId}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={propChecks[`gemProp${index + 1}`] || false}
//                   onChange={handleCheckChange}
//                   name={`gemProp${index + 1}`}
//                 />
//               }
//               label={`Add Gem ${index + 1}`}
//             />
//             {propChecks[`gemProp${index + 1}`] && (
//               <div>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Gem Type</InputLabel>
//                   <Select
//                     name={`gemProp${index + 1}.gemId`}
//                     value={gemAmounts[`gemProp${index + 1}`]?.gemId || ''}
//                     onChange={handleGemChange}
//                   >
//                     {gemData.map((g) => (
//                       <MenuItem key={g.gemId} value={g.gemId}>{g.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   margin="normal"
//                   fullWidth
//                   name={`gemProp${index + 1}.amount`}
//                   label="Amount"
//                   type="number"
//                   value={gemAmounts[`gemProp${index + 1}`]?.amount || ''}
//                   onChange={handleAmountChange}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleSave}>Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditProductDialog;
import { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Paper, FormControlLabel, Checkbox
} from '@mui/material';
import { getAllGem, editProduct } from '../../Configs/axios';

const EditProductDialog = ({ openDialog, handleCloseDialog, product, onEditProduct, goldData }) => {
  const [formData, setFormData] = useState({
    productId: '', // Add productId to formData
    productName: '',
    category: '',
    material: '',
    weight: '',
    machiningCost: '',
    size: '',
    amount: '',
    desc: '',
    image: '',
    markupRate: ''
  });
  const [propChecks, setPropChecks] = useState({});
  const [gemData, setGemData] = useState([]);
  const [gemAmounts, setGemAmounts] = useState({});

  // Fetch gem data on component mount
  useEffect(() => {
    const fetchGemData = async () => {
      try {
        const result = await getAllGem();
        if (result.isSuccess) {
          setGemData(result.data);

          // Initialize checkboxes based on fetched gems
          const initialPropChecks = result.data.reduce((acc, gem, index) => {
            acc[`gemProp${index + 1}`] = false;
            return acc;
          }, {});
          setPropChecks(initialPropChecks);
        }
      } catch (error) {
        console.error('Error fetching gem data:', error);
      }
    };

    fetchGemData();
  }, []);

  // Populate form data and gem amounts when product or goldData changes
  useEffect(() => {
    if (product && goldData.length) {
      const materialGold = goldData.find(gold => gold.goldName === product.material);
      const materialId = materialGold ? materialGold.goldId : '';
    
      setFormData({
        productId: product.productId, // Set productId
        productName: product.productName,
        category: product.category,
        material: materialId,
        weight: product.weight,
        machiningCost: product.machiningCost,
        size: product.size,
        amount: product.amount,
        desc: product.desc,
        image: product.image,
        markupRate: product.markupRate
      });
    
      const initialGemAmounts = {};
      const initialPropChecks = {};
    
      if (Array.isArray(product.productGems)) {
        product.productGems.forEach((gem, index) => {
          initialGemAmounts[`gemProp${index + 1}`] = { gemId: gem.gemId || '', amount: gem.amount?.toString() || '' };
          initialPropChecks[`gemProp${index + 1}`] = true;
        });
      } else {
        console.error('product.productGems is not an array:', product.productGems);
      }
    
      setGemAmounts(initialGemAmounts);
      setPropChecks(initialPropChecks);
    }
  }, [product, goldData]);

  // Handle changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle checkbox changes for gem selection
  const handleCheckChange = (event) => {
    const { name, checked } = event.target;
    const gemKey = name;

    if (checked) {
      setPropChecks(prevChecks => ({
        ...prevChecks,
        [name]: checked
      }));
      setGemAmounts(prevAmounts => ({
        ...prevAmounts,
        [gemKey]: { gemId: '', amount: '' }
      }));
    } else {
      const newChecks = { ...propChecks };
      delete newChecks[name];
      setPropChecks(newChecks);

      const newAmounts = { ...gemAmounts };
      delete newAmounts[gemKey];
      setGemAmounts(newAmounts);
    }
  };

  // Handle gem type changes
  const handleGemChange = (event) => {
    const { name, value } = event.target;
    const gemKey = name.split('.')[0];

    setGemAmounts(prevAmounts => ({
      ...prevAmounts,
      [gemKey]: {
        ...prevAmounts[gemKey],
        gemId: value // Ensure gemId is a string
      }
    }));
  };

  // Handle amount changes for gems
  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    const gemKey = name.split('.')[0];

    const parsedValue = value.trim();
    if (parsedValue === '' || isNaN(parsedValue) || parsedValue < 0) return;

    setGemAmounts(prevAmounts => ({
      ...prevAmounts,
      [gemKey]: {
        ...prevAmounts[gemKey],
        amount: parsedValue // Ensure amount is a string
      }
    }));
  };

  // Handle product edit
  const handleEditProduct = async () => {
    // Transform gemAmounts to the required format
    const updatedGemData = {};
    Object.keys(gemAmounts).forEach(key => {
      const { gemId, amount } = gemAmounts[key];
      if (gemId && amount) {
        // Ensure amount is a string
        updatedGemData[gemId] = amount.toString();
      }
    });

    // Construct updated form data
    const updatedFormData = {
      ...formData,
      productGems: updatedGemData
    };

    // Log the final form data
    console.log('Updated form data:', updatedFormData);

    // Send the data to the server
    const result = await editProduct(updatedFormData);
    if (result.success) {
      onEditProduct(result); // Notify parent component
      handleCloseDialog(); // Close the dialog
    } else {
      // Show an error message to the user
      alert(result.message);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
          {/* Form Fields */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="productName"
            label="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Necklace">Necklace</MenuItem>
              <MenuItem value="Bracelet">Bracelet</MenuItem>
              <MenuItem value="Ring">Ring</MenuItem>
              <MenuItem value="Charm">Charm</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Material</InputLabel>
            <Select
              name="material"
              value={formData.material}
              onChange={handleChange}
            >
              {goldData.map((gold) => (
                <MenuItem key={gold.goldId} value={gold.goldId}>{gold.goldName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="weight"
            label="Weight"
            type="number"
            value={formData.weight || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="machiningCost"
            label="Machining Cost"
            type="number"
            value={formData.machiningCost || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="size"
            label="Size"
            type="number"
            value={formData.size || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="desc"
            label="Description"
            type="text"
            value={formData.desc || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="image"
            label="Image URL"
            type="text"
            value={formData.image || ''}
            onChange={handleChange}
          />

          {/* Gem Selection */}
          {gemData.map((gem, index) => (
            <div key={gem.gemId}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={propChecks[`gemProp${index + 1}`] || false}
                    onChange={handleCheckChange}
                    name={`gemProp${index + 1}`}
                  />
                }
                label={`Add Gem ${index + 1}`}
              />
              {propChecks[`gemProp${index + 1}`] && (
                <div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gem Type</InputLabel>
                    <Select
                      name={`gemProp${index + 1}.gemId`}
                      value={gemAmounts[`gemProp${index + 1}`]?.gemId || ''}
                      onChange={handleGemChange}
                    >
                      {gemData.map((g) => (
                        <MenuItem key={g.gemId} value={g.gemId}>{g.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    fullWidth
                    name={`gemProp${index + 1}.amount`}
                    label="Amount"
                    type="number"
                    value={gemAmounts[`gemProp${index + 1}`]?.amount || ''}
                    onChange={handleAmountChange}
                  />
                </div>
              )}
            </div>
          ))}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleEditProduct} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;

