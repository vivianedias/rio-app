import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { useStoreState } from 'easy-peasy'



import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import SignupPopup from '../../components/popups/Signup'

import { Form, InputWrapper, WrapperScreen, StyledFont } from './style'
import { emailValidation } from '../../utils/service'

import style from './style.css'


const Login = () => {

  const [modalStatus, setModalStatus] = useState(false)
  const { register, handleSubmit, errors, clearError } = useForm()

  const onSubmit = data => { console.log(data) }

  const toggleModal = () => {
    clearError()
    return setModalStatus(!modalStatus)
  }

  return (
    <WrapperScreen>
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
            <StyledFont>entre na raio</StyledFont>
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
              className="has-link"
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
        className="modal-register"
      >
        <SignupPopup />
      </Modal>

    </WrapperScreen>
  )
}

export default Login