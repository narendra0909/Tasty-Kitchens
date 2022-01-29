import {Link} from 'react-router-dom'
import Header from '../Header'
import EmptyCart from '../EmptyCart'
import CartListView from '../CartListView'
import CartContext from '../../context/index'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllItems} = value
      const showEmptyView = cartList.length === 0
      const onClickRemove = () => {
        removeAllItems()
      }
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCart />
          ) : (
            <div className="cart-products-container">
              <div className="cart-list-header">
                <h1 className="cart-product-title-item">Item</h1>
                <h1 className="cart-product-title-quantity">Quantity</h1>
                <h1 className="cart-product-title-price">Price</h1>
                <button
                  type="button"
                  onClick={onClickRemove}
                  className="remove-button"
                >
                  Remove all
                </button>
              </div>

              <CartListView />
              <div className="cart-footer">
                <h1 className="order-heading">Order Total:</h1>
                <div>
                  <p testid="total-price" className="order-price">
                    ₹ {total}.00
                  </p>
                  <Link to="/payment-success">
                    <button className="place-order-btn" type="button">
                      Place order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
