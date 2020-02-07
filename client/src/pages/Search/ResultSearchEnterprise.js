import React from "react"
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle, SearchResultEnterprise } from './styles'
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
      periodTotal: "10 dia"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dia"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dia"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      location: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "1a"
    }
  ]


  console.log('vacancies: ', vacancies);


  const searchTypes = vacancies
    .map(dataItem => dataItem.periodTotal)
    .filter((searchTypes, index, array) => array.indexOf(searchTypes) === index),

    counts = searchTypes
      .map(searchTypes => ({
        type: searchTypes,
        count: searchTypes.length
      }));



  console.log('counts', counts);

  return (
    <WrapperResultSearch height="100%" >
      <Wrapper>

        <TitleSearch>Resultado de busca de Empresas</TitleSearch>
        <SubTitle>Resultado de Busca para:</SubTitle>

        <SearchResultEnterprise>
          Foram encontrados {vacancies.length} resultados de busca para a sua pesquisa
       </SearchResultEnterprise>
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
    </WrapperResultSearch>
  )
}

export default ResultSearchProfessionals
