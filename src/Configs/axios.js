import axios from 'axios'

const api = 'https://localhost:7093/api'
export const getAllProducts = async (
  productId,
  productName,
  Category,
  Material
) => {
  try {
    // const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    // const data = await axios.get(api + '/products/view-product' + query)
    const data = await axios.get(api + '/products/get-products')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getAllProductsv2 = async (
  productId,
  productName,
  Category,
  Material
) => {
  try {
    const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    const data = await axios.get(api + '/products/view-product' + query)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}

// export const getAllGem = async () => {
//   try {
//     const data = await axios.get(api + '/gem')
//     console.log(data.data)
//     return data.data
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error massage: ', error.message)
//       return error.message
//     } else {
//       console.log('Unexpected error: ', error)
//       return 'An unexpected error has occired'
//     }
//   }
// }
export const addProduct = async (formData) => {
  try {
    const data = await axios.post(api + '/products/create-product', formData)
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}
export const searchProduct = async (searchValue) => {
  try {
    const data = await axios.get(
      api + `/products/get-by-id?productId=${searchValue}`
    )
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const editProduct = async (formData) => {
  try {
    const data = await axios.put(api + '/products/product-update', formData)
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getAllVouchers = async () => {
  try {
    const data = await axios.get(api + '/voucher/viewlistvoucher')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}

export const addVoucher = async (formData) => {
  try {
    const data = await axios.post(api + '/voucher/createvoucher', formData)
    alert('\nAdd voucher succesfully')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      alert(
        '\nPlease enter exist User ID\nPublished Day < Expired Day \nCost > 100000'
      )
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      alert('An unexpected error has occurred')
      return 'An unexpected error has occired'
    }
  }
}

export const editVoucher = async (formData) => {
  try {
    const response = await axios.put(api + '/voucher/updatedvoucher', formData)
    alert('\nEdit voucher succesfully')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}

export const deleteVoucher = async (voucherId) => {
  try {
    const response = await axios.delete(
      api + `/voucher/deletevoucher?VoucherId=${voucherId}`
    )
    alert('\nDelete voucher succesfully')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getVouchers = async (params) => {
  try {
    const response = await axios.get(api + '/voucher/viewlistvoucher', {
      params,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
export { getVouchers }
export const getAllUsers = async () => {
  try {
    const data = await axios.get(api + '/user/view-list-users')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}
export const addUser = async (formData) => {
  try {
    const data = await axios.post(api + '/user/create-user', formData)
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occurred'
    }
  }
}
export const updateRole = async (userId, newRole) => {
  try {
    const data = await axios.put(api + '/user/update-role', {
      id: userId,
      role: newRole,
    })
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message', error.message)
      return error.message
    } else {
      console.log('Unexpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
// export const searchUser = async (searchValue) => {
//   try {
//     const data = await axios.get(
//       api + `/user/view-list-users?id=${searchValue}`
//     )
//     console.log(data)
//     return data
//   }
// }
export const getAllGem = async () => {
  try {
    const reponse = await axios.get(api + '/gem/viewlistgem')
    return reponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}

export const updateGem = async (formData) => {
  try {
    const response = await axios.put(api + '/gem/updategem', formData)
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`)
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message:', error.message)
      throw new Error(error.message)
    } else {
      console.log('Unexpected error:', error)
      throw new Error('An unexpected error has occurred')
    }
  }
}

const getGems = async (params) => {
  try {
    const response = await axios.get(api + '/gem/viewlistgem', { params })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
export { getGems }
export const activeDeactiveUser = async (userId) => {
  try {
    const data = await axios.put(
      api + `/user/active-deactive-user?id=${userId}`
    )
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const searchUser = async (searchValue) => {
  try {
    const data = await axios.get(
      api + `/user/view-list-users?id=${searchValue}`
    )
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getCustomer = async () => {
  try {
    const data = await axios.get(api + '/customers/get-customers')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getVouchersv2 = async (params) => {
  try {
    const response = await axios.get(api + '/voucher/viewlistvoucherv2', {
      params,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
export const addGem = async (formData) => {
  try {
    const response = await axios.post(api + '/gem/creategem', formData)
    return { isSuccess: true, data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error message: ', error.message)
      return {
        isSuccess: false,
        message: error.response?.data?.message || error.message,
      }
    } else {
      console.log('Unexpected error: ', error)
      return { isSuccess: false, message: 'An unexpected error has occurred' }
    }
  }
}

export const getAllCustomers = async () => {
  try {
    const data = await axios.get(api + '/customers/get-customers')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}

export const addCustomer = async (formData) => {
  try {
    const data = await axios.post(api + '/customers/create-customer', formData)
    alert('\nAdd customer succesfully')
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      alert('\nEmail or Phone Number Already Exist')
      return error.message
    } else {
      console.log('Unexpected error: ', error)

      return 'An unexpected error has occired'
    }
  }
}

export const editCustomer = async (formData) => {
  try {
    const response = await axios.put(
      api + '/customers/customer-update',
      formData
    )
    alert('\nEdit customer succesfully')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}

export const updateCustomerStatus = async (customerId) => {
  const response = await axios.put(
    api + `/customers/status-update?id=${customerId}`,
    {
      // Assuming your API expects a 'status' field for updating
    }
  )
  alert('\nUpdate status succesfully')
  return response.data // Return response data if needed
}

export const getCustomersByName = async (searchCustomerName) => {
  try {
    const response = await axios.get(api + '/customers/get-customers-by-name', {
      params: { searchCustomerName },
    })
    return response.data // Trả về dữ liệu từ phản hồi của API
  } catch (error) {
    throw new Error('Error fetching customers by name: ' + error.message)
  }
}

export const getCustomerByPhone = async (phone) => {
  try {
    const response = await axios.get(api + '/customers/get-customer-by-phone', {
      params: { phone },
    })
    console.log(response)
    return response.data // Trả về dữ liệu từ phản hồi của API
  } catch (error) {
    throw new Error('Error fetching customer by phone: ' + error.message)
  }
}

export const createBill = async (formData) => {
  try {
    const data = await axios.post(api + '/bill/create-bill', formData)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)

      return 'An unexpected error has occired'
    }
  }
}

export const updateDiscount = async (formData) => {
  try {
    const response = await axios.put(
      api + '/discount/update-discount',
      formData
    )
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`)
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message:', error.message)
      throw new Error(error.message)
    } else {
      console.log('Unexpected error:', error)
      throw new Error('An unexpected error has occurred')
    }
  }
}

export const addDiscount = async (formData) => {
  try {
    const response = await axios.post(
      api + '/discount/create-discount',
      formData
    )
    return { isSuccess: true, data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error message: ', error.message)
      return {
        isSuccess: false,
        message: error.response?.data?.message || error.message,
      }
    } else {
      console.log('Unexpected error: ', error)
      return { isSuccess: false, message: 'An unexpected error has occurred' }
    }
  }
}

const getDiscount = async (params) => {
  try {
    const response = await axios.get(api + '/discount/view-discount', {
      params,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
export { getDiscount }
export const deleteDiscount = async (discountid) => {
  try {
    const response = await axios.delete(
      api + `/discount/delete-discount?discountid=${discountid}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchGold = async () => {
  try {
    const response = await axios.get(
      'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'
    )
    return response
  } catch (error) {
    console.error(error)
  }
}

export const deleteGold = async () => {
  try {
    const response = await axios.delete(api + '/gold/delete-golds')
    return response
  } catch (error) {
    console.error(error)
    return []
  }
}

export const updateGold = async (params) => {
  try {
    const response = await axios.put(api + '/gold/gold-update', params)
    return response
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getAllGold = async () => {
  try {
    const response = await axios.get(api + '/gold/get-golds')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
export const getAllCashier = async () => {
  try {
    const response = await axios.get(api + '/cashier/get-cashiers')
    console.log(response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const addCashier = async (formData) => {
  try {
    const data = await axios.post(api + '/cashier/create-cashier', formData)
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occurred'
    }
  }
}
export const searchCashier = async (searchValue) => {
  try {
    const data = await axios.get(
      api + `/cashier/search-by-user-id?id=${searchValue}`
    )
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const updateCashier = async (formData) => {
  try {
    const response = await axios.put(api + '/cashier/cashier-update', formData)
    console.log(response)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}
export const getAllBill = async (start, end, id) => {
  try {
    const query = `?stardate=${start}&enddate=${end}&Id=${id}`
    const data = await axios.get(api + '/bill/viewlistbill' + query)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}
