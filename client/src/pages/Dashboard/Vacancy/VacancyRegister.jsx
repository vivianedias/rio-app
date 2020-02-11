import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useStoreActions, } from 'easy-peasy'

import InputText from '../../../components/InputText'
import Button from '../../../components/Button'
import { If } from '../../../components/If'

import history from '../../../history'
import { Form, Background, Group, Title } from './style'

const Text = styled.p`
  font-size: 16px; 
  color: #FFFFFF; 
  font-weight: 600;
`;

const Vacancy = () => {
  const {
    register,
    handleSubmit,
    errors,
  } = useForm()

  const registerJob = useStoreActions(actions => actions.enterprise.registerJob)
  const [status, setStatus] = useState('')
  const onSubmit = async (data) => {
    const res = await registerJob({
      ...data,
      company_name: data.companyName,
      total_period: data.start + '-' + data.end
    })

    if (res.status === 200) {
      setStatus(res.msg)
      return history.push('/dashboard/empresa')
    }
  }

  return (
    <Background>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Cadastro de Vaga</Title>
        <InputText
          name="title"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Nome da Vaga"
          placeholder="Insira o nome da vaga"
          error={errors.title && errors.title.message}
        />

        <InputText
          name="function"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Função"
          placeholder="Insira a função"
          error={errors.function && errors.function.message}
        />

        <InputText
          name="requirements"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          label="Requisitos"
          placeholder="Insira os requisitos da vaga"
          error={errors.requirements && errors.requirements.message}
        />

        <InputText
          name="location"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Endereço"
          placeholder="Insira o endereço"
          error={errors.location && errors.location.message}
        />

        <Group>
          <InputText
            name="start"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Data Inicial"
            placeholder="Insira a data inicial"
            error={errors.address && errors.address.message}
          />
          <InputText
            name="end"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Data Final"
            placeholder="Insira a data final"
            error={errors.address && errors.address.message}
          />
        </Group>

        <InputText
          name="cache"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Cachê"
          placeholder="Insira o valor do cachê"
          error={errors.formationInstitution && errors.formationInstitution.message}
        />
        <If condition={status !== ''}>
          <Text>{status}</Text>
        </If>
        <Button type="submit">
          Enviar
        </Button>
      </Form>
    </Background>
  )
}

export default Vacancy;