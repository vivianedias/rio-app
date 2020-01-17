import React from 'react'
import uuid from 'uuid'
import { parseText as parse } from '../utils/service'

const Radios = ({ register, name, label, fields, error }) => (
  <div className="field">
    <label className="label">{label}</label>
      {fields.map(item => (
        <label className="radio" key={uuid()}>
          <input
            type="radio"
            name={`${name}[${parse(item)}]`}
            ref={register}
          />
          <span>{item}</span>
        </label>
      ))}
    {error &&
      <p className="help is-danger">
        {error}
      </p>
    }
  </div>
)

export default Radios