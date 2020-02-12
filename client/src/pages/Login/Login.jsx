import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Form from '../../components/Form'
import Error from '../../components/Error'
import Button from '../../components/Button'

import {
  InputWrapper,
  Background,
  Title,
  StyledLink
} from './style'
import { emailValidation } from '../../utils/service'
import history from '../../history'

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const authUser = useStoreActions(actions => actions.auth.authUser)
  const auth = useStoreState(state => state.auth.auth)
  const loginError = useStoreState(state => state.auth.error)
  const onSubmit = (data) => authUser(data)

  useEffect(() => {
    if (auth) {
      const { user: { type = '' }, isAuthenticated } = auth
      if (isAuthenticated) return history.push(`/dashboard/${type}`)
    }
  }, [auth])

  return (
    <Background>
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
            <Title>entre na raio</Title>
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
            <Error msg={loginError} />
            <StyledLink to="/esqueci-senha">
              esqueceu sua senha?
            </StyledLink>
          </InputWrapper>
          <Flexbox justify="space-around" className="control">
            <Link to='/cadastro'>
              <Button type="submit">
                cadastre-se
              </Button>
            </Link>
            <Button type="submit">
              entrar
            </Button>
          </Flexbox>
        </Form>
      </Flexbox>
    </Background>
  )
}

export default Login