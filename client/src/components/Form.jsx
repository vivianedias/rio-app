import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  width: 100%;
  padding: 20px;
  @media(min-width: 576px) {
    width: unset;
  }
  padding: 20px;
  border-radius: 20px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`

const Form = ({ children, onSubmit }) => 
  <StyledForm onSubmit={onSubmit}>
    {children}
  </StyledForm>

export default Form