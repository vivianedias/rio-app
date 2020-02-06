import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import InfoDelete from '../../../components/popups/InfoDelete'
import InfoPlans from '../../../components/popups/InfoPlans'

import { Background, Group, ButtonDelete, Label, Container, Textarea, Title, GroupButton } from './style'

const EnterpriseProfile = () => {

  const [modalStatus, setModalStatus] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [modalInfoPlans, setModalInfoPlans] = useState(true)

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
        <Group>
          <Label>Nome:</Label>
          <Textarea>Sabrina Pereira</Textarea>
        </Group>
        <Group>
          <Label>Email:</Label>
          <Textarea>sabrina@hotmail.com</Textarea>
        </Group>
        <Group>
          <Label>Auto Declaração:</Label>
          <Textarea>Branca</Textarea>
        </Group>
        <Group>
          <Label>Apresentação da Empresa:</Label>
          <Textarea>-</Textarea>
        </Group>
        <Group>
          <Label>Estado:</Label>
          <Textarea>São Paulo</Textarea>
        </Group>
        <Group>
          <Label>Outros estados que a empresa tem atuação:</Label>
          <Textarea>Minas Gerais</Textarea>
        </Group>
        <Group>
          <Label>Endereço:</Label>
          <Textarea>Avenida São Paulo</Textarea>
        </Group>
        <Group>
          <Label>Telefone:</Label>
          <Textarea>11 99293-1569</Textarea>
        </Group>
        <Group>
          <Label>Tipo CNPJ:</Label>
          <Textarea>MEI</Textarea>
        </Group>
        <Group>
          <Label>Sua empresa é vocacionada para conteúdo identitário?:</Label>
          <Textarea>Não</Textarea>
        </Group>
        <Group>
          <Label>A empresa é associado(a) da APAN:</Label>
          <Textarea>Não</Textarea>
        </Group>
        <Group>
          <Label>Links:</Label>
          <Textarea>-</Textarea>
        </Group>
      </Container>

      <GroupButton>
        <Link to="/cadastrar/vagas">
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
  )
}

export default EnterpriseProfile