import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import styles from '../Page/Scss/Goldpage.module.scss'
import Gold from '../Components/Gold/Gold'
import axios from 'axios'
import { getAllGold } from '../Configs/axios'

function GoldPage() {
  const [gold, setGold] = useState([])
  const loadGolds = async () => {
    const result = await getAllGold()
    if (result !== null) {
      setGold(result.data)
    }

    console.log(result.data)
  }
  useEffect(() => {
    loadGolds()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.bodyContainer}>
          <Gold goldList={gold} />
        </div>
      </div>
    </>
  )
}

export default GoldPage
