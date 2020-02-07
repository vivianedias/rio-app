import React from "react"
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle, SearchResultEnterprise } from './styles'


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

          Foram encontrados {} resultados de busca para a sua pesquisa
       </SearchResultEnterprise>
      </Wrapper>
    </WrapperResultSearch>
  )
}

export default ResultSearchProfessionals
