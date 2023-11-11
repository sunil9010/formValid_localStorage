import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './index.css'

function LoginForm() {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [register, setRegister] = useState(false)

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
    const userDetails = JSON.parse(localStorage.getItem('userCredits'))
    const check = userDetails.find(
      g => g.email === formData.email && g.password === formData.password,
    )
    // setFormData({email: '', password: ''})
    if (!check) {
      setRegister(true)
    } else {
      history.push('/')
    }
  }

  const validateForm = event => {
    const newErrors = {}
    let err = false

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

  return (
    <div className="login-form-container">
      <img
        src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online-1024x724.jpg"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={handelSubmit}>
        <div className="input-container">{renderEmailField()}</div>
        {errors.email && <span className="error-message">{errors.email}</span>}
        <div className="input-container">{renderPasswordField()}</div>
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <button type="submit" className="login-button">
          Login
        </button>
        {register && <p className="error-message">*Invalid User Credentials</p>}

        <p className="account">
          Not at register
          <Link to="/register" className="link">
            Sig up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
