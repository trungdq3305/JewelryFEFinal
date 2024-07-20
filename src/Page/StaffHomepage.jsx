import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import { getAllGem, getAllProducts, getAllProductsv2 } from '../Configs/axios'
import Pagination from '@mui/material/Pagination'

import ProductList from '../Components/ProductList/ProductList'
import Order from '../Components/Order/Order'
import style from '../Page/Scss/StaffHomepage.module.scss'
import { List } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const StaffHomepage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(8)
  const [products, setProducts] = useState([])
  const [cardValues, setCardValues] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState('')
  const [searchBy, setSearchBy] = React.useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const loadProducts = async () => {
    const result = await getAllProductsv2('', '', filteredProducts, '')
    if (result !== null) {
      setProducts(result.data.data)
    }

    console.log(result.data.data)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  const addProduct = async (e) => {
    e.preventDefault()
    const card = await getAllProductsv2(e.target[0].value, '', '', '')
    const newProduct = card.data.data[0]
    card.data.data[0].amount = card.data.data[0].amount - 1
    var getOldData = JSON.parse(sessionStorage.getItem('cardValues'))
    if (getOldData == null || getOldData.length == 0) {
      let newProductJSON = {
        Id: newProduct.productId,
        Name: newProduct.productName,
        Size: newProduct.size,
        ProductGems: newProduct.productGems,
        Price: newProduct.price,
        PriceWithDiscount: newProduct.priceWithDiscount,
        Material: newProduct.material,
        MachiningCost: newProduct.machiningCost,
        image: newProduct.image,
        discount: newProduct.discount,
        desc: newProduct.desc,
        category: newProduct.category,
        amount: newProduct.amount,
        Quantity: 1,
      }
      getOldData = [newProductJSON]

      console.log(getOldData)
    } else {
      let obj = getOldData.find((x) => x.Id === newProduct.productId)
      console.log(obj)
      // getOldData.forEach((element) => {
      //   if (newProduct.productId === element.Id) {
      //     element.Quantity++
      //     setCardValues(getOldData)
      //     sessionStorage.setItem('cardValues', JSON.stringify(getOldData))
      //     console.log('true')
      //     console.log(newProduct.productId)
      //     console.log(element.Id)
      //     console.log('sai dieu kien')
      //     return
      //   }
      // })
      if (obj !== undefined) {
        obj.Quantity++
      } else {
        let newProductJSON = {
          Id: newProduct.productId,
          Name: newProduct.productName,
          Size: newProduct.size,
          ProductGems: newProduct.productGems,
          Price: newProduct.price,
          PriceWithDiscount: newProduct.priceWithDiscount,
          Material: newProduct.material,
          MachiningCost: newProduct.machiningCost,
          image: newProduct.image,
          discount: newProduct.discount,
          desc: newProduct.desc,
          category: newProduct.category,
          amount: newProduct.amount,
          Quantity: 1,
        }
        console.log('false')
        getOldData.push(newProductJSON)
      }
    }
    setCardValues(getOldData)
    sessionStorage.setItem('cardValues', JSON.stringify(getOldData))
  }

  // const updateCardValue = [...cardValues, card.data.data[0]]
  // setCardValues(updateCardValue)
  // console.log(cardValues[1].value.productId)
  // const index = cardValues.findIndex(
  //   (item) => item.value.productId == newProduct.productId
  // )
  // console.log('heelllo')
  // if (cardValues.find((value) => value.id === newProduct.id)) {
  //   return
  // } else {
  //   const updatedCardValues = [...cardValues, newProduct]
  //   setCardValues(updatedCardValues)
  //   sessionStorage.setItem('cardValues', JSON.stringify(updatedCardValues))
  //   sessionStorage.removeItem
  // }

  const calculateCost = () => {
    const cost = cardValues.reduce(
      (total, card) => total + card.PriceWithDiscount * card.Quantity,
      0
    )
    setTotalCost(cost)
  }

  const handleCategory = (category) => {
    if (category.target.innerHTML !== 'All') {
      setFilteredProducts(category.target.innerHTML)
    } else {
      setFilteredProducts('')
    }
  }
  const increase = async (id) => {
    const card = await getAllProductsv2(id, '', '', '')
    const newProduct = card.data.data[0]
    card.data.data[0].amount = card.data.data[0].amount - 1

    var getOldData = JSON.parse(sessionStorage.getItem('cardValues'))
    getOldData.forEach((element) => {
      if (newProduct.productId === element.Id) {
        element.Quantity++
      }
      setCardValues(getOldData)
      sessionStorage.setItem('cardValues', JSON.stringify(getOldData))
    })
  }
  const decrease = async (id) => {
    const card = await getAllProductsv2(id, '', '', '')
    const newProduct = card.data.data[0]
    card.data.data[0].amount = card.data.data[0].amount + 1

    var getOldData = JSON.parse(sessionStorage.getItem('cardValues'))

    getOldData = getOldData
      .map((element) => {
        if (newProduct.productId === element.Id) {
          element.Quantity -= 1
        }
        return element
      })
      .filter((element) => element.Quantity > 0)

    setCardValues(getOldData)
    sessionStorage.setItem('cardValues', JSON.stringify(getOldData))
  }
  const handleSearchQuery = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }
  const handleSearch = async () => {
    console.log('handle search')
    console.log(searchBy)
    console.log(searchQuery)

    if (searchBy == 'Id') {
      const result = await getAllProductsv2(
        searchQuery,
        '',
        filteredProducts,
        ''
      )
      console.log('Id')
      setProducts(result.data.data)
    } else if (searchBy == 'Name') {
      const result = await getAllProductsv2(
        '',
        searchQuery,
        filteredProducts,
        ''
      )
      console.log('Name')
      setProducts(result.data.data)
    }
    console.log(products)
  }

  const handleSearchBy = (event) => {
    event.preventDefault()
    setSearchBy(event.target.value)
  }
  useEffect(() => {
    loadProducts()
    // handleCategory()
    const storedCardValues = sessionStorage.getItem('cardValues')
    if (storedCardValues) {
      setCardValues(JSON.parse(storedCardValues))
    }
  }, [filteredProducts])

  useEffect(() => {
    calculateCost()
  }, [cardValues])

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard)

  return (
    <div className={style.container}>
      <Header handleCategory={handleCategory} />
      <div className={style.body}>
        <ProductList
          products={currentCards}
          addProduct={addProduct}
          handleSearchBy={handleSearchBy}
          handleSearch={handleSearch}
          setSearchQuery={handleSearchQuery}
          searchBy={searchBy}
          filterProduct={filteredProducts}
        />
        <Order
          cardValues={cardValues}
          totalCost={totalCost}
          increase={increase}
          decrease={decrease}
        />
      </div>
      <Pagination
        count={Math.ceil(products.length / cardsPerPage)}
        page={currentPage}
        onChange={handleChange}
        style={{
          bottom: 0,
        }}
      />
    </div>
  )
}

export default StaffHomepage
