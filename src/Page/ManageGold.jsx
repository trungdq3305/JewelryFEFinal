import React, { useEffect, useState } from 'react'
import GoldTable from '../Components/Gold/GoldTable'
import { getAllGold, updateGold } from '../Configs/axios'
import axios from 'axios'

const ManageGold = () => {
  const [gold, setGold] = useState([])

  const fetchGold = async () => {
    try {
      const res = await axios.get(
        '/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'
      )
      const goldList = res.data.DataList.Data
      goldList.forEach((element, index) => {
        const rowNumber = element['@row']
        const dateStr = element[`@d_${rowNumber}`]
        const [datePart, timePart] = dateStr.split(' ')
        const [day, month, year] = datePart.split('/')
        const [hours, minutes] = timePart.split(':')
        const modifiedDate = new Date(year, month - 1, day, hours, minutes)
        let goldJson = {
          goldId: String(index + 1),
          goldName: element[`@n_${rowNumber}`],
          purchasePrice: element[`@pb_${rowNumber}`],
          salePrice: element[`@ps_${rowNumber}`],
          modifiedDate: modifiedDate,
          kara: element[`@k_${rowNumber}`],
          goldPercent: element[`@h_${rowNumber}`],
          worldPrice: element[`@pt_${rowNumber}`],
        }
        console.log(goldJson)
        const update = updateGold(goldJson)
        console.log(update)
        loadGolds()
      })
      console.log(res.data.DataList.Data)
    } catch (error) {
      console.error('Error fetching the gold price:', error)
    }
  }
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
  return <GoldTable goldList={gold} handleFetchGold={fetchGold} />
}

export default ManageGold
