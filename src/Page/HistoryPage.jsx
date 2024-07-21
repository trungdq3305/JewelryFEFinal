import React from 'react'
import Header from '../Components/Header/Header'
import CashBill from '../Components/CashBill/CashBill'
import { List } from '@mui/material'

const HistoryPage = () => {
  const cashBill = []
  return (
    <>
      <Header />
      <CashBill cashBill={cashBill} />
    </>
  )
}

export default HistoryPage
