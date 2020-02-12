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
          <Button>
            Empresa
          </Button>
        </Link>
        <VerticalLine />
        <Link to="/cadastro" onClick={() => handleClick("professional")}>
          <Button>
            Profissional
          </Button>
        </Link>
      </Flexbox>
    </Fragment>
  )
}


export default SignupPopup