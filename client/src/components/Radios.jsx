import React from 'react'
import uuid from 'uuid'
import { parseText as parse } from '../utils/service'
import styled from 'styled-components'

const StyledRadio = styled.label`
  display: flex;
  align-items: center;
`
const Input = styled.input`
  margin-right: 10px;
`

const Wrapper = styled.div`
  display: flex;
`

const Radios = ({ register, name, label, fields, error }) => (
  <div className="field">
    <label className="label">{label}</label>
    <Wrapper>
      {fields.map(item => (
        <StyledRadio className="radio" key={uuid()}>
          <Input
            type="radio"
            name={`${name}[${parse(item)}]`}
            ref={register}
            className={`${error ? "is-danger" : ""}`}
          />
          <span>{item}</span>
        </StyledRadio>
      ))}
    </Wrapper>
    {error &&
      <p className="help is-danger">
        {error}
      </p>
    }
  </div>
)

export default Radios