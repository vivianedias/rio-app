import React from "react"
import { Container, Group, Title } from './style'
import CardVacacy from '../../../components/CardVacancy'

const Operator = () => {
  const vacancies = [
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "000000000001-00",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dias"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dias"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dias"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dias"
    }
  ]


  return (
    <Container>
      <Title>Suas Vagas</Title>
      <Group>
        {vacancies.map((vacancy) => (
          <CardVacacy
            name={vacancy.name}
            function={vacancy.function}
            requirements={vacancy.requirements}
            location={vacancy.location}
            cnpj={vacancy.cnpj}
            period={vacancy.period}
            cache={vacancy.cache}
            periodTotal={vacancy.periodTotal}
          />
        ))
        }
      </Group>
    </Container>
  )
}

export default Operator
