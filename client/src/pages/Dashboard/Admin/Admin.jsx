import React from "react"
import { Link } from 'react-router-dom'
import { WrapperChoices, Title, Background } from './style'

const DashboardWrapper = () => 
    <Background>
      <Title>Escolha uma visão: </Title>
      <WrapperChoices>
        <Link to="/dashboard/admin/empresas">
          <Title>Empresarial</Title>
        </Link>
        <Link to="/dashboard/admin/profissionais">
          <Title>Profissional</Title>
        </Link>
      </WrapperChoices>
    </Background>

export default DashboardWrapper