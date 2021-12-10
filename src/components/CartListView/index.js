import CartContext from '../../context/index'
import CartItem from '../CartItem'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(eachItem => (
            <CartItem key={eachItem.id} cartItemDetails={eachItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
