import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'
import Select from '../../components/Select'
import Modal from '../../components/Modal'
import SignupPopup from '../../components/popups/Signup'

import { emailValidation, getUserType } from '../../utils/service'
import {
  gender,
  color
} from './dicioFields'

import { Form, Background } from './styles'

const Users = () => {
  const { register, handleSubmit, errors, getValues } = useForm()
  //   defaultValues: {
  //     name: 'Viviane',
  //     gender:'bla',
  //     email: 'bla@gmail.com',
  //     phone: '123123123',
  //     password: 'blabla',
  //     confirmPassword: 'blabla',
  //   }
  // })

  const registerUser = useStoreActions(actions => actions.register.registerUser)
  const [modalStatus, setModalStatus] = useState(false)

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      confirm_password: data.confirmPassword,
      self_declaration: data.selfDeclaration,
      type: localStorage.user_type
    }

    return registerUser(formatted)
  }

  useEffect(() => {
    if (typeof localStorage.user_type === 'undefined') return setModalStatus(true)
  }, []);

  return (
    <Background>
      <Flexbox justify="center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="email"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
              pattern: {
                value: emailValidation(),
                message: 'Insira um endereço de e-mail válido'
              }
            })}
            label="Endereço de e-mail"
            placeholder="Insira um endereço de e-mail válido"
            error={errors.email && errors.email.message}
          />

          <InputText
            name="password"
            type="password"
            register={register({
              required: 'Insira uma senha',
            })}
            label="Senha"
            placeholder="Insira uma senha"
            error={errors.password && errors.password.message}
          />

          <InputText
            name="confirmPassword"
            type="password"
            register={register({
              required: 'Confirme sua senha',
              validate: {
                isMatch: value => value === getValues().password || 'As senhas não combinam, tente novamente',
              },
              minLength: {
                value: 6,
                message: 'A senha precisa ter no mínimo 6 caracteres'
              }
            })}
            label="Confirme sua senha"
            placeholder="Insira uma senha identica"
            error={errors.confirmPassword && errors.confirmPassword.message}
          />

          <InputText
            name="name"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Nome"
            placeholder="Insira seu nome"
            error={errors.name && errors.name.message}
          />


          <InputText
            name="phone"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
              pattern: {
                message: 'Insira apenas números'
              },
              maxLength: {
                value: 11,
                message: 'Máximo de onze números'
              }
            })}
            label="Contato Telefonico (DDD + nº)"
            placeholder="Insira aqui"
            error={errors.phone && errors.phone.message}
          />

          <Select
            name="gender"
            label="Gênero"
            error={errors.gender && errors.gender.message}
            firstValue="Gênero"
            register={register}
          >
            {gender.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Select
            name="selfDeclaration"
            label="Auto Declaração (pessoa responsável pelo cadastro)"
            register={register}
            firstValue="Auto Declaração"
            error={errors.selfDeclaration && errors.selfDeclaration.message}
          >
            {color.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Button
            type="submit"
          >
            Enviar
          </Button>
          {/* TODO: Tratar erros do request */}
        </Form>
      </Flexbox>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(true)}
        width="500px"
      >
        <SignupPopup
          toggleModalStatus={() => setModalStatus(!modalStatus)}
        />
      </Modal>
    </Background>
  )
}

export default Users