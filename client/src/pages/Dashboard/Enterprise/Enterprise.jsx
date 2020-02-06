import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import InfoDelete from '../../../components/popups/InfoDelete'

import { Background, Group, ButtonDelete, Label } from './style'

const EnterpriseProfile = () => {

  const [modalStatus, setModalStatus] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  return (
    <Background>
      <Label>Meu Perfil</Label>
      <Group>
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

export default EnterpriseProfile