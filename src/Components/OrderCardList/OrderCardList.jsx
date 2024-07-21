import React from 'react'
import OrderCard from '../OrderCard/OrderCard'

const OrderCardList = ({ cardValues, updateQuantity, increase, decrease }) => {
  return (
    <>
      {cardValues !== null ? (
        cardValues.map((cardValue, index) => {
          return (
            <OrderCard
              key={index}
              id={cardValue.Id}
              name={cardValue.Name}
              price={cardValue.Price}
              quantity={cardValue.Quantity}
              amount={cardValue.amount}
              priceWithDiscount={cardValue.PriceWithDiscount}
              updateQuantity={updateQuantity}
              increase={() => increase(cardValue.Id)}
              decrease={() => decrease(cardValue.Id)}
            />
          )
        })
      ) : (
        <div>Empty</div>
      )}
    </>
  )
}

export default OrderCardList
