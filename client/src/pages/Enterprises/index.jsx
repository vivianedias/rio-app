import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import uuid from "uuid"

import { Container, Group, Title, Background } from './style'
import CardEnterprise from '../../components/CardEnterprise'
import Text from '../../components/Text'
import { IfElse } from '../../components/If'

const EnterprisesList = () => {
  const enterprises = useStoreState(state => state.enterprise.enterprises)
  const getAllEnterprises = useStoreActions(actions => actions.enterprise.getAllEnterpriseUsers)

  useEffect(() => {
    getAllEnterprises()
  }, [getAllEnterprises])
  console.log(enterprises)
  return (
    <Background>
      <Container>
        <Title>Empresas</Title>
        <Group>
          <IfElse
            condition={
              typeof enterprises !== 'undefined' && enterprises.length > 0
            }
            True={enterprises.map((enterprise) => enterprise && (
              <CardEnterprise
                name={enterprise.enterprise_name}
                phone={enterprise.phone}
                email={enterprise.email}
                id={enterprise.enterprise_id}
                key={uuid()}
              />
            ))}
            False={
              <Text size="16px" weight="600">Não há empresas cadastradas</Text>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default EnterprisesList
