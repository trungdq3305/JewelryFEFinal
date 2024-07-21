import React, { useEffect, useState } from 'react'
import { getAllProductsv2, getProductByBill } from '../Configs/axios'
import { useParams } from 'react-router-dom'
import BillDetail from '../Components/BillDetail/BillDetail'

const BillDetailPage = () => {
  const { billId } = useParams()
  const [bill, setBill] = useState(null) // Initial state set to null
  const [products, setProducts] = useState([])

  const getBill = async () => {
    console.log(billId)
    try {
      const billResponse = await getProductByBill(billId)
      setBill(billResponse.data.data)
      console.log(billResponse.data.data)
    } catch (error) {
      console.error('Error fetching bill:', error)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      if (bill != null) {
        const newProducts = await Promise.all(
          bill.map(async (element) => {
            console.log(element.productProductId)
            const result = await getAllProductsv2(
              element.productProductId,
              '',
              '',
              ''
            )
            if (result !== null) {
              return {
                price: result.data.data[0].price,
                priceWithDiscount: result.data.data[0].priceWithDiscount,
                productName: result.data.data[0].productName,
                quantity: element.amount,
              }
            }
            return null
          })
        )
        setProducts(newProducts.filter((product) => product !== null))
      }
    }

    fetchProducts()
  }, [bill])

  useEffect(() => {
    getBill()
  }, [billId])

  return (
    <>
      <BillDetail billId={billId} bill={bill} products={products} />
    </>
  )
}

export default BillDetailPage
