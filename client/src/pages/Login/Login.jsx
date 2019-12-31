import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Modal from '../../components/Modal'
import { Form, InputWrapper } from './style'

const Login = () => {
  
  const errors = {}
  const [modalStatus, setModalStatus] = useState(false)
  return (
    <Fragment>
      <Flexbox center>
        <Form onSubmit={() => alert('bla')}>
          <h1 className="title has-text-danger">entre no rio</h1>
          <InputWrapper>
            <InputText 
              label="E-mail"
              name="email"
              type="text"
              placeholder="e-mail"
              onChange={() => alert('bla')}
              showLeftIcon={true}
              leftIcon="fa-envelope"
              showRightIcon={true}
              error={errors && errors.email}
              isEdit={true}
            />
            <InputText 
              label="Senha"
              name="password"
              type="password"
              placeholder="senha"
              onChange={() => alert('bla')}
              showLeftIcon={true}
              leftIcon="fa-lock"
              showRightIcon={true}
              error={errors && errors.password}
              isEdit={true}
            />
            <Link 
              to="/esqueci-senha" 
              className="has-text-link"
            >
              esqueceu sua senha?
            </Link>
          </InputWrapper>
          <Flexbox justify="space-around" className="control">    
            <div
              onClick={() => setModalStatus(!modalStatus)}
              className="button is-rounded"
            >
              cadastre-se
            </div>
            <button 
              type="submit" 
              className="button is-danger is-rounded"
            >
              entrar
            </button>     
          </Flexbox>
        </Form>
      </Flexbox>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        width="200px"
      >
        olá
      </Modal>
    </Fragment>
  )
}

export default Login