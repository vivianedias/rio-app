import React from "react"
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle } from './styles'
import CardProfessional from './components/CardProfessional'

const ResultSearchProfessionals = () => {
  const vacancies = [
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "000000000001-00",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "20 dias"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "30 dias"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "0 dias"
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
      location: "Butantã - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dias"
    }
  ]


  return (
    < WrapperResultSearch >
      <Wrapper>

        <TitleSearch>Resultado de busca de Profissionais</TitleSearch>
        <SubTitle>Resultado de Busca para:</SubTitle>
        <Group>
          {vacancies.map((vacancy) => (
            <CardProfessional
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
      </Wrapper>
    </WrapperResultSearch >
  )
}

export default ResultSearchProfessionals
