import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Container, Group, Title, Background, Textarea } from './style'
import CardVacacy from '../../../components/CardVacancy'
import { IfElse } from '../../../components/If'


const Operator = () => {
  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies)

  useEffect(() => {
    getAllVacancies()
  }, [getAllVacancies])

  return (
    <Background>
      <Container>
        <Title>Vagas</Title>
        <Group>
          <IfElse
            condition={typeof vacancies !== 'undefined' && vacancies.length > 0}
            True={
              vacancies && vacancies.map((vacancy) => (
                <CardVacacy
                  name={vacancy.name}
                  function={vacancy.function}
                  requirements={vacancy.requirements}
                  location={vacancy.location}
                  period={vacancy.total_period}
                  cache={vacancy.cache}
                />
              ))
            }
            False={
              <Textarea>Não há vagas cadastradas</Textarea>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default Operator
