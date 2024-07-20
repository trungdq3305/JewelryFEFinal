import React from 'react'
import { Grid } from '@mui/material'
import ProductItem from '../ProductItem/ProductItem'
import styles from '../ProductList/ProductList.module.scss'
import SearchProduct from '../SearchProduct/SearchProduct'
import { Margin } from '@mui/icons-material'

const ProductList = ({
  products,
  addProduct,
  handleSearchBy,
  setSearchQuery,
  searchBy,
  handleSearch,
  filterProduct,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {filterProduct !== '' ? (
            <div
              className={styles.category}
              style={{
                alignContent: 'center',
                marginLeft: '20px',
                backgroundColor: '#ffdbf0',
                padding: '15px',
                height: '20px',
                borderRadius: '5px',
                color: 'black',
              }}
            >
              {filterProduct}
            </div>
          ) : (
            <div></div>
          )}

          <SearchProduct
            setSearchQuery={setSearchQuery}
            handleSearchBy={handleSearchBy}
            searchBy={searchBy}
            handleSearch={handleSearch}
          />
        </div>

        <Grid
          className={styles.product}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',

            gap: 1,
          }}
        >
          {products !== null ? (
            products.map((product) => {
              return (
                <Grid key={product.productId}>
                  <ProductItem
                    priceWithDiscount={product.priceWithDiscount}
                    addProduct={addProduct}
                    id={product.productId}
                    name={product.productName}
                    price={product.price}
                    amount={product.amount}
                  ></ProductItem>
                </Grid>
              )
            })
          ) : (
            <div></div>
          )}
        </Grid>
      </div>
    </>
  )
}

export default ProductList
