import React from "react"
import { Link } from 'react-router-dom'
import { WrapperChoices, Title, Background } from './style'

const Admin = () => {

  return (
    <Background>
      <Title>Escolha uma visão: </Title>

      <WrapperChoices>
        <Link to="/empresas">
          <Title>Empresarial</Title>
        </Link>
        <Link to="">
          <Title>Profissional</Title>
        </Link>
      </WrapperChoices>
    </Background>
  )

}

export default Admin