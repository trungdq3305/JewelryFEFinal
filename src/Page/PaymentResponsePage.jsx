import React, { useEffect, useState } from 'react'
import { createBill, getAllBill, reponseVnPay } from '../Configs/axios'
import { useLocation } from 'react-router-dom'
import PaymentSuccess from '../Components/Payment/PaymentSuccess'

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
    return <p>Loading...</p>
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
        <div>Payment unsuccessful</div>
      )}
    </>
  )
}

export default PaymentResponsePage
