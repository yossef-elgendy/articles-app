import PropTypes from 'prop-types';

const FormInput = ({ label, type, id, name, value, onChange, error, disabled, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={ id }>{ label }:</label>
      <input
        type={ type }
        id={ id }
        name={ name }
        value={ value }
        onChange={ onChange }
        required
        disabled={ disabled }
        placeholder={ placeholder }
      />
      {error && <span className="error">{ error }</span>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default FormInput;
