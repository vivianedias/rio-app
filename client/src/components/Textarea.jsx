import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ placeholder, label, rows, register, error, name }) => {
  console.log(typeof error)
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${error ? "has-icons-right" : ""}`}>
        <textarea
          className="textarea"
          placeholder={placeholder}
          rows={rows}
          ref={register}
          name={name}
        >  
        </textarea>
        {error && (
          <span className="icon is-right is-small">
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>
    </div>
  )
}

Textarea.propTypes = {
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

Textarea.defaultProps = {
  rows: 5
}

export default Textarea