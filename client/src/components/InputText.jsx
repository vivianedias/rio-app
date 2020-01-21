import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLabel = styled.label`
  color: #fc9b44;
  font-weight: 500;
`

const InputText = (
  {
    label,
    name,
    type,
    placeholder,
    icon,
    help,
    error,
    register
  }) => {
  return (
    <div className="field">
      <StyledLabel className="label">{label}</StyledLabel>
      <div
        className={`control ${icon ? "has-icons-left" : ""} ${error ? "has-icons-right" : ""}`}
      >
        <input
          className={`input ${error ? "is-danger" : ""}`}
          type={type}
          placeholder={placeholder}
          name={name}
          ref={register}
        />
        {icon && (
          <span
            className="icon is-left is-small"
            style={{ 'zIndex': 'unset ' }}
          >
            <i className={`fas ${icon}`} />
          </span>
        )}
        {error && (
          <span className="icon is-right is-small">
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>
      {help && <p className="help">{help}</p>}
      {error &&
        <p className="help is-danger">
          {error}
        </p>
      }
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  help: PropTypes.string,
  register: PropTypes.func.isRequired
  // margin: shape({
  //   top: oneOfType([string, number]),
  //   bottom: oneOfType([string, number]),
  //   left: oneOfType([string, number]),
  //   right: oneOfType([string, number])
  // }),
  // /** The padding property. */
  // padding: shape({
  //   top: oneOfType([string, number]),
  //   bottom: oneOfType([string, number]),
  //   left: oneOfType([string, number]),
  //   right: oneOfType([string, number])
  // })
}

InputText.defaultProps = {
  type: "text",
  help: undefined,
  error: undefined
}

export default InputText
