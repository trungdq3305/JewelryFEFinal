import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import CashBill from '../Components/CashBill/CashBill'
import { List } from '@mui/material'
import { getBillByCash } from '../Configs/axios'

const HistoryPage = () => {
  const [cashBill, setCashBill] = useState([])

  const fetchCashBill = async () => {
    try {
      const res = await getBillByCash()
      console.log(res.data)
      setCashBill(res.data)
    } catch (error) {
      console.error('Failed to fetch cash bill:', error)
    }
  }
  const calculateTotalCost = (bills) => {
    return bills.reduce((total, bill) => total + bill.totalCost, 0)
  }

  const totalCost = calculateTotalCost(cashBill)

  useEffect(() => {
    fetchCashBill()
  }, [])

  return (
    <>
      <Header />
      <CashBill cashBill={cashBill} totalCost={totalCost} />
    </>
  )
}

export default HistoryPage
