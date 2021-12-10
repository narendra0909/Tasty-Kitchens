import {
  FaPinterestSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-title-img">
        <img
          className="footer-chef-image"
          alt="website-footer-logo"
          src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637061679/Tasty%20kitchen/footerimage_cvytn5.png"
        />
        <h1 className="footer-heading">Tasty Kitchen</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. <br /> Contact us on
      </p>
      <div className="icons-container">
        <div className="tool-tip">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="icons-style"
          />
          <span className="tool-tip-text"> Pinterest</span>
        </div>
        <div className="tool-tip">
          <FaInstagramSquare
            testid="instagram-social-icon"
            className="icons-style"
          />
          <span className="tool-tip-text"> Instagram</span>
        </div>
        <div className="tool-tip">
          <FaTwitterSquare
            testid="twitter-social-icon"
            className="icons-style"
          />
          <span className="tool-tip-text"> Twitter</span>
        </div>
        <div className="tool-tip">
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="icons-style"
          />
          <span className="tool-tip-text"> Facebook</span>
        </div>
      </div>
    </div>
  )
}
