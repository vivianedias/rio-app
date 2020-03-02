import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Person from '@material-ui/icons/Person'

import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import Paper from '@material-ui/core/Paper';
// import School from '@material-ui/icons/School'
import PostAdd from '@material-ui/icons/PostAdd';
import Delete from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import Visibility from '@material-ui/icons/Visibility';
import { getInfo } from './user_info' 
import uuid from 'uuid'

import Profile from './Profile'
import Info from './Info'
import FABMenu from '../../comps/FABMenu'
import Field from '../../components/Field'
import Modal from '../../components/Modal'
import NewModal from '../../comps/Modal'
import Button from '../../comps/Button'
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
  const userType = useStoreState(state => state.auth.auth.user.type)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const user = useStoreState(state => state.user.user)
  

  const [modalStatus, setModalStatus] = useState(false)
  // const [disabledButton, setDisabledButton] = useState(false) // TODO: Add count to set or unset register vacancy button
  const [modalInfoPlans, setModalInfoPlans] = useState(false)
  const [modalBoasVindas, setModalBoasVindas] = useState(false)

  useEffect(() => {
    typeof userType.type !== 'undefined' && getUser(userType.type)
    if (userType.type === "professional") setModalBoasVindas(true)
    if (userType.type === "enterprise") setModalInfoPlans(true)
  }, [userType, getUser])

  const actions = [
    { icon: <PostAdd />, name: 'Cadastrar Vagas', link: '/cadastro/vaga' },
    { icon: <Visibility />, name: 'Ver Minhas Vagas', link: `/listagem/vagas/${user.enterprise_id}` },
    { icon: <Search />, name: 'Buscar Profissional', link: '/busca/profissionais'},
    { icon: <Delete />, name: 'Deletar Perfil', onClick: () => setModalStatus(true)},
  ];
  console.table(userType)
  return (
    <Background>
      
      {Object.values(user).length ? (
      <>
      <Container className='header container clearfix et_menu_container'>
        <div className="container clearfix et_menu_container">
          <Profile
            name={user.name}
            icon={ userType.type === "enterprise" ?
              <Enterprise style={{ fontSize: 60 }} /> :
              <Person style={{ fontSize: 60 }} /> }
            associate={user.apan_associate}
            type={userType.type === "enterprise" ? "Empresa" : "Profissional"}
            bio={userType.type === "enterprise" ? user.description : user.bio}
          />
          <Info
            infoList={getInfo(user)[userType.type]}
          />
           
        </div>
          
      </Container>
      {/* <div>
      {fields.map(field => {
          if (typeof user[field.name] !== 'undefined') {
            return (
              <>
                <Typography>{field.display}</Typography>
                <Typography>{user[field.name]}</Typography>
              </>
            )
          }
          return false
        })}
      </div> */}
      {userType.type === "enterprise" && <FABMenu actionButtons={actions} />  }
      
      <GroupButtons className="container">
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
        <Button
          color="#FFFFFF"
          variant="contained"
          color="primary"
          size="lg"
          onClick={() => setModalStatus(true)}
        >
          Deletar Perfil <Delete />
        </Button>
      </GroupButtons>

      <Modal
        isOpen={modalBoasVindas}
        onClose={() => setModalBoasVindas(false)}
        width="500px"
      >
        <BoasVindas />
      </Modal>
      <NewModal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        title="Deseja realmente excluir sua conta?"
      >
        <Button color="dark"><Delete />Excluir</Button>
      </NewModal>
        <Modal
        isOpen={modalInfoPlans}
        onClose={() => setModalInfoPlans(false)}
      >
       <img src={seloPlans} />
       </Modal>
      </>) : 
       <img src={loading} />}
    </Background>
  )
}

export default Dashboard