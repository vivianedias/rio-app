import React, { Fragment } from "react"

const InputText = (
  {
    label,
    name,
    type,
    placeholder,
    icon,
    help = undefined,
    error = undefined,
    register
  }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
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
            {error.message}
          </p>
        }
    </div>
  )
}

export default InputText
