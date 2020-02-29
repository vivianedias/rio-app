import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Person from '@material-ui/icons/Person'
import Star from '@material-ui/icons/Star'
import Tooltip from '@material-ui/core/Tooltip'
import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import Description from '@material-ui/icons/Description'
import School from '@material-ui/icons/School'
import Face from '@material-ui/icons/Face'
import Email from '@material-ui/icons/Email'
import uuid from 'uuid'

import Field from '../../components/Field'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { If } from '../../components/If'
import InfoDelete from '../../components/popups/InfoDelete'
import BoasVindas from '../../components/popups/BoasVindas'
import seloPlans from '../../assets/selo.png'
import loading from '../../assets/loading.svg'

import { fields } from './dicio'
import {
  Background,
  ButtonDelete,
  GroupButtons,
  Container,
} from './style'

const Dashboard = () => {
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const user = useStoreState(state => state.user.user)

  const [modalStatus, setModalStatus] = useState(false)
  // const [disabledButton, setDisabledButton] = useState(false) // TODO: Add count to set or unset register vacancy button
  const [modalInfoPlans, setModalInfoPlans] = useState(true)
  const [modalBoasVindas, setModalBoasVindas] = useState(false)

  useEffect(() => {
    typeof userType.type !== 'undefined' && getUser(userType.type)
    if (userType.type === "professional") setModalBoasVindas(true)
    if (userType.type === "enterprise") setModalInfoPlans(true)
  }, [userType, getUser])
  console.log(user)
  return (
    <Background>
      {Object.values(user).length ? (
      <>
      <Container className='header'>
        <div className="container clearfix et_menu_container">
          <div className="profile-wrapper">
            <div className="avatar">
              <span className="image">
                { userType.type === "enterprise" ?
                  <Enterprise style={{ fontSize: 60 }} /> :
                  <Person style={{ fontSize: 60 }} /> }
              </span>
                <Typography component="h2" variant="h6">
                  Perfil {userType.type === "enterprise" ? "Empresa" : "Profissional"}
                </Typography>
            </div>
            <div className="user-info">
              <Typography color="secondary" component="h2" variant="h5">{user.name}
                {user.apan_associate && <Tooltip title="Associado APAN"><Star /></Tooltip>}
              </Typography>
              <Typography component="subtitle2"><Email />{user.email}</Typography>
              <Typography component="body1"><LocationOn /> {user.city}</Typography>
              
              { userType.type === "enterprise" ?
                <Typography component="body1"><Description /> {user.presentation}</Typography> :
                <Typography component="body1"><Face /> {user.bio}</Typography> }
            </div>   
          </div>   
        </div>
      </Container>
      <div>
      {fields.map(field => {
          if (typeof user[field.name] !== 'undefined') {
            return (
              <Field
                key={uuid()}
                name={field.display}
                content={user[field.name]}
              />
            )
          }
          return false
        })}
      </div>  
      <GroupButtons>
        <If condition={userType.type === "enterprise"}>
          <Link to="/cadastro/vaga">
            <Button>
              Cadastrar Vagas
            </Button>
          </Link>
          <Link to={`/listagem/vagas/${user.enterprise_id}`}>
            <Button>
              Ver minhas vagas
            </Button>
          </Link>
          <Link to={'/busca/profissionais'}>
            <Button>
              Buscar profissional
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
        isOpen={modalBoasVindas}
        onClose={() => setModalBoasVindas(false)}
        width="500px"
      >
        <BoasVindas />
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
      <Modal
        isOpen={modalInfoPlans}
        onClose={() => setModalStatus(false)}
        width="500px"
      >
       <img src={seloPlans} />
       </Modal></>) : 
       <img src={loading} />}
    </Background>
  )
}

export default Dashboard