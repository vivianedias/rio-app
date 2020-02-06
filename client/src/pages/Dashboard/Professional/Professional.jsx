import React, { useState } from "react"
import Modal from '../../../components/Modal'
import InfoDelete from '../../../components/popups/InfoDelete'
import { Background, Button, Group, Title } from './style'

const Professional = () => {
  const [modalStatus, setModalStatus] = useState(false)

return (
  <Background>
      <Title>Meu Perfil</Title>
    <Group>
      <Button onClick={() => setModalStatus(!modalStatus)} I>
        Deletar Perfil
        </Button>
    </Group>
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