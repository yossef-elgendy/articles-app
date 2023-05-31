/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveCustomer } from '../../store/accounts/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import FormInput from '../FormInput/FormInput';
import './RegistrationForm.css';


const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const token = useSelector(state => state.user.profileToken);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Dispatch the saveCustomer action with the formData and profileToken
      const { status, errors } =  await dispatch(saveCustomer(formData));
      // Reset form fields
      if (status) {
        setFormData({
          username: '',
          email: '',
          password: '',
          password_confirmation: ''
        });
      }

      setFormErrors(errors);
    } else {
      setFormErrors(errors);
    }
  };



  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = ['Username is required'];
    }
    if (!formData.email.trim()) {
      errors.email = ['Email is required'];
    } else if (!isValidEmail(formData.email)) {
      errors.email = ['Invalid email format'];
    }
    if (!formData.password.trim()) {
      errors.password = ['Password is required'];
    } else if (formData.password.length < 6) {
      errors.password = ['Password must be at least 6 characters long'];
    }
    if (formData.password !== formData.password_confirmation) {
      errors.confirmPassword = ['Passwords do not match'];
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //If the user is logged in he should be redirected to homepage
  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token]);

  return (
    <div className="registration-form">
      <div className='registration-form-title'>
        <span>
          Registration Form
        </span>
        <FontAwesomeIcon icon={faUser} size="lg" color="#007bff" className="my-icon" />
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={formErrors.username && formErrors.username[0]}
          disabled={loading}
        />
        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email && formErrors.email[0]}
          disabled={loading}
        />
        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password && formErrors.password[0]}
          disabled={loading}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          error={formErrors.password_confirmation && formErrors.password_confirmation[0]}
          disabled={loading}
        />
        <div className="register-form-actions">
          <button type="submit" disabled={loading}>
            { loading ? '...Loading' : 'Register' }
          </button>
          <Link to="/login">{ 'I already have an account' }</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
