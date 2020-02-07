import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import SignupPopup from '../../components/popups/Signup'

import { Form, InputWrapper, WrapperScreen, StyledFont } from './style'
import { emailValidation } from '../../utils/service'
import history from '../../history'

const Login = () => {

  const [modalStatus, setModalStatus] = useState(false)
  const { register, handleSubmit, errors, clearError } = useForm()
  const authUser = useStoreActions(actions => actions.auth.authUser)
  const auth = useStoreState(state => state.auth.auth)

  const onSubmit = data => authUser(data)

  const toggleModal = () => {
    clearError()
    return setModalStatus(!modalStatus)
  }

  useEffect(() => {
    const { user: { type = '' }, isAuthenticated } = auth
    if (isAuthenticated) return history.push(`/dashboard/${type}`)
  }, [auth])

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
              error={errors.email && errors.email.message}
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
              error={errors.password && errors.password.message}
              register={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres'
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
        <SignupPopup
          toggleModalStatus={() => setModalStatus(!modalStatus)}
        />
      </Modal>

    </WrapperScreen>
  )
}

export default Login