import React from "react"
import CardEnterprise from '../../../components/CardEnterprise'
import { Container, Title, Group } from './style'

const Operator = () => {
  const enteprises = [
    {
      name: "Loft",
      email: "loft@gmail.com",
      phone: "(11) 4444-4444"
    },
    {
      name: "Loft",
      email: "loft@gmail.com",
      phone: "(11) 4444-4444"
    },
    {
      name: "Loft",
      email: "loft@gmail.com",
      phone: "(11) 4444-4444"
    },
    {
      name: "Loft",
      email: "loft@gmail.com",
      phone: "(11) 4444-4444"
    }
  ]


  return (
    <Container>
      <Title>Empresas Cadastradas</Title>
      <Group>
        {
          enteprises.map((enteprise) => (
            <CardEnterprise
              name={enteprise.name}
              email={enteprise.email}
              phone={enteprise.phone}
            />
          ))
        }
      </Group>
    </Container>
  )
}

export default Operator