/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer } from '../../store/accounts/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import FormInput from '../FormInput/FormInput';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.profileToken);
  const loading = useSelector(state => state.user.loading)


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

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
      try {
        await dispatch(loginCustomer(formData));
        setFormData({
          email: '',
          password: ''
        });
        setFormErrors({});
      } catch (error) {
        return;
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

    //If the user is logged in he should be redirected to homepage
    useEffect(() => {
      if (token) {
        navigate('/', { replace: true })
      }
    }, [token]);

  return (
    <div className="login-form">
      <div className="login-form-title">
        <span>Login</span>
        <FontAwesomeIcon icon={faSignInAlt} size="lg" color="#007bff" className="my-icon" />
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          disabled={loading}
        />
        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          disabled={loading}
        />
        <div className="login-form-actions">
          <button type="submit" disabled={loading}>
            { loading ? '...Loading' : 'Login' }
          </button>
          <Link to="/register">{ 'Don\'t have an account ?' }</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
