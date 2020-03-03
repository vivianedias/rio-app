import React, { useEffect, useState } from "react"
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import { Wrapper, Group, TitleSearch, WrapperResultSearch, SubTitle, Text, Link } from './styles'
import CardProfessional from './components/CardProfessional'
import { validatingFields } from '../../utils/service'
import Professionals from "../Signup/Professional"

const ResultSearchProfessionals = ({ data }) => {
  const [notRegister, setNotRegister] = useState()
  const [userFilter, setUserFilter] = useState([])
  const [professionals, setProfessionals] = useState([])
  const getProfessionalAll = useStoreActions(actions => actions.user.getProfessionalAll)
  const getUserAll = useStoreActions(actions => actions.user.getAllUsers)
  const userType = useStoreState(state => state.auth.auth.user)

  const list = []
  Object.keys(data).forEach((item) => (
    Array.isArray(data[item]) ?
      data[item].map((arr) => {
        list.push(arr)
      }) :
      data[item] !== undefined && data[item] !== "" &&
      list.push(data[item])
  ))

  useEffect(async () => {
    const professionalAll = await getProfessionalAll()
    const user = await getUserAll()

    if (professionalAll.data.candidates === "Não existem candidatos cadastradas ainda") {
      setNotRegister("Não existem candidatos(a) cadastrados(a) ainda")
    } else {

      const filter = professionalAll.data.filter((item) => {
        let itemArea = ""
        let areas = ""
        item.expertise_areas.map((value) => {
          itemArea = value
        })
        if (data.expertise_areas.length > 0) {
          data.expertise_areas.map((area) => {
            if (itemArea === area) {
              areas = area
            }
          })
        }

        return (
          itemArea === areas ||
          item.cnpj === data.cnpj ||
          item.state === data.state
        )
      })

      const filterUser = user.data.filter((item) => {
        if (item.type === "professional") {
          let id = ""
          filter.map((us) => {
            if (item._id === us.user_id) {
              id = us.user_id
            }
          })
          return item._id === id ||
            item.self_declaration === data.self_declaration ||
            item.gender === data.gender
        }
      })
      setUserFilter(filterUser)

      let obj = []
      filterUser.map((user) => {
        professionalAll.data.map((professional) => {
          if (user._id === professional.user_id) {
            obj.push(Object.assign({}, user, professional))
          }
        })
      })
      setProfessionals(obj)
    }
  }, [])
  
  return (
    < WrapperResultSearch >
    <Group>
        <Link href="/busca/profissionais">Voltar</Link>
    </Group>
      <Wrapper>
        <Typography component="h2" variant="h4">Resultado de busca de Profissionais</Typography>
        <SubTitle>Resultado de Busca para:</SubTitle>
        <Text>{list.join(", ")}</Text>

        <Group>
          {userType.type === "enterprise" ?
            notRegister || professionals.length == 0 ?
              <Alert severity="warning">{notRegister}</Alert>
              :
              <Group>
                <Text>Foram encontrados {professionals.length} resultados de busca para a sua pesquisa</Text>
              </Group>
            :
            <Group>
              {
                notRegister || professionals.length == 0 ?
                  <Alert severity="warning">{notRegister}</Alert>
                  :
                  professionals.length > 0 ?
                    professionals.map((professional) => (
                      <CardProfessional
                        name={professional.name}
                        email={professional.email}
                        address={professional.address}
                        phone={professional.phone}
                        cnpj={professional.cnpj ? "Possui CNPJ" : "Não possui CNPJ"}
                        pcd={professional.pcd ? "Pcd" : "Não Pcd"}
                        gender={professional.gender}
                        self_declaration={professional.self_declaration}
                        bio={professional.bio}
                        links={professional.links}
                      />
                    )) : <Text>Não achamos nenhum profissional</Text>
              }
            </Group>
          }
        </Group>
      </Wrapper>
    </WrapperResultSearch >
  )
}

export default ResultSearchProfessionals
