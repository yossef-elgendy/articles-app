import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/accounts/actions';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './MyProfileForm.css';
import { useNavigate } from 'react-router-dom';

const MyProfileForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.savedCustomer);
  const token = useSelector(state => state.user.profileToken);
  const loading = useSelector(state => state.user.loading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    authors: []
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        sources: currentUser.sources ? currentUser.sources : [],
        categories: currentUser.categories ? currentUser.categories : [],
        authors: currentUser.authors? currentUser.authors : []
      });
    } else {
        navigate('/', { replace: true })
    }
  }, [currentUser, navigate]);

  const handleChange = (inputName, newTags) => {
    const filteredTags = newTags.filter((tag) => tag.trim() !== '');

    setFormData((prevData) => ({
      ...prevData,
      [inputName]: filteredTags,
    }));
  };

  const renderTagsInputs = () => {
    const tagsInputs = [
      { name: 'sources', label: 'Sources' },
      { name: 'authors', label: 'Authors' },
      { name: 'categories', label: 'Categories' },
    ];

    return tagsInputs.map(({ name, label }) => (
      <div className='form-group' key={ name }>
        <label htmlFor={ name }> { name }</label>
        <TagsInput
          name={ name }
          label={ label }
          value={ formData[name] }
          onChange={ (newTags) => handleChange(name, newTags) }
          disabled={ loading }
        />
        { formErrors[name] && <span className="error">{ formErrors[name] }</span> }
      </div>
    ));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(updateUser(token, formData));
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
    if (formData.sources.length === 0) {
      errors.sources = 'Sources is required';
    }
    if (formData.categories.length === 0) {
      errors.categories = 'Categories is required';
    }
    if (formData.authors.length === 0) {
      errors.authors = 'Authors is required';
    }
    return errors;
  };

  return (
    <div className="user-profile-form">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        {renderTagsInputs()}
        <button type="submit" disabled={loading}>
          {loading ? '...Loading' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default MyProfileForm;
