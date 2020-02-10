import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Field from '../../components/Field'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { If } from '../../components/If'
import InfoDelete from '../../components/popups/InfoDelete'
import InfoPlans from '../../components/popups/InfoPlans'

import { fields } from './dicio'
import {
  Background,
  ButtonDelete,
  GroupButtons,
  Container,
  Title
} from './style'

const Dashboard = () => {
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const user = useStoreState(state => state.user.user)

  const [modalStatus, setModalStatus] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [modalInfoPlans, setModalInfoPlans] = useState(false)

  useEffect(() => {
    getUser(userType.type)
    if(userType.type === "enterprise") setModalInfoPlans(true)
  }, [userType])

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
          {fields.map(field => {
            if (typeof user[field.name] !== 'undefined') {
              return (
                <>
                  <Field name={field.display} content={user[field.name]} />
                </>
              )
            }
          })}
      </Container>
      <GroupButtons>
        <If condition={userType.type === "enterprise"}>
          <Link to="/cadastrar/vagas">
            <Button disabled={disabledButton} >
              Cadastrar Vagas
            </Button>
          </Link>
        </If>
        <ButtonDelete
          color="#FFFFFF"
          onClick={() => setModalStatus(true)}
        >
          Deletar Perfil
        </ButtonDelete>
      </GroupButtons>
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

export default Dashboard