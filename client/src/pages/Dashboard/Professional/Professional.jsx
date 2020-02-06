import React, { useState, useEffect } from "react"
import Modal from '../../../components/Modal'
import InfoDelete from '../../../components/popups/InfoDelete'
import { Background, Button, Group, Title, Label, Textarea, Container, GroupButton } from './style'

const Professional = () => {
  const [modalStatus, setModalStatus] = useState(false)

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
          <Label>Gênero:</Label>
          <Textarea>Feminino</Textarea>
        </Group>
        <Group>
          <Label>Orientação sexual:</Label>
          <Textarea>Bissexual</Textarea>
        </Group>
        <Group>
          <Label>Pessoa com deficiência:</Label>
          <Textarea>Não</Textarea>
        </Group>
        <Group>
          <Label>Estado de origem:</Label>
          <Textarea>São Paulo</Textarea>
        </Group>
        <Group>
          <Label>Estado de residência:</Label>
          <Textarea>São Paulo</Textarea>
        </Group>
        <Group>
          <Label>Cidade de Residência:</Label>
          <Textarea>São Bernardo do Campo</Textarea>
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
          <Label>Formação:</Label>
          <Textarea>Autoditada</Textarea>
        </Group>
        <Group>
          <Label>Qual foi a instituição ou processo de formação:</Label>
          <Textarea>-</Textarea>
        </Group>
        <Group>
          <Label>Possui CNPJ:</Label>
          <Textarea>Sim</Textarea>
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
          <Label>É associado(a) da APAN:</Label>
          <Textarea>Não</Textarea>
        </Group>
        <Group>
          <Label>Bio:</Label>
          <Textarea>-</Textarea>
        </Group>
        <Group>
          <Label>Links:</Label>
          <Textarea>-</Textarea>
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
  )
}

export default Professional;