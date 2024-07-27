import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import CashBill from '../Components/CashBill/CashBill'
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
    if (!Array.isArray(bills)) return 0
    return bills.reduce((total, bill) => total + bill.totalCost, 0)
  }

  useEffect(() => {
    fetchCashBill()
  }, [])

  const totalCost = calculateTotalCost(cashBill)

  return (
    <>
      <Header />
      <CashBill cashBill={cashBill} totalCost={totalCost} />
    </>
  )
}

export default HistoryPage
