import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Restaurants from '../Restaurants'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {offersList: [], isLoading: false}

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
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
    const updatedData = data.offers.map(offer => ({
      imageUrl: offer.image_url,
      id: offer.id,
    }))
    this.setState({offersList: updatedData, isLoading: false})
  }

  renderCarousel = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 4000,
      cssEase: 'linear',
      pauseOnHover: true,
    }

    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {offersList.map(slide => (
            <div className="slick-slide" key={slide.id}>
              <img
                className="slick-slide-image"
                src={slide.imageUrl}
                alt="offer"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoader = () => (
    <div
      testid="restaurants-offers-loader"
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
        {isLoading ? this.renderLoader() : this.renderCarousel()}
        <Restaurants />
        <Footer />
      </>
    )
  }
}

export default Home
