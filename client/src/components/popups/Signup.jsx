import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Flexbox from '../Flexbox'
import Button from '../Button'

import style from './style.css'

const VerticalLine = styled.div`
  height: 150px;
  border-left: 2px solid hsl(0, 0%, 29%);
`


const SignupPopup = ({ toggleModalStatus }) => {

  const handleClick = userType => {
    console.log(userType)
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
        <h1 className="title is-5">
          Selecione o tipo de cadastro que deseja:
        </h1>
      </Flexbox>
      <Flexbox
        justify="space-evenly"
        width="100%"
        align="center"
      >
        <Link to="/cadastro" onClick={() => handleClick("empresa")}>
          <Button
            styles="is-link"
          >
            Empresa
          </Button>
        </Link>
        <VerticalLine />
        <Link to="/cadastro" onClick={() => handleClick("profissional")}>
          <Button
            styles="is-danger"
          >
            Profissional
          </Button>
        </Link>
      </Flexbox>
    </Fragment>
  )
}
  

export default SignupPopup