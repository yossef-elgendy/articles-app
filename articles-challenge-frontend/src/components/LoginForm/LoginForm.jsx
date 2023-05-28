/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer } from '../../store/accounts/actions';
import FormInput from '../FormInput/FormInput';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.profileToken);


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
        // Handling Error
        console.log('Error logging in:', error.message);
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
