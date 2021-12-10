import {Link} from 'react-router-dom'
import {RiCheckboxCircleFill} from 'react-icons/ri'
import Header from '../Header'

import './index.css'

const PaymentSuccess = () => (
  <>
    <Header />
    <div className="payment-container">
      <RiCheckboxCircleFill className="payment-icon" />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="payment-description">
        Thank You for ordering <br /> Your order is successfully completed
      </p>
      <Link to="/">
        <button className="success-button" type="button">
          Go to Home Page
        </button>
      </Link>
    </div>
  </>
)

export default PaymentSuccess
