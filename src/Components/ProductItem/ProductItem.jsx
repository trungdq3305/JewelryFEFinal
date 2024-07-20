import React from 'react'
import productImage from '../../assets/earing.jpg'
import styles from '../ProductItem/ProductItem.module.scss'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const ProductItem = ({
  id,
  name,
  price,
  priceWithDiscount,
  addProduct,
  amount,
}) => {
  const navigate = useNavigate()

  const viewDetail = () => navigate(`/ViewDetailPage/${id}`)
  return (
    // <div> Hello</div>
    <>
      <Box className={styles.item} sx={{ boxShadow: 3 }}>
        <img src={productImage} alt="product" />
        <div className={styles.desc}>
          <div className={styles.detail}>
            <h3 style={{ fontWeight: '500' }}>{name}</h3>
            {price === priceWithDiscount ? (
              <>
                <p style={{ color: '#cc3366', fontWeight: 'bolder' }}>
                  {Number(price).toLocaleString('en')}VND
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'light',
                    textDecoration: 'line-through',
                  }}
                >
                  {Number(price).toLocaleString('en')}VND
                </p>
                <p
                  style={{
                    color: '#cc3366',
                    fontWeight: 'bolder',
                  }}
                >
                  {Number(priceWithDiscount).toLocaleString('en')}VND
                </p>
              </>
            )}

            <p>
              <a
                style={{
                  fontStyle: 'italic',
                  fontSize: '15px',
                }}
                href=""
                onClick={viewDetail}
              >
                View Detail{' '}
              </a>
              {/* <button>Add</button> */}
            </p>
            <form onSubmit={addProduct}>
              <input readOnly={true} hidden={true} value={id}></input>
              {amount <= 0 ? (
                <div style={{ color: 'red', fontWeight: 'bolder' }}>
                  Out of stock
                </div>
              ) : (
                <button
                  type="submit"
                  style={{ fontFamily: 'Fira Sans', fontWeight: '400' }}
                >
                  Add
                </button>
              )}
            </form>
          </div>
        </div>
      </Box>
    </>
  )
}

export default ProductItem
