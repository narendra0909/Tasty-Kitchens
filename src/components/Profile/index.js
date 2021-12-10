import {GoLocation} from 'react-icons/go'
import {AiOutlineMobile, AiOutlineMail} from 'react-icons/ai'
import {MdFavoriteBorder} from 'react-icons/md'
import {BsCartPlus} from 'react-icons/bs'
import {GrMapLocation} from 'react-icons/gr'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Profile = () => (
  <>
    <Header />
    <div className="profile">
      <header className="header">
        <div className="details">
          <img
            src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637694259/Tasty%20kitchen/blank-profile-picture_jj8qep.png"
            alt="John Doe"
            className="profile-pic"
          />
          <h1 className="heading">Rahul</h1>
          <div className="location">
            <GoLocation size={24} />
            <p>Andhra, India</p>
          </div>
          <div className="stats">
            <div className="col-4">
              <h4>20</h4>
              <p>Reviews</p>
            </div>
            <div className="col-4">
              <h4>10</h4>
              <p>Total Orders</p>
            </div>
            <div className="col-4">
              <h4>10</h4>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </header>
      <h1 className="profile-details">Basic Profile Details</h1>
      <div className="details-container">
        <div className="card-one">
          <AiOutlineMobile size={24} />
          <div>
            <span>Mobile</span>
            <p>+91 98765 54321</p>
          </div>
        </div>
        <div className="card-one">
          <AiOutlineMail size={24} />
          <div>
            <span>Email</span>
            <p>loremipsum@gmail.com</p>
          </div>
        </div>
        <div className="card-one">
          <BsCartPlus size={24} />
          <div>
            <span>Order History</span>
            <p>Total 20</p>
          </div>
        </div>
        <div className="card-one">
          <GrMapLocation size={24} />
          <div>
            <span>My Addresses</span>
            <p>20</p>
          </div>
        </div>
        <div className="card-one">
          <MdFavoriteBorder size={24} />
          <div>
            <span>Favorite Orders</span>
            <p>20</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
)

export default Profile
