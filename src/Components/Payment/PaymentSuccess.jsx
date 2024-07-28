import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button } from '@mui/material'
import styles from '../Payment/PaymentSuccess.module.scss'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = ({
  sendBill,
  products,
  totalCost,
  voucherCost,
  costWithVoucher,
  bill,
}) => {
  const navigate = useNavigate()
  const formatDateTime = (dateString) => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    return `${formattedDate} at ${formattedTime}`
  }
  const numberOfProduct = () => {
    let result = 0
    products.forEach((element) => {
      result = result + element.Quantity
    })
    return result
  }

  if (!bill) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: 90, marginTop: '20px' }}
          />
        </div>
        <h1>Payment success </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              marginRight: '70px',
            }}
          >
            <p>Bill No: </p>
            <p>Publish Day:</p>
            <p>Cashier:</p>
            <p>Customer</p>
          </div>
          <div>
            <p>{bill.billId}</p>
            <p>{formatDateTime(bill.publishDay)}</p>
            <p>{bill.cashierId}</p>
            {bill.customerId !== null ? <p>{bill.customerId}</p> : <p>N/A</p>}
          </div>
        </div>
        <div className={styles.bill}>
          <div className={styles.billTableWrapper}>
            <table className={styles.billTable}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.Name}</td>
                    <td>{product.Quantity}</td>

                    <td>
                      {Number(
                        product.PriceWithDiscount.toFixed(0)
                      ).toLocaleString('vn')}{' '}
                      VND
                    </td>
                    <td>
                      {Number(
                        (product.PriceWithDiscount * product.Quantity).toFixed(
                          0
                        )
                      ).toLocaleString('vn')}{' '}
                      VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryTitle}>
              <p>
                <strong>Number of Products: </strong>
              </p>
              <p>
                <strong>Cost: </strong>
              </p>
              <p>
                <strong>Voucher: </strong>
              </p>
              <p className={styles.totalCost}>
                <strong>Total Cost: </strong>
              </p>
            </div>
            <div className={styles.summaryContain}>
              <p>{numberOfProduct()}</p>
              <p>{Number(totalCost.toFixed(0)).toLocaleString('vn')}</p>
              <p>{Number(voucherCost.toFixed(0)).toLocaleString('vn')}</p>
              <p>{Number(costWithVoucher.toFixed(0)).toLocaleString('vn')}</p>
            </div>
          </div>
        </div>
        {bill.customerId !== null ? (
          <>
            {' '}
            <div>
              <Button
                onClick={() => {
                  navigate('/StaffPage')
                }}
                variant="contained"
                sx={{
                  background: 'black',
                  height: '50px',
                  width: '120px',
                  color: '#ffdbf0',
                  marginRight: '20px',
                  '&:hover': {
                    backgroundColor: '#ffdbf0',
                    color: 'black',
                  },
                }}
              >
                Back to homepage
              </Button>

              <Button
                onClick={sendBill}
                variant="contained"
                sx={{
                  marginRight: '20px',
                  width: '120px',
                  height: '50px',
                  background: 'black',
                  color: '#ffdbf0',
                  '&:hover': {
                    backgroundColor: '#ffdbf0',
                    color: 'black',
                  },
                }}
              >
                Send bill
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Button
                onClick={() => {
                  navigate('/StaffPage')
                }}
                variant="contained"
                sx={{
                  background: 'black',
                  height: '50px',
                  width: '120px',
                  color: '#ffdbf0',
                  marginRight: '20px',
                  '&:hover': {
                    backgroundColor: '#ffdbf0',
                    color: 'black',
                  },
                }}
              >
                Back to homepage
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default PaymentSuccess
