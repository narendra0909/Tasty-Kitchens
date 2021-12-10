import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdArrowForwardIos, MdArrowBackIosNew} from 'react-icons/md'
import RestaurantHeader from '../RestaurantHeader'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class Restaurants extends Component {
  state = {
    restaurantList: [],
    searchInput: '',
    activePage: 1,
    activeOptionId: sortByOptions[1].value,
    isLoading: false,
    noOfPages: 0,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onIncrementOffset = () => {
    const {activePage} = this.state
    if (activePage < 4)
      this.setState(prevState => ({activePage: prevState.activePage + 1}))
    // console.log(activePage)
    this.getRestaurants()
  }

  onDecrementOffset = () => {
    const {activePage} = this.state
    if (activePage > 1)
      this.setState(prevState => ({activePage: prevState.activePage - 1}))
    this.getRestaurants()
  }

  getRestaurants = async () => {
    const {activePage, activeOptionId} = this.state
    this.setState({isLoading: true})
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const kitchenToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${kitchenToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const totalRestaurants = data.total
    const noOfPages = Math.ceil(totalRestaurants / limit)
    const fetchedData = data.restaurants.map(eachRestaurant => ({
      costForTwo: eachRestaurant.cost_for_two,
      cuisine: eachRestaurant.cuisine,
      groupByTime: eachRestaurant.group_by_time,
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      hasTableBooking: eachRestaurant.has_table_booking,
      id: eachRestaurant.id,
      imageUrl: eachRestaurant.image_url,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      location: eachRestaurant.location,
      menuTypeName: eachRestaurant.menu_type,
      name: eachRestaurant.name,
      opensAt: eachRestaurant.opens_at,
      rating: eachRestaurant.user_rating.rating,
      ratingColor: eachRestaurant.user_rating.rating_color,
      ratingText: eachRestaurant.user_rating.rating_text,
      totalReviews: eachRestaurant.user_rating.total_reviews,
    }))
    this.setState({restaurantList: fetchedData, isLoading: false, noOfPages})
    // console.log(fetchedData)
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurants)
  }

  renderRestaurantHeader = () => {
    const {activeOptionId} = this.state

    return (
      <RestaurantHeader
        key={sortByOptions[1].id}
        activeOptionId={activeOptionId}
        sortByOptions={sortByOptions}
        updateActiveOptionId={this.updateActiveOptionId}
      />
    )
  }

  renderRestaurantList = () => {
    const {restaurantList, searchInput} = this.state
    const searchResults = restaurantList.filter(eachRestaurant =>
      eachRestaurant.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="restaurants-container">
        <div style={{textAlign: 'center'}}>
          <input
            type="search"
            value={searchInput}
            className="search-input"
            placeholder="Search by Restaurant"
            onChange={this.onChangeSearchInput}
          />
        </div>

        <ul className="restaurant-lists">
          {searchResults.map(eachRestaurant => (
            <Link
              testid="restaurant-item"
              to={`restaurants-list/${eachRestaurant.id}`}
              key={eachRestaurant.id}
              className="restaurant-id"
            >
              <li testid="restaurant-item" className="restaurant-list-item">
                <img
                  className="restaurant-image"
                  alt="restaurant"
                  src={eachRestaurant.imageUrl}
                />
                <div className="restaurant-details">
                  <h1 className="restaurant-name">{eachRestaurant.name}</h1>
                  <p className="restaurant-food-type">
                    {eachRestaurant.cuisine}
                  </p>
                  <div className="restaurant-rating">
                    <AiFillStar className="rating-star" />
                    <span className="restaurant-rating">
                      {eachRestaurant.rating}
                    </span>
                    <span className="total-reviews">
                      ({eachRestaurant.totalReviews} ratings)
                    </span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderPagination = () => {
    const {activePage, noOfPages} = this.state
    return (
      <div className="page-number-section">
        <button
          testid="pagination-left-button"
          className="page-number"
          type="button"
          onClick={this.onDecrementOffset}
        >
          <MdArrowBackIosNew className="page-icon" />
        </button>
        <span testid="active-page-number" className="current-page">
          {activePage} of {noOfPages}
        </span>
        <button
          testid="pagination-right-button"
          className="page-number"
          type="button"
          onClick={this.onIncrementOffset}
        >
          <MdArrowForwardIos className="page-icon" />
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div
      testid="restaurants-list-loader"
      className="restaurants-loader-container"
    >
      <Loader type="Oval" color="#F7931E;" height="50" width="500" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        {this.renderRestaurantHeader()}
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            {this.renderRestaurantList()}
            {this.renderPagination()}
          </div>
        )}
      </>
    )
  }
}

export default Restaurants
