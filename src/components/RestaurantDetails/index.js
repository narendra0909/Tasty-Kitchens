import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    foodItemsData: [],
    quantity: 1,
    isLoading: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
    cost: data.cost_for_two,
    cuisine: data.cuisine,
  })

  getFoodItemFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    name: data.name,
    rating: data.rating,
    cost: data.cost,
    foodType: data.food_type,
    activeQuantity: 0,
    buttonStatus: false,
  })

  getRestaurantDetails = async () => {
    // console.log(this.props)
    const {match} = this.props
    this.setState({isLoading: true})
    const {params} = match
    const {id} = params
    const kitchenToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${kitchenToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const updatedData = this.getFormattedData(data)
    const updateFoodItems = data.food_items.map(eachFoodItem =>
      this.getFoodItemFormattedData(eachFoodItem),
    )
    this.setState({
      restaurantDetails: updatedData,
      foodItemsData: updateFoodItems,
      isLoading: false,
    })
    // console.log(updateFoodItems)
    // console.log(updatedData)
  }

  changeBtnStatus = id => {
    this.setState(prevState => ({
      foodItemsData: prevState.foodItemsData.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = true
          return {...eachItem, buttonStatus: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  onIncreaseQuantity = id => {
    this.setState(prevState => ({
      foodItemsData: prevState.foodItemsData.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.activeQuantity + 1
          return {...eachItem, activeQuantity: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  onDecreaseQuantity = id => {
    this.setState(prevState => ({
      foodItemsData: prevState.foodItemsData.map(eachItem => {
        const updatedQuantity = eachItem.activeQuantity - 1
        if (id === eachItem.id) {
          if (updatedQuantity === 0) {
            return {...eachItem, buttonStatus: false, activeQuantity: 0}
          }
          if (updatedQuantity > 0) {
            // updatedQuantity = eachItem.activeQuantity - 1
            return {...eachItem, activeQuantity: updatedQuantity}
          }
        }
        return eachItem
      }),
    }))
  }

  increaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails, foodItemsData, quantity} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      cost,
    } = restaurantDetails

    return (
      <div className="restaurant-details-section">
        <div className="restaurant-details-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-details-image"
          />
          <div className="restaurant-details-content">
            <h1 className="restaurant-details-content-heading">{name}</h1>
            <p className="restaurant-details-content-type">{cuisine}</p>
            <p className="restaurant-details-content-location">{location}</p>
            <div className="restaurant-details-ratings">
              <div
                style={{
                  padding: '0 30px 0 0',
                  borderRight: '1px solid #E2E8F0',
                }}
              >
                <div style={{display: 'flex'}}>
                  <AiFillStar className="rating-star" />
                  <p className="restaurant-details-restaurant-rating">
                    {rating}
                  </p>
                </div>

                <p className="plus-ratings">{reviewsCount}</p>
              </div>
              <div style={{padding: '0 30px'}}>
                <p className="item-cost">₹ {cost}</p>
                <p className="for-people">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-menu-container">
          <ul className="restaurant-menu-list">
            {foodItemsData.map(eachItem => (
              <FoodItem
                quantity={quantity}
                key={eachItem.id}
                foodItemsData={eachItem}
                changeBtnStatus={this.changeBtnStatus}
                onDecreaseQuantity={this.onDecreaseQuantity}
                onIncreaseQuantity={this.onIncreaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
                increaseQuantity={this.increaseQuantity}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurants-loader-container"
    >
      <Loader type="Oval" color="#F7931E;" height="50" width="500" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.renderLoader() : this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
