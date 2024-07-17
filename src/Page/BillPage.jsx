import React, { useEffect, useState } from 'react'
import BillProduct from '../Components/BillProduct/BillProduct'
import styles from '../Page/Scss/Billpage.module.scss'
import Header from '../Components/Header/Header'
import BillInfor from '../Components/BillInfor/BillInfor'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CustomerList from '../Components/CustomerList/CustomerList'
import {
  createBill,
  getAllBill,
  getCustomer,
  getVouchers,
  getVouchersv2,
} from '../Configs/axios'
import PayByCashModal from '../Components/Payment/PayByCashModal'
import PaymentSuccess from '../Components/Payment/PaymentSuccess'
import axios from 'axios'

const BillPage = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    maxHeight: '80vh', // maximum height for the modal
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  }
  const [open, setOpen] = useState(false)
  const [openCash, setOpenCash] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const handleCloseSuccess = () => setOpenSuccess(false)
  const handleOpenCash = () => setOpenCash(true)
  const handleCloseCash = () => setOpenCash(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [billProduct, setBillProduct] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState()
  const [voucherList, setVoucherList] = useState([])
  const [voucher, setVoucher] = React.useState(0)
  const [costWithVoucher, setCostwithVoucher] = useState(0)
  const [change, setChange] = useState(0)
  const [cash, setCash] = useState(0)
  const [voucherId, setVoucherId] = useState('')
  const [billId, setBillId] = useState('')
  const [bill, setBill] = useState(null)

  const inputCash = (e) => {
    if (e.target.value !== undefined) {
      setCash(e.target.value)
    }
  }

  const handlecreateBill = async () => {
    let product = {}
    billProduct.forEach((p) => {
      product[p.Id] = p.Quantity
    })

    const initialdata = {
      product: {},
      voucherId: '',
      customerId: '',
    }
    if (voucherId !== undefined) {
      initialdata.voucherId = voucherId
    }
    if (customer !== undefined) {
      initialdata.customerId = customer.customerId
    }
    initialdata.product = product

    const result = await createBill(initialdata)
    if (result.data.code === 200) {
      setOpenSuccess(true)
      setOpenCash(false)
      console.log(result)
      setBillId(result.data.data.billId)
      sessionStorage.removeItem('cardValues')
    }
  }

  useEffect(() => {
    const getBill = async () => {
      if (billId) {
        const getAll = await getAllBill('', '', billId)
        if (getAll.data.data[0] !== null) {
          console.log(getAll.data.data[0])
          setBill(getAll.data.data[0])
        }
      }
    }
    getBill()
  }, [billId])

  const calculateChange = () => {
    const res = cash - totalCost
    setChange(res)
  }

  const handleChange = async (event) => {
    if (event.target.value !== 'none') {
      const params = {
        publishDay: {
          Year: '',
          Month: '',
          Day: '',
        },
        customerId: customer.customerId,
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        isActive: true,
        Id: event.target.value,
      }
      console.log(params)
      const vouchers = await getVouchersv2(params)
      console.log(vouchers.data)
      console.log(vouchers.data[0].cost)
      setVoucher(vouchers.data[0].cost)
      setVoucherId(vouchers.data[0].voucherId)
    } else {
      setVoucher(0)
      setVoucherId('')
    }
    console.log(event.target.value)
  }

  const loadCustomers = async () => {
    const result = await getCustomer()
    if (result !== null) {
      setCustomerList(result.data)
    }

    console.log(result.data)
  }

  const loadVouchers = async () => {
    try {
      const params = {
        publishDay: {
          Year: '',
          Month: '',
          Day: '',
        },
        customerId: customer.customerId,
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        isActive: true,
        Id: '',
      }
      console.log(params)
      const vouchers = await getVouchersv2(params)
      console.log(vouchers.data)
      setVoucherList(vouchers.data)
    } catch (error) {
      console.error(error)
    }
  }

  const loadBillProduct = () => {
    const productList = sessionStorage.getItem('cardValues')
    if (productList != null) {
      setBillProduct(JSON.parse(productList))
    }

    console.log(JSON.parse(productList))
  }

  const calculateCost = () => {
    const cost = billProduct.reduce(
      (total, card) => total + card.PriceWithDiscount * card.Quantity,
      0
    )
    setTotalCost(cost)
  }

  const calculateCostwVoucher = () => {
    const result = totalCost - voucher
    setCostwithVoucher(result)
  }

  const addCustomer = (cus) => {
    setCustomer(cus)
    handleClose()
  }

  useEffect(() => {
    loadBillProduct()
    loadCustomers()
  }, [])

  useEffect(() => {
    loadVouchers()
  }, [customer])

  useEffect(() => {
    calculateCostwVoucher()
  }, [voucher, calculateCostwVoucher])

  useEffect(() => {
    calculateCost()
  }, [billProduct])

  useEffect(() => {
    calculateChange()
  }, [cash])

  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.bodyContainer}>
          <div className={styles.title}>
            <h2>Bill Summary</h2>
          </div>
          <div className={styles.body}>
            <BillInfor
              handleOpen={handleOpen}
              customer={customer}
              vouchers={voucherList}
              handleChange={handleChange}
              handleOpenCash={handleOpenCash}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CustomerList
                  customerList={customerList}
                  addCustomer={addCustomer}
                />
              </Box>
            </Modal>
            <Modal
              open={openCash}
              onClose={handleCloseCash}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <PayByCashModal
                  createBill={handlecreateBill}
                  handleCloseCash={handleCloseCash}
                  total={totalCost}
                  cash={inputCash}
                  change={change}
                />
              </Box>
            </Modal>
            <Modal
              open={openSuccess}
              onClose={handleCloseSuccess}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <PaymentSuccess
                  bill={bill}
                  products={billProduct}
                  totalCost={totalCost}
                  voucherCost={voucher}
                  costWithVoucher={costWithVoucher}
                />
              </Box>
            </Modal>
            <BillProduct
              products={billProduct}
              totalCost={totalCost}
              voucherCost={voucher}
              costWithVoucher={costWithVoucher}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BillPage
