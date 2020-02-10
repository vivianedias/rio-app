import React, { useEffect, useState } from "react"
import { useStoreActions } from 'easy-peasy'
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle } from './styles'
import CardProfessional from './components/CardProfessional'
import Helper from '../../utils/Helper'


const ResultSearchProfessionals = ({ data }) => {
  const [notRegister, setNotRegister] = useState()
  const [vacancies, setVacancies] = useState([])
  const getProfessionalAll = useStoreActions(actions => actions.get.getProfessionalAll)

  useEffect(async () => {
    const professionalAll = await getProfessionalAll()

    if (professionalAll.data.candidates === "Não existem candidatos cadastradas ainda" || professionalAll) {
      setNotRegister("Não existem candidatos cadastradas ainda")
    } else {

      professionalAll.data.filter((item, index) => (
        item.expertise_areas.map((obj) => (
          data.expertise_areas.map((data) => {
            if (obj === data) {
              // vacancies.push()
            }
          })
        ))
      ))

      let filter = professionalAll.data.filter((item) => {
        return (item.gender === data.gender ||
          item.cnpj === data.cnpj ||
          item.self_declaration === data.self_declaration ||
          item.state === data.state ||
          item.sexual_orientation === data.sexual_orientation)
      })

      setVacancies(filter)
    }
  }, [])

  return (
    < WrapperResultSearch >
      <Wrapper>

        <TitleSearch>Resultado de busca de Profissionais</TitleSearch>
        <SubTitle>Resultado de Busca para:</SubTitle>
        <Group>
          {
            notRegister ?
              <p>"Não existem candidatos cadastradas ainda"</p>
              :
              vacancies.map((vacancy) => (
                <CardProfessional
                  state={vacancy.state}
                  cnpj={vacancy.cnpj ? "Sim" : "Não"}
                  expertise_areas={
                    Helper.validatingFields(vacancy.expertise_areas) &&
                    vacancy.expertise_areas.map((state, index) => (
                      vacancy.expertise_areas.length === index + 1 ?
                        `${state}` :
                        `${state}, `
                    ))}
                    self_declaration={vacancy.self_declaration}
                  pcd={vacancy.pcd ? "SIm" : "Não"}
                  bio={vacancy.bio}
                />
              ))

          }
        </Group>
      </Wrapper>
    </WrapperResultSearch >
  )
}

export default ResultSearchProfessionals
