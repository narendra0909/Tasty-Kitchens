import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FcManager} from 'react-icons/fc'
import {FaBars} from 'react-icons/fa'
import CartContext from '../../context/index'
import './index.css'

class Header extends Component {
  state = {clicked: false}

  onClickLogOut = () => {
    const {history} = this.props
    // console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  toggleNav = () => {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
    }))
  }

  closeNav = () => {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
    }))
  }

  renderCartItemCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemCount = cartList.length

        return (
          <>
            {cartItemCount > 0 ? (
              <span className="cart-count-number">{cartItemCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {clicked} = this.state

    return (
      <nav className="nav-header">
        <div className="nav-desktop-content">
          <div className="nav-logo-container">
            <Link to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637036711/Tasty%20kitchen/kitchenlogo_xwm4q6.png"
              />
            </Link>
            <h1 className="website-name">Tasty Kitchen</h1>
          </div>
          <div className="nav-items">
            <ul className="nav-menu">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/cart" className="nav-link cart">
                  Cart
                  {this.renderCartItemCount()}
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  target="_blank"
                  className="nav-link profile tool-tip"
                >
                  <FcManager />
                  <span className="tool-tip-text"> Profile</span>
                </Link>
              </li>
            </ul>
            <button
              onClick={this.onClickLogOut}
              className="logout-button"
              type="submit"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="nav-mobile-container">
          <div className="nav-logo-container">
            <Link to="/">
              <img
                alt="website-logo"
                src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637036711/Tasty%20kitchen/kitchenlogo_xwm4q6.png"
              />
            </Link>
            <p className="website-name">Tasty Kitchen</p>
            <div className="">
              <button
                onClick={this.toggleNav}
                type="button"
                className="menu-btn"
              >
                <FaBars className="FaBars " />
              </button>
            </div>
          </div>
          {clicked && (
            <div className="mobile-nav-items">
              <ul className="nav-menu">
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/cart" className="nav-link cart">
                    Cart
                    {this.renderCartItemCount()}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" target="_blank" className="nav-link profile">
                    <FcManager />
                  </Link>
                </li>
              </ul>
              <button className="logout-button" type="submit">
                Logout
              </button>

              {/* <FaTimesCircle
                onClick={this.closeNav}
                className="mobile-toggle-icon"
              /> */}
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
