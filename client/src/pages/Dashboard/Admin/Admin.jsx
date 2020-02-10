import React, { useEffect } from "react"
import CardEnterprise from '../../../components/CardEnterprise'
import { Container, Title, Group } from './style'
import { useStoreActions, useStoreState } from 'easy-peasy'

const Admin = () => {
  const getAllEnterprises = useStoreActions(actions => actions.enterprise.getAllEnterprises)
  const enterprises = useStoreState(state => state.enterprise.enterprises)

  useEffect(() => {
    getAllEnterprises()
  }, [])

  return (
    <Container>
      <Title>Empresas Cadastradas</Title>
      <Group>
        {
          enterprises.map((enterprise) => (
            <CardEnterprise
              name={enterprise.name}
              email={enterprise.email}
              phone={enterprise.phone}
            />
          ))
        }
      </Group>
    </Container>
  )
}

export default Admin