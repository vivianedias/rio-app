import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import { Link } from 'react-router-dom'

import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import InfoDelete from '../../../components/popups/InfoDelete'
import InfoPlans from '../../../components/popups/InfoPlans'
import Helper from '../../../utils/Helper'

import { Background, Group, ButtonDelete, Label, Container, Textarea, Title, GroupButton } from './style'

const EnterpriseProfile = () => {
  const getEnterprise = useStoreActions(actions => actions.get.getEnterprise)

  const [modalStatus, setModalStatus] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [modalInfoPlans, setModalInfoPlans] = useState(true)
  const [response, setResponse] = useState({})

  useEffect(async () => {
    const request = await getEnterprise()
    setResponse(request)
  }, [])

  return (
    <>
      {
        response.data ?
          <Background>
            <Container>
              <Title>Meu Perfil</Title>
              <Group>
                <Label>Email:</Label>
                <Textarea>{Helper.validatingFields(response.data.user_email)}</Textarea>
              </Group>
              <Group>
                <Label>Apresentação da Empresa:</Label>
                <Textarea>{Helper.validatingFields(response.data.presentation)}</Textarea>
              </Group>
              <Group>
                <Label>Links da Empresa:</Label>
                <Textarea>{Helper.validatingFields(response.data.links)}</Textarea>
              </Group>
              <Group>
                <Label>Estado:</Label>
                <Textarea>{Helper.validatingFields(response.data.state)}</Textarea>
              </Group>
              <Group>
                <Label>Cidade:</Label>
                <Textarea>{Helper.validatingFields(response.data.city)}</Textarea>
              </Group>
              <Group>
                <Label>Outros estados que a empresa tem atuação:</Label>
                <Textarea>
                  {
                    Helper.validatingFields(response.data.other_states) &&
                    response.data.other_states.map((state, index) => (
                      response.data.other_states.length === index + 1 ?
                        `${state}` :
                        `${state}, `
                    ))
                  }
                </Textarea>
              </Group>
              <Group>
                <Label>Segmento de atuação:</Label>
                <Textarea>
                  {Helper.validatingFields(response.data.business_segments) &&
                    response.data.business_segments.map((segments, index) => (
                      response.data.business_segments.length === index + 1 ?
                        `${segments}` :
                        `${segments}, `
                    ))
                  }
                </Textarea>
              </Group>
              <Group>
                <Label>Campos de atuação:</Label>
                <Textarea>
                  {Helper.validatingFields(response.data.business_fields) &&
                    response.data.business_fields.map((fields, index) => (
                      response.data.business_fields.length === index + 1 ?
                        `${fields}` :
                        `${fields}, `
                    ))
                  }
                </Textarea>
              </Group>
              <Group>
                <Label>Funções que busca diversificar na empresa:</Label>
                <Textarea>
                  {Helper.validatingFields(response.data.diversity_functions) &&
                    response.data.diversity_functions.map((functions, index) => (
                      response.data.diversity_functions.length === index + 1 ?
                        `${functions}` :
                        `${functions}, `
                    ))
                  }
                </Textarea>
              </Group>
              <Group>
                <Label>Tipo CNPJ:</Label>
                <Textarea>{Helper.validatingFields(response.data.cnpj_type)}</Textarea>
              </Group>
              {
                response.data.identity_content &&
                <Group>
                  <Label>Segmentos:</Label>
                  <Textarea>
                    {Helper.validatingFields(response.data.identity_segments) &&
                      response.data.identity_segments.map((segments, index) => (
                        response.data.identity_segments.length === index + 1 ?
                          `${segments}` :
                          `${segments}, `
                      ))
                    }
                  </Textarea>
                </Group>
              }
              <Group>
                <Label>A empresa é associado(a) da APAN:</Label>
                <Textarea>{response.data.apan_associate ? "Sim" : "Não"}</Textarea>
              </Group>
            </Container>

            <GroupButton>
              <Link to="/cadastro/vaga">
                <Button disabled={disabledButton} >
                  Cadastrar Vagas
          </Button>
              </Link>
              <ButtonDelete
                color="#FFFFFF"
                onClick={() => setModalStatus(!modalStatus)}
              >
                Deletar Perfil
        </ButtonDelete>
            </GroupButton>
            <Modal
              isOpen={modalInfoPlans}
              onClose={() => setModalInfoPlans(false)}
              width="500px"
            >
              <InfoPlans
                toggleModalStatus={() => setModalInfoPlans(!modalInfoPlans)}
              />
            </Modal>
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

export default EnterpriseProfile