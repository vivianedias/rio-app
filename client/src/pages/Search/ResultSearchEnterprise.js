import React, { useEffect, useState } from "react"
import { useStoreActions } from 'easy-peasy'
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle, SearchResultEnterprise } from './styles'

const ResultSearchProfessionals = ({ data }) => {
  const [count, setCount] = useState([])
  const getEnterpriseAll = useStoreActions(actions => actions.enterprise.getAll)

  useEffect(async () => {
    const enterpriseAll = await getEnterpriseAll()

    let result = []
    let enterprise = []
    let count = []

    for (var i in data) {
      if (Array.isArray(data[i])) {
        data[i].map((arr) => {
          result.push(arr)
        })
      } else {
        result.push(data[i])
      }
    }

    for (var i in enterpriseAll.data) {
      enterprise.push(enterpriseAll.data[i].state)
    }

    result.map((value) => (
      enterprise.map((item) => (
        item === value ? count.push(1) : ""
      ))
    ))

    setCount(count)
  }, [])

  return (
    <WrapperResultSearch>
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
