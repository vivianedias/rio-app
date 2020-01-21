import React from 'react'
import uuid from 'uuid'
import { parseText as parse } from '../utils/service'
import styled from 'styled-components'

const StyledRadio = styled.label`
  display: flex;
  align-items: center;
  color: #FFFF;
  font-weight: 500;
`

const StyledDescription = styled.label`
  color: #fc9b44;
  font-weight: 500;
`
const Input = styled.input`
  margin-right: 10px;
  `

const Wrapper = styled.div`
  display: flex;
  `

const InputLabel = styled.span`
  text-transform: capitalize;
`

const Radios = ({ label, error, onChange, name }) => (
  <div className="field">
    <StyledDescription className="label">{label}</StyledDescription>
    <Wrapper>
      {['sim', 'não'].map(item => (
        <StyledRadio className="radio" key={uuid()}>
          <Input
            type="radio"
            className={`${error ? "is-danger" : ""}`}
            onChange={onChange}
            value={item === 'sim'}
            name={name}
          />
          <InputLabel>{item}</InputLabel>
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