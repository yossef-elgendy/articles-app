import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/accounts/actions';
import FormInput from '../FormInput/FormInput';
import './MyProfileForm.css';
import { useNavigate } from 'react-router-dom';

const MyProfileForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.savedCustomer);
  const loading = useSelector(state => state.user.loading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sources: '',
    categories: '',
    authors: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        sources: currentUser.sources || '',
        categories: currentUser.categories || '',
        authors: currentUser.authors || ''
      });
    } else {
        navigate('/', { replace: true })
    }
  }, [currentUser, navigate]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(updateUser(formData));
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
    if (!formData.sources.trim()) {
      errors.sources = 'Sources is required';
    }
    if (!formData.categories.trim()) {
      errors.categories = 'Categories is required';
    }
    if (!formData.authors.trim()) {
      errors.authors = 'Authors is required';
    }
    return errors;
  };

  return (
    <div className="user-profile-form">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Sources"
          type="text"
          id="sources"
          name="sources"
          value={formData.sources}
          onChange={handleChange}
          error={formErrors.sources}
          disabled={loading}
          placeholder="New York times, Wikipedia, ..."
        />
        <FormInput
          label="Categories"
          type="text"
          id="categories"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          error={formErrors.categories}
          disabled={loading}
          placeholder="Sport, Tech, ..."
        />
        <FormInput
          label="Authors"
          type="text"
          id="authors"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          error={formErrors.authors}
          disabled={loading}
          placeholder="Elon Musk, Mark Zuckerberg, ..."
        />
        <button type="submit" disabled={loading}>
          {loading ? '...Loading' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default MyProfileForm;
