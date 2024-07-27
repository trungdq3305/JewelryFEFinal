import React from 'react'
import styles from '../BillProduct/BillProduct.module.scss'

const BillProduct = ({ products, totalCost, voucherCost, costWithVoucher }) => {
  return (
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
            {products.map((product, index) => {
              return (
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
                      (product.PriceWithDiscount * product.Quantity).toFixed(0)
                    ).toLocaleString('vn')}{' '}
                    VND
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
          <p>{products.length}</p>
          <p>{Number(totalCost.toFixed(0)).toLocaleString('vn')}</p>
          <p>{Number(voucherCost.toFixed(0)).toLocaleString('vn')}</p>
          <p>{Number(costWithVoucher.toFixed(0)).toLocaleString('vn')}</p>
        </div>
      </div>
    </div>
  )
}

export default BillProduct
