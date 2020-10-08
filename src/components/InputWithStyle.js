import React, { PureComponent } from "react";
import PropTypes from "prop-types";

function Input(props) {

  function handleChange(e) {
    const { name, onChange } = props;
    if (onChange) {
      onChange(name, e.target.value);
    }
  }
  
  // setRef

    const { errorMessage, label, name, value, type } = this.props;
    return (
      <div className="input-field">
        <input
          id={`input_${name}`}
          className="validate"
        //   ref={this.setRef}
          onChange={this.handleChange}
          value={value}
          type={type}
        />
        <label htmlFor={`input_${name}`}>{label}</label>
        {errorMessage && <span className="helper-text">{errorMessage}</span>}
      </div>
    );
  }

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number", "price"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
};
Input.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  autoFocus: false,
  type: "text",
};
export default Input;