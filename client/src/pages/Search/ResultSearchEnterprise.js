import React from "react"
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle, SearchResultEnterprise } from './styles'
import CardProfessional from './components/CardProfessional'

const ResultSearchProfessionals = ({ data }) => {
  console.log(data)
  const vacancies = [
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      state: "sao paulo",
      cnpj: "000000000001-00",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dia"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      state: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dia"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      state: "Conceição - São Paulo, SP",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "10 dia"
    },
    {
      name: "Desenvolvedora",
      function: "..",
      requirements: "..",
      state: "sao paulo",
      cnpj: "Sim",
      period: "10/03/2020 à 20/03/2020",
      cache: "R$: a combinar",
      periodTotal: "1a"
    }
  ]

  const obj = {
    state: 'sao paulo',
    diversity_functions: "nda",
    business_segments: "nda",
    business_fields: "nda",
  }

  let result = []
  let vagas = []
  for (var i in obj) {
    result.push(obj[i])
  }

  for (var i in vacancies) {
    vagas.push(vacancies[i])
  }

  let count = []

  vacancies.map((item) => {
    for (var i in item) {
      vagas.push(item[i])
    }
  })

  result.map((value) => (
    vagas.map((item) => (
      item === value ? count.push(1) : ""
    ))
  ))

  console.log('vacancies: ', vagas);

  console.log('counts', count);

  return (
    <WrapperResultSearch height="100%" >
      <Wrapper>

        <TitleSearch>Resultado de busca de Empresas</TitleSearch>
        <SubTitle>Resultado de Busca para:</SubTitle>

        <SearchResultEnterprise>
          Foram encontrados {count.length} resultados de busca para a sua pesquisa
       </SearchResultEnterprise>

      </Wrapper>
    </WrapperResultSearch>
  )
}

export default ResultSearchProfessionals
