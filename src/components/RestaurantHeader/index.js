import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, activeOptionId, updateActiveOptionId} = props
  const onChangeSortBy = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="restaurants-header">
      <h1 className="popular-content">Popular Restaurants</h1>
      <div className="align-class">
        <p className="popular-content-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sorting-container">
          <BsFilterLeft className="filter-icon" />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortBy}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.Id}
                value={eachOption.value}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
