import React from "react"
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { WrapperChoices, Title, Background } from './style'

const DashboardWrapper = () => 
    <Background>
      <Typography variant="h3" component="h2" gutterBottom>Escolha uma visão: </Typography>
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