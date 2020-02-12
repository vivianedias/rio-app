import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import uuid from "uuid"

import { Container, Group, Title, Background, Textarea } from './style'
import CardVacancy from '../../components/CardVacancy'
import { IfElse } from '../../components/If'

const VacancyList = ({ match }) => {
  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies)

  useEffect(() => {
    const id = match.params && match.params.id
    getAllVacancies(id)
  }, [])

  return (
    <Background>
      <Container>
        <Title>Vagas</Title>
        <Group>
          <IfElse
            condition={typeof vacancies !== 'undefined' && vacancies.length > 0}
            True={
              vacancies && vacancies.map((vacancy) => (
                <CardVacancy
                  enterpriseName={vacancy.enterprise_name}
                  name={vacancy.title}
                  function={vacancy.function}
                  requirements={vacancy.requirements}
                  location={vacancy.location}
                  period={vacancy.total_period}
                  cache={vacancy.cache}
                  key={uuid()}
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

export default VacancyList
