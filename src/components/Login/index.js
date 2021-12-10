import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = kitchenToken => {
    const {history} = this.props

    Cookies.set('jwt_token', kitchenToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div>
        <div className="input-user-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            onChange={this.usernameInput}
            value={username}
            className="username-input"
            type="text"
            placeholder="USERNAME"
            id="username"
          />
        </div>
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-password-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.passwordInput}
          value={password}
          className="username-input"
          type="password"
          id="password"
          placeholder="PASSWORD"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const kitchenToken = Cookies.get('jwt_token')
    if (kitchenToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="desktop-form-container">
          <div className="login-form-container">
            <div className="login-form">
              <div className="login-card-title">
                <img
                  className="login-logo"
                  src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637036711/Tasty%20kitchen/kitchenlogo_xwm4q6.png"
                  alt="website logo"
                />
                <h1 className="website-login-name">Tasty Kitchens</h1>
                <h1 className="login-heading">Login</h1>
              </div>
              <form className="details-section" onSubmit={this.onSubmitForm}>
                {this.renderUsernameField()}
                {this.renderPasswordField()}
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
                <button className="login-button" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="login-image-container">
            <img
              className="login-cover-image"
              src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637062683/Tasty%20kitchen/loginimage_n8ickg.png"
              alt="website login"
            />
          </div>
          <div className="mobile-image-container">
            <img
              className="mobile-login-image"
              src="https://res.cloudinary.com/ddujkd2is/image/upload/v1637062682/Tasty%20kitchen/mobilelogin_gxy0ur.png"
              alt="mobile login logo"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
