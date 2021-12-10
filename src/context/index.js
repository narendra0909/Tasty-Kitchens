import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
  removeCartItem: () => {},
  removeAllItems: () => {},
})

export default CartContext
