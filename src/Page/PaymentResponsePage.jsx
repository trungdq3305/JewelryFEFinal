import React, { useEffect, useState } from 'react'
import { createBill, reponseVnPay } from '../Configs/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import PaymentSuccess from '../Components/Payment/PaymentSuccess'
import { Button } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

const PaymentResponsePage = () => {
  const [paymentResponse, setPaymentResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [billProduct, setBillProduct] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [voucherCost, setVoucherCost] = useState(0)
  const [costWithVoucher, setCostWithVoucher] = useState(0)
  const [customerId, setCustomerId] = useState('')
  const [voucherId, setVoucherId] = useState('')
  const [bill, setBill] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve values from session storage
    const storedBillProducts = sessionStorage.getItem('billProducts')
    const storedTotalCost = sessionStorage.getItem('totalCost')
    const storedVoucherCost = sessionStorage.getItem('voucherCost')
    const storedCostWithVoucher = sessionStorage.getItem('costWithVoucher')
    const storedCustomerId = sessionStorage.getItem('customerId')
    const storedVoucherId = sessionStorage.getItem('voucherId')

    if (storedBillProducts) {
      setBillProduct(JSON.parse(storedBillProducts))
    }
    if (storedTotalCost) {
      setTotalCost(parseFloat(storedTotalCost))
    }
    if (storedVoucherCost) {
      setVoucherCost(parseFloat(storedVoucherCost))
    }
    if (storedCostWithVoucher) {
      setCostWithVoucher(parseFloat(storedCostWithVoucher))
    }
    if (storedCustomerId) {
      setCustomerId(storedCustomerId)
    }
    if (storedVoucherId) {
      setVoucherId(storedVoucherId)
    }
  }, [])

  useEffect(() => {
    const fetchPaymentResponse = async () => {
      try {
        const query = new URLSearchParams(location.search)
        const params = Object.fromEntries(query.entries())
        const response = await reponseVnPay(params)
        console.log(response)
        setPaymentResponse(response.data)
      } catch (error) {
        console.error('Error fetching payment response:', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentResponse()
  }, [location])

  useEffect(() => {
    if (paymentResponse?.success === true) {
      let product = {}
      billProduct.forEach((p) => {
        product[p.Id] = p.Quantity
      })

      const initialdata = {
        product: {},
        voucherId: voucherId || '',
        customerId: customerId || '',
      }
      initialdata.product = product

      const createBillAsync = async () => {
        try {
          const result = await createBill(initialdata)
          if (result.data?.code === 200) {
            console.log(result)
            setBill(result.data.data)
            sessionStorage.removeItem('cardValues')
          } else {
            console.error('Error creating bill:', result)
          }
        } catch (error) {
          console.error('Error creating bill:', error)
        }
      }

      createBillAsync()
    }
  }, [paymentResponse, billProduct, voucherId, customerId])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    )
  }

  if (!paymentResponse) {
    return <p>No payment response available.</p>
  }

  return (
    <>
      {paymentResponse.success === true ? (
        <PaymentSuccess
          products={billProduct}
          totalCost={totalCost}
          voucherCost={voucherCost}
          costWithVoucher={costWithVoucher}
          bill={bill}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <ErrorIcon color="error" sx={{ fontSize: 90, marginTop: '20px' }} />
          </div>
          <div>
            <h1>Payment Failed</h1>
          </div>
          <div>
            <Button
              onClick={() => {
                navigate('/StaffPage')
              }}
              variant="contained"
              sx={{
                background: 'black',
                height: '70px',
                width: '150px',
                color: '#ffdbf0',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              Back to homepage
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentResponsePage
