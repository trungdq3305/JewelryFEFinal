import React from 'react'
import styles from '../Payment/PaymentSuccess.module.scss'

const BillDetail = ({ bill, billId }) => {
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
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {bill.map((billItem, index) => {
                const product = billItem.productProduct
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.productName || 'N/A'}</td>
                    <td>{billItem.amount || 'N/A'}</td>
                    <td>
                      {billItem.unitPrice
                        ? Number(billItem.unitPrice.toFixed(0)).toLocaleString(
                            'vn'
                          )
                        : 'N/A'}
                    </td>

                    <td>
                      {billItem.unitPrice && billItem.amount
                        ? Number(
                            (billItem.unitPrice * billItem.amount).toFixed(0)
                          ).toLocaleString('vn')
                        : 'N/A'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryTitle}>
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
