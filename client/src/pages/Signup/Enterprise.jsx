import React from 'react'
import { useForm } from 'react-hook-form'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'

import { emailValidation } from '../../utils/service'
import { Form } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
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
        />
        <InputText
          name="companyName"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Nome da empresa"
          placeholder="Insira o nome da empresa"
        />
        <InputText
          name="tel"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
            pattern: {
              value: /^[0-9]*$/gm,
              message: 'Insira apenas números'
            },
            maxLength: {
              value: 11,
              message: 'Máximo de onze números'
            }
          })}
          label="Contato Telefonico (DDD + nº)"
          placeholder="Insira o telefone da empresa"  
        />
        <InputText
          name="responsibleName"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Nome da pessoa responsável pelo cadastro"
          placeholder="Insira o nome da pessoa responsável"
        />
        <InputText
          name="city"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Cidade sede"
          placeholder="Insira a cidade sede"
        />
        <Textarea
          label="Apresentação da empresa"
          placeholder="Insira uma apresentação"
          rows={5}
          error={errors.companyPresentation && errors.companyPresentation.message}
          name="companyPresentation"
          register={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 15,
              message: 'Apresentação curta demais'
            }
          })}
        />
        <Textarea
          label="Links para site e redes socias da empresa"
          placeholder="Insira aqui links"
          rows={5}
          error={errors.companyLinks && errors.companyLinks.message}
          name="companyLinks"
          register={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 10,
              message: 'Insira pelo menos um link'
            }
          })}
        />
        <Button type="submit">Enviar</Button>
      </Form>
    </Flexbox>
  )
}

export default Enterprise