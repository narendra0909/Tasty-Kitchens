import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-app-container">
    <div className="not-found-container">
      <img
        className="not-found-image"
        alt="not found"
        src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637051600/Tasty%20kitchen/notfoundimage_e3uw9a.png"
      />
      <h1 className="not-found-heading"> Page Not found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found <br />
        Please go back to the homepage
      </p>
      <Link to="/">
        <button className="not-found-button" type="submit">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
