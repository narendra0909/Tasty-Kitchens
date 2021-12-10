import {Link} from 'react-router-dom'

import './index.css'

const EmptyCart = () => (
  <div className="cart-app-container">
    <div className="cart-container">
      <img
        className="cart-image"
        alt="empty cart"
        src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637057454/Tasty%20kitchen/cartimage_bdgr32.png"
      />
      <h1 className="empty-cart-heading"> No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="cart-link">
        <button className="empty-cart-button" type="submit">
          Order Now
        </button>
      </Link>
    </div>
  </div>
)

export default EmptyCart
