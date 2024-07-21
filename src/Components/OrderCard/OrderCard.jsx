import React, { useEffect, useState } from 'react'
import image from '../../assets/earing.jpg'
import styles from '../OrderCard/OrderCard.module.scss'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Minimize } from '@mui/icons-material'

const OrderCard = ({
  id,
  name,
  price,
  priceWithDiscount,
  quantity,
  amount,
  increase,
  decrease,
}) => {
  return (
    <>
      <Box
        className={styles.cardContainer}
        sx={{ boxShadow: 3, borderRadius: 2 }}
      >
        <div className={styles.cardImage}>
          <img src={image}></img>
        </div>

        <div className={styles.cardContent}>
          <p style={{ fontWeight: 500 }}>{name}</p>
          {price === priceWithDiscount ? (
            <p style={{ fontWeight: 300, padding: 4 }}>
              {' '}
              {Number(priceWithDiscount).toLocaleString('en')}VND
            </p>
          ) : (
            <>
              <p
                style={{
                  fontWeight: 300,
                  padding: 4,
                  textDecoration: 'line-through',
                }}
              >
                {Number(priceWithDiscount).toLocaleString('en')}VND
              </p>
              <p style={{ fontWeight: 300, padding: 4 }}>
                {Number(priceWithDiscount).toLocaleString('en')}VND
              </p>
            </>
          )}

          <div className={styles.iconContainer}>
            <button className={styles.icon} onClick={decrease}>
              <RemoveIcon />
            </button>

            <div
              style={{
                margin: 25,
              }}
            >
              <div>{quantity}</div>
            </div>
            {quantity >= amount ? (
              <button disabled="true" className={styles.icondisable}>
                <AddIcon />
              </button>
            ) : (
              <button className={styles.icon} onClick={increase}>
                <AddIcon />
              </button>
            )}
            <div></div>
          </div>
        </div>
      </Box>
    </>
  )
}
export default OrderCard
