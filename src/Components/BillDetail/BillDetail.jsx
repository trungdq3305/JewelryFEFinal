import React from 'react'
import styles from '../Payment/PaymentSuccess.module.scss'

const BillDetail = ({ bill, billId, products }) => {
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

  if (!bill || bill.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ marginRight: '70px' }}>
          <h1 style={{ marginTop: '30px' }}>Bill No: </h1>
          <p>Publish Day:</p>
          <p>Cashier:</p>
          <p>Customer</p>
        </div>
        <div>
          <h1>{billId}</h1>
          <p>{formatDateTime(bill[0].billBill.publishDay)}</p>
          <p>{bill[0].billBill.cashierId}</p>
          {bill[0].billBill.customerId !== null ? (
            <p>{bill[0].billBill.customerId}</p>
          ) : (
            <p>N/A</p>
          )}
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
                <th>Price After Discount</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.productName || 'N/A'}</td>
                  <td>{product.quantity || 'N/A'}</td>
                  <td>
                    {product.price
                      ? Number(product.price.toFixed(0)).toLocaleString('vn')
                      : 'N/A'}{' '}
                  </td>
                  <td>
                    {product.priceWithDiscount
                      ? Number(
                          product.priceWithDiscount.toFixed(0)
                        ).toLocaleString('vn')
                      : 'N/A'}{' '}
                    VND
                  </td>
                  <td>
                    {product.priceWithDiscount && product.quantity
                      ? Number(
                          (
                            product.priceWithDiscount * product.quantity
                          ).toFixed(0)
                        ).toLocaleString('vn')
                      : 'N/A'}{' '}
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
            <p>{bill.length}</p>
            {bill[0].voucherVoucher ? (
              <p>
                {Number(
                  (
                    bill[0].billBill.totalCost - bill[0].voucherVoucher.cost
                  ).toFixed(0)
                ).toLocaleString('vn')}
              </p>
            ) : (
              <p>
                {Number(bill[0].billBill.totalCost.toFixed(0)).toLocaleString(
                  'vn'
                )}
              </p>
            )}
            {bill[0].voucherVoucher ? (
              <p>
                {Number(bill[0].voucherVoucher.cost.toFixed(0)).toLocaleString(
                  'vn'
                )}
              </p>
            ) : (
              <p>0</p>
            )}
            <p>
              <strong>
                {' '}
                {Number(bill[0].billBill.totalCost.toFixed(0)).toLocaleString(
                  'vn'
                )}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillDetail
