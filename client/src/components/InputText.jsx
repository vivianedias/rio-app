import React, { Fragment } from "react"

const InputText = (
  {
    label,
    isEdit = false,
    name = "",
    value,
    onChange,
    type,
    placeholder,
    maxLength = undefined,
    showLeftIcon = false,
    leftIcon,
    help = undefined,
    error = undefined
  }) => {
  return (
    <div className="custom-field field">
      <label className="label">{label}</label>
      {isEdit && (
        <Fragment>
          <div className="control">
            <input
              name={name}
              value={value}
              onChange={onChange}
              className={`custom-field__input input ${error ? "is-danger" : ""}`}
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
            />
            {showLeftIcon && (
              <span className="icon is-left is-small">
                <i className={`fas ${leftIcon}`} />
              </span>
            )}
            {error && (
              <span className="icon is-right is-small">
                <i className={`fas ${error ? "fa-exclamation-triangle" : ""}`} />
              </span>
            )}
          </div>
          {help && <p className="help">{help}</p>}
          {typeof error !== "undefined" &&
            typeof error !== "object" &&
            <p className="help is-danger">
              {error}
            </p>
          }
        </Fragment>
      )}
    </div>
  )
}

export default InputText
