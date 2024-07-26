import React from 'react'
import productImage from '../../assets/earing.jpg'
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material'
import classes from '../ProductDetail/ProductDetail.module.scss'
const ProductDetail = ({
  id,
  name,
  category,
  material,
  gem,
  desc,
  size,
  weight,
  machining,
  price,
  priceWithDiscount,
  discount,
}) => {
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={5}>
        <div className={classes.image}>
          <img src={productImage} />
        </div>
      </Grid>
      <Grid item xs={12} md={7} className={classes.details}>
        <Typography variant="h3" gutterBottom>
          {name}
        </Typography>
        <div className={classes.description}>
          <div className={classes.left}>
            <div className={classes.props}>
              <p className={classes.title}>Id</p>

              <p>{id}</p>
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Category</p>
              <p>{category}</p>
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Material</p>
              <p>{category}</p>
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Gem</p>
              {gem !== null ? (
                typeof gem === 'object' ? (
                  Object.entries(gem).map(([key, value]) => (
                    <p key={key}>
                      {key}: {value}
                    </p>
                  ))
                ) : (
                  <p>{gem}</p>
                )
              ) : (
                <p>None</p>
              )}
            </div>

            <div className={classes.props}>
              <p className={classes.title}>Desc</p>
              <p>{desc} </p>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.props}>
              <p className={classes.title}>Weight</p>
              <p>{weight}</p>{' '}
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Machining cost</p>
              <p>{machining}</p>{' '}
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Price</p>
              <p> {Number(price).toLocaleString('vn')} VND</p>{' '}
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Price with discount</p>
              <p> {Number(priceWithDiscount).toLocaleString('vn')} VND</p>{' '}
            </div>
            <div className={classes.props}>
              <p className={classes.title}>Discount</p>
              {discount.length > 0 ? (
                discount.map((element, index) => <p key={index}>{element}</p>)
              ) : (
                <p>None</p>
              )}
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default ProductDetail
