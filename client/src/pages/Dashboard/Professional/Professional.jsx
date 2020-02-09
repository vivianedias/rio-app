import React, { useState, useEffect } from "react"
import Modal from '../../../components/Modal'
import InfoDelete from '../../../components/popups/InfoDelete'
import { useStoreActions } from 'easy-peasy'
import Helper from '../../../utils/Helper'

import { Background, Button, Group, Title, Label, Textarea, Container, GroupButton } from './style'

const Professional = () => {
  const getProfessional = useStoreActions(actions => actions.get.getEnterprise)

  const [response, setResponse] = useState({})
  const [modalStatus, setModalStatus] = useState(false)

  useEffect(async () => {
    const request = await getProfessional()
    setResponse(request)
  }, [])

  return (
    <>
      {
        response ?
          <Background>
            <Container>
              <Title>Meu Perfil</Title>
              <Group>
                <Label>PcD (Pessoa com deficiência):</Label>
                <Textarea>{response.data.pcd ? "Sim" : "Não"}</Textarea>
              </Group>
              <Group>
                <Label>Estado de origem:</Label>
                <Textarea>{Helper.validatingFields(response.data.home_state)}</Textarea>
              </Group>
              <Group>
                <Label>Estado de residência:</Label>
                <Textarea>{Helper.validatingFields(response.data.state)}</Textarea>
              </Group>
              <Group>
                <Label>Cidade de Residência:</Label>
                <Textarea>{Helper.validatingFields(response.data.city)}</Textarea>
              </Group>
              <Group>
                <Label>Endereço:</Label>
                <Textarea>{Helper.validatingFields(response.data.address)}</Textarea>
              </Group>
              <Group>
                <Label>Formação:</Label>
                <Textarea>{Helper.validatingFields(response.data.formation_institution)}</Textarea>
              </Group>
              {response.data.cnpj &&
                <Group>
                  <Label>CNPJ:</Label>
                  <Textarea>
                    {Helper.validatingFields(response.data.cnpj_type)}
                  </Textarea>
                </Group>
              }
              {response.data.identity_content &&
                <Group>
                  <Label>Segmentos:</Label>
                  <Textarea>
                    {Helper.validatingFields(response.data.identity_segments) &&
                      response.data.identity_segments.map((state, index) => (
                        response.data.identity_segments.length === index + 1 ?
                          `${state}` :
                          `${state}, `
                      ))
                    }
                  </Textarea>
                </Group>
              }
              <Group>
                <Label>Áreas de atuação:</Label>
                <Textarea>
                  {Helper.validatingFields(response.data.expertise_areas) &&
                    response.data.expertise_areas.map((areas, index) => (
                      response.data.expertise_areas.length === index + 1 ?
                        `${areas}` :
                        `${areas}, `
                    ))
                  }
                </Textarea>
              </Group>
              <Group>
                <Label>É associado(a) da APAN:</Label>
                <Textarea>{response.data.apan_associate ? "Sim" : "Não"}</Textarea>
              </Group>
              <Group>
                <Label>Bio:</Label>
                <Textarea>{Helper.validatingFields(response.data.bio)}</Textarea>
              </Group>
              <Group>
                <Label>Links:</Label>
                <Textarea>{Helper.validatingFields(response.data.links)}</Textarea>
              </Group>

            </Container>

            <GroupButton>
              <Button onClick={() => setModalStatus(!modalStatus)} I>
                Deletar Perfil
        </Button>
            </GroupButton>
            <Modal
              isOpen={modalStatus}
              onClose={() => setModalStatus(false)}
              width="500px"
            >
              <InfoDelete
                toggleModalStatus={() => setModalStatus(!modalStatus)}
              />
            </Modal>
          </Background>
          : <p>Loading...</p>
      }
    </>
  )
}

export default Professional;