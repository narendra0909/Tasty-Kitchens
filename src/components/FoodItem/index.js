import {AiFillStar, AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import CartContext from '../../context/index'
import './index.css'

const FoodItem = props => (
  <CartContext.Consumer>
    {value => {
      const {addCartItem, increaseCartItem, decreaseCartItem} = value

      const {
        foodItemsData,
        quantity,
        changeBtnStatus,
        onIncreaseQuantity,
        onDecreaseQuantity,
        decreaseQuantity,
        increaseQuantity,
      } = props
      const {
        imageUrl,
        name,
        cost,
        rating,
        id,
        buttonStatus,
        activeQuantity,
      } = foodItemsData

      const onClickAddToCart = () => {
        console.log({...foodItemsData})
        addCartItem({...foodItemsData, quantity})
      }

      const onStatusChange = () => {
        changeBtnStatus(id)
        onClickAddToCart()
        onIncreaseQuantity(id)
        increaseCartItem(id)
      }

      const increaseItemQuantity = () => {
        onIncreaseQuantity(id)
        increaseQuantity(id)
        increaseCartItem(id)
      }

      const decreaseItemQuantity = () => {
        if (activeQuantity > 0) {
          decreaseCartItem(id)
          decreaseQuantity(id)
          onDecreaseQuantity(id)
        }
      }

      return (
        <li testid="foodItem" className="food-item">
          <div className="food-item-container">
            <img
              src={imageUrl}
              alt={`Food item ${id}`}
              className="food-item-image"
            />
            <div className="food-details">
              <h1 className="food-item-name">{name}</h1>
              <p className="food-item-cost">₹ {cost}</p>
              <div style={{display: 'flex', marginBottom: '10px'}}>
                <AiFillStar className="rating-star" />
                <span className="food-item-rating">{rating}</span>
              </div>
              {buttonStatus ? (
                <>
                  <button
                    testid="decrement-count"
                    type="button"
                    onClick={decreaseItemQuantity}
                    className="decrease-button"
                  >
                    <AiOutlineMinus style={{marginTop: '2px'}} />
                  </button>
                  <span testid="active-count" className="updated-quantity">
                    {activeQuantity}
                  </span>
                  <button
                    testid="increment-count"
                    onClick={increaseItemQuantity}
                    type="button"
                    className="increase-button"
                  >
                    <AiOutlinePlus style={{marginTop: '2px'}} />
                  </button>
                </>
              ) : (
                <button
                  onClick={onStatusChange}
                  className="add-button"
                  type="button"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default FoodItem
