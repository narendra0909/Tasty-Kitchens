import {AiOutlinePlus, AiOutlineMinus, AiOutlineClose} from 'react-icons/ai'
import CartContext from '../../context/index'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {increaseCartItem, decreaseCartItem, removeCartItem} = value
      const {cartItemDetails} = props
      const {id, name, quantity, cost, imageUrl} = cartItemDetails

      const onClickIncrease = () => {
        increaseCartItem(id)
      }

      const onClickDecrease = () => {
        if (quantity < 1) {
          removeCartItem(id)
        } else {
          decreaseCartItem(id)
        }
      }

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const totalPrice = cost * quantity

      return (
        <>
          <li testid="cartItem" className="cart-list-item">
            <div className="cart-image-name">
              <img src={imageUrl} alt={name} className="cart-product-image" />
              <h1 className="cart-product-heading">{name}</h1>
            </div>
            <div style={{display: 'flex'}}>
              <button
                testid="decrement-quantity"
                type="button"
                onClick={onClickDecrease}
                className="decrease-button"
              >
                <AiOutlineMinus style={{marginTop: '2px'}} />
              </button>
              <p testid="item-quantity" className="updated-quantity">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                onClick={onClickIncrease}
                type="button"
                className="increase-button"
              >
                <AiOutlinePlus style={{marginTop: '2px'}} />
              </button>
            </div>
            <p testid="total-price" className="cart-product-cost">
              ₹ {totalPrice}.00
            </p>
            <AiOutlineClose
              onClick={onRemoveCartItem}
              className="remove-item"
            />
          </li>
          <li className="mobile-cart">
            <img src={imageUrl} alt={name} className="cart-product-image" />
            <div style={{marginLeft: '16px'}}>
              <h1 className="mobile-cart-product-heading">{name}</h1>
              <button
                type="button"
                onClick={onClickDecrease}
                className="decrease-button"
              >
                <AiOutlineMinus style={{marginTop: '2px'}} />
              </button>
              <span className="updated-quantity">{quantity}</span>
              <button
                onClick={onClickIncrease}
                type="button"
                className="increase-button"
              >
                <AiOutlinePlus style={{marginTop: '2px'}} />
              </button>

              <h1 className="cart-product-cost">₹ {totalPrice}.00</h1>
              <AiOutlineClose
                onClick={onRemoveCartItem}
                className="remove-item"
              />
            </div>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
