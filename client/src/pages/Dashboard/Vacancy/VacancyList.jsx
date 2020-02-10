import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Container, Group, Title } from './style'
import CardVacacy from '../../../components/CardVacancy'

const Operator = () => {
  const vacancies = useStoreState(state => state.vacancy.vacancies)
  const getAllVacancies = useStoreActions(actions => actions.vacancy.getAllVacancies)

  useEffect(() => {
    getAllVacancies()
  }, [])

  return (
    <Container>
      <Title>Vagas</Title>
      <Group>
        {vacancies.map((vacancy) => (
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
      </Group>
    </Container>
  )
}

export default Operator
