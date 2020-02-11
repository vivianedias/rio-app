import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Flexbox from '../Flexbox'
import Button from '../Button'

const VerticalLine = styled.div`
  height: 150px;
  border-left: 2px solid hsl(0, 0%, 29%);
`

const StyledTitle = styled.h1`
  font-size: 1.25rem;
  color: #FC9B55;
`;


const StyledButton = styled.button(props => ({
  background: props.background,
  lineHeight: '1.5',
  paddingBottom: 'calc(.5em - 1px)',
  paddingLeft: 'calc(.75em - 1px)',
  paddingRight: 'calc(.75em - 1px)',
  paddingTop: 'calc(.5em - 1px)',
  borderRadius: '4px',
  fontSize: '1rem',
  marginBottom: '.5rem',
  marginRight: '10px',
  color: props.color
}));



const SignupPopup = ({ toggleModalStatus }) => {
  const handleClick = userType => {
    // Where I set what type of user is being registered
    localStorage.setItem('user_type', userType)
    return toggleModalStatus()
  }

  return (
    <Fragment>
      <Flexbox
        width="100%"
        center
        margin={{
          top: 10,
          bottom: 20,
          left: 0,
          right: 0
        }}
      >
        <StyledTitle>
          Selecione o tipo de cadastro que deseja:
        </StyledTitle>
      </Flexbox>
      <Flexbox
        justify="space-evenly"
        width="100%"
        align="center"
      >
        <Link to="/cadastro" onClick={() => handleClick("enterprise")}>
          <StyledButton
            background="linear-gradient(101deg, #200122 0%,rgb(65, 1, 20) 80%)"
            color=" #FC9B55"
          >
            Empresa
          </StyledButton>
        </Link>
        <VerticalLine />
        <Link to="/cadastro" onClick={() => handleClick("professional")}>
          <StyledButton
            styles="is-danger"
            background="linear-gradient(101deg,#6f0000 0%,rgb(65, 1, 20) 80%)"
            color=" #FC9B55"

          >
            Profissional
          </StyledButton>
        </Link>
      </Flexbox>
    </Fragment>
  )
}


export default SignupPopup