import React, { useEffect, useState } from "react"
import { useStoreActions } from 'easy-peasy'
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle, Text } from './styles'
import CardProfessional from './components/CardProfessional'
import { validatingFields } from '../../utils/service'
import Professionals from "../Signup/Professional"

const ResultSearchProfessionals = ({ data }) => {
  const [notRegister, setNotRegister] = useState()
  const [professionals, setProfessionals] = useState([])
  const getProfessionalAll = useStoreActions(actions => actions.user.getProfessionalAll)
  const getUserAll = useStoreActions(actions => actions.user.getUserAll)

  useEffect(async () => {
    const professionalAll = await getProfessionalAll()
    const user = await getUserAll()
    
    if (professionalAll.data.candidates === "Não existem candidatos cadastradas ainda") {
      setNotRegister("Não existem candidatos(a) cadastrados(a) ainda")
    } else {
      
      let filter = professionalAll.data.filter((item,index) => {
        let areas = data[index] && data[index].expertise_areas
        return (
          item.expertise_areas === areas ||
          item.gender === data.gender ||
          item.cnpj === data.cnpj ||
          item.self_declaration === data.self_declaration ||
          item.state === data.state ||
          item.sexual_orientation === data.sexual_orientation
        )
      })
  
      let filterUser = user.data.filter((item, index) => {
        let id = filter[index] && filter[index].user_id
        return item._id === id
      })

      setProfessionals(filterUser)
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
              <p>{setNotRegister}</p>
              :
              professionals.length > 0 ?
                professionals.map((professional) => (
                  <CardProfessional
                    name={professional.name}
                    email={professional.email}
                    gender={professional.gender}
                    phone={professional.phone}
                    sexual_orientation={professional.sexual_orientation}
                    self_declaration={professional.self_declaration}
                  />
                )) : <Text>Não achamos nenhum profissional</Text>

          }
        </Group>
      </Wrapper>
    </WrapperResultSearch >
  )
}

export default ResultSearchProfessionals
