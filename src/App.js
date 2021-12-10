import {Route, Redirect, Switch} from 'react-router-dom'
import {Component} from 'react'
import CartContext from './context/index'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import PaymentSuccess from './components/PaymentSuccess'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
// import Footer from './components/Footer'
import NotFound from './components/NotFound'
import './App.css'
import Profile from './components/Profile'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    // console.log(cartList)
    const foodObject = cartList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )
    if (foodObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + foodItem.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      this.setState({cartList: updatedCartList})
    }
  }

  increaseCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decreaseCartItem = id => {
    const {cartList} = this.state
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (foodObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  removeAllItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          increaseCartItem: this.increaseCartItem,
          decreaseCartItem: this.decreaseCartItem,
          removeCartItem: this.removeCartItem,
          removeAllItems: this.removeAllItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute
            exact
            path="/payment-success"
            component={PaymentSuccess}
          />
          <Route exact path="/not-found" component={NotFound} />

          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
