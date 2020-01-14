import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { useStoreState } from 'easy-peasy'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import SignupPopup from '../../components/popups/Signup'

import { Form, InputWrapper } from './style'
import { emailValidation } from '../../utils/service'

const Login = () => {
  
  const [modalStatus, setModalStatus] = useState(false)
  const { register, handleSubmit, errors, clearError } = useForm()

  const onSubmit = data => { console.log(data) }

  const toggleModal = () => {
    clearError()
    return setModalStatus(!modalStatus)
  }

  return (
    <Fragment>
      <Flexbox center>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Flexbox
            center
            width="100%"
            margin={{
              top: 10,
              bottom: 10,
              left: 0,
              right: 0
            }}
          >
            <h1 className="title has-text-danger">entre no rio</h1>
          </Flexbox>
          <InputWrapper>
            <InputText 
              label="E-mail"
              type="text"
              name="email"
              placeholder="e-mail"
              icon="fa-envelope"
              error={errors && errors.email}
              isEdit={true}
              register={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  value: emailValidation(),
                  message: 'Insira um endereço de e-mail válido'
                }
              })}
            />
            <InputText 
              label="Senha"
              type="password"
              name="password"
              placeholder="senha"
              icon="fa-lock"
              error={errors && errors.password}
              isEdit={true}
              register={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 10,
                  message: 'A senha deve ter no mínimo 10 caracteres'
                }
              })}
            />
            <Link 
              to="/esqueci-senha" 
              className="has-text-link"
            >
              esqueceu sua senha?
            </Link>
          </InputWrapper>
          <Flexbox justify="space-around" className="control">    
            <Button
              onClick={toggleModal}
              styles="button is-rounded"
            >
              cadastre-se
            </Button>
            <Button type="submit" styles="is-danger is-rounded">
              entrar
            </Button>     
          </Flexbox>
        </Form>
      </Flexbox>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        width="500px"
      >
        <SignupPopup />
      </Modal>
    </Fragment>
  )
}

export default Login