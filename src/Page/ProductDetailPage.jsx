import React, { useEffect, useState } from 'react'
import ProductDetail from '../Components/ProductDetail/ProductDetail'
import Header from '../Components/Header/Header'
import { getAllProducts, getAllProductsv2 } from '../Configs/axios'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null) // State to hold the product details

  const fetchProduct = async () => {
    try {
      const response = await getAllProductsv2(id, '', '', '')
      if (response !== null) {
        const newProduct = response.data.data[0]
        setProduct(newProduct)
        console.log(response.data.data[0])
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  return (
    <>
      <Header />
      {product !== null ? (
        <ProductDetail
          id={product.productId}
          name={product.productName}
          category={product.category}
          desc={product.desc}
          discount={product.discount}
          machining={product.machiningCost}
          material={product.material}
          price={product.price}
          priceWithDiscount={product.priceWithDiscount}
          size={product.size}
          weight={product.weight}
          gem={product.productGems}
        />
      ) : (
        <div></div>
      )}
    </>
  )
}

export default ProductDetailPage
