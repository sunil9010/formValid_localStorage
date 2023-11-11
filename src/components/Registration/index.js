import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
  })
  const [registration, setRegistration] = useState(false)

  const [errors, setErrors] = useState({})

  function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(email)
  }
  function isPasswordValid(password) {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    return passwordRegex.test(password)
  }

  const dataSubmition = () => {
    const existingData = [
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    ]
    localStorage.setItem('userCredits', JSON.stringify(existingData))
    setRegistration(true)
    setFormData({username: '', email: '', password: '', reenterPassword: ''})
  }

  const validateForm = event => {
    const newErrors = {}
    let err = false
    if (formData.username.trim() === '') {
      newErrors.username = '*Username is required'
      err = true
    } else {
      err = false
    }
    if (formData.email === '') {
      newErrors.email = '*Email id is required'
      err = true
    } else if (!isEmailValid(formData.email)) {
      newErrors.email = '*Invalid email address'
      err = true
    } else {
      err = false
    }
    if (formData.password === '') {
      newErrors.password = '*Password is required'
      err = true
    } else if (!isPasswordValid(formData.password)) {
      newErrors.password =
        '*Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
      err = true
    } else {
      err = false
    }
    if (
      formData.reenterPassword === '' ||
      formData.reenterPassword !== formData.password
    ) {
      newErrors.reenterPassword = '*Password miss match'
      err = true
    } else {
      err = false
    }
    setErrors(newErrors)

    if (!err && event.type === 'submit') {
      dataSubmition()
    }
  }

  const handleInputChange = e => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handelSubmit = event => {
    event.preventDefault()
    validateForm(event)
  }

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Type your password"
        name="password"
        onBlur={validateForm}
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={formData.username}
        placeholder="example"
        onChange={handleInputChange}
        name="username"
        onBlur={validateForm}
      />
    </>
  )

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="email"
        id="email"
        className="username-input-field"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="example123@gmial.com"
        name="email"
        onBlur={validateForm}
      />
    </>
  )

  const renderReEnterPasswordField = () => (
    <>
      <label className="input-label" htmlFor="re-password">
        RE-PASSWORD
      </label>
      <input
        type="password"
        id="re-password"
        className="username-input-field"
        value={formData.reenterPassword}
        onChange={handleInputChange}
        placeholder="Re-enter your password"
        name="reenterPassword"
        onBlur={validateForm}
      />
    </>
  )

  return (
    <div className="login-form-container">
      <img
        src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online-1024x724.jpg"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={handelSubmit}>
        <div className="input-container">
          {renderUsernameField()}
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
        <div className="input-container">{renderEmailField()}</div>
        {errors.email && <span className="error-message">{errors.email}</span>}
        <div className="input-container">{renderPasswordField()}</div>
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <div className="input-container">{renderReEnterPasswordField()}</div>
        {errors.reenterPassword && (
          <span className="error-message">{errors.reenterPassword}</span>
        )}
        <button type="submit" className="login-button">
          Register
        </button>
        {!registration ? (
          <p className="or">or</p>
        ) : (
          <p className="successful">
            Hurray🎉..registered successfully, click on Login.
          </p>
        )}

        <p className="account">
          Already have an account click to
          <Link to="/login" className="link">
            Login
          </Link>
        </p>

        {/* {showSubmitError && <p className="error-message">*{errorMsg}</p>} */}
      </form>
    </div>
  )
}

export default Registration
