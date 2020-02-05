import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import SignupPopup from '../../components/popups/Signup'

import { Form, InputWrapper, Title, StyledButton, StyledLink, WrapperScreen } from './style'
import { emailValidation } from '../../utils/service'

const Login = () => {

  const [modalStatus, setModalStatus] = useState(false)
  const { register, handleSubmit, errors, clearError } = useForm()
  const authUser = useStoreActions(actions => actions.auth.authUser)

  const onSubmit = data => authUser(data)

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
            <Title>entre no rio</Title>
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
            <StyledLink
              to="/esqueci-senha"

            >
              esqueceu sua senha?
            </StyledLink>
          </InputWrapper>
          <Flexbox justify="space-around" className="control">
            <StyledButton
              onClick={toggleModal}

              backgroundColor="#6f0000"
              color="#fc9b44"
            >
              cadastre-se
            </StyledButton>
            <StyledButton type="submit" backgroundColor="#A03C25" color="#fc9b44" marginLeft="10px">
              entrar
            </StyledButton>
          </Flexbox>
        </Form>
      </Flexbox>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}

      >
        <SignupPopup />
      </Modal>
    </WrapperScreen>
  )
}

export default Login