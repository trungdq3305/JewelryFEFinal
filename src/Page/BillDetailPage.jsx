import React, { useEffect, useState } from 'react'
import { getAllProductsv2, getProductByBill } from '../Configs/axios'
import { useParams } from 'react-router-dom'
import BillDetail from '../Components/BillDetail/BillDetail'

const BillDetailPage = () => {
  const { billId } = useParams()
  const [bill, setBill] = useState(null) // Initial state set to null

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
    getBill()
  }, [billId])

  return (
    <>
      <BillDetail billId={billId} bill={bill} />
    </>
  )
}

export default BillDetailPage
