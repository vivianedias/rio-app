import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { If } from '../../components/If'
import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'

import { emailValidation } from '../../utils/service'
import cities from '../../assets/cities.json'
import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  color,
  gender,
  identitySegments,
  cnpj_type
} from './dicioFields'

import { Form } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, getValues, watch } = useForm({

  })

  const identityYes = watch('identityContent');
  const hasState = watch('state')
  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log(data)
  }
  const [isLoading, setLoader] = useState(false)
  console.log({ errors, values: getValues() })
  console.log(hasState)

  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000);
  }

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
          error={errors.email && errors.email.message}
        />

        <InputText
          name="companyName"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Nome da empresa"
          placeholder="Insira o nome da empresa"
          error={errors.companyName && errors.companyName.message}
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
          name="companySocialMidia"
          register={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 10,
              message: 'Insira pelo menos um link'
            }
          })}
        />

        <InputText
          name="phone"
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
          placeholder="Insira aqui"
          error={errors.tel && errors.tel.message}
        />

        <InputText
          name="name"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Nome da pessoa responsável pelo cadastro"
          placeholder="Insira o nome da pessoa responsável"
          error={errors.responsibleName && errors.responsibleName.message}
        />
        <Radios
          label="Auto Declaração (pessoa responsável pelo cadastro)"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="selfDeclaration"
          fields={color}
          error={errors.color && errors.color.message}
        />

        <Radios
          label="Gênero (pessoa responsável pelo cadastro)"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="gender"
          fields={gender}
          error={errors.gender && errors.gender.message}
        />

        <Select
          label="Estado"
          error={errors.state && errors.state.message}
          name="headOfficeState"
          firstValue="Estado Sede"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          onChange={programIsLoading}
          isLoading={false}
        >
          {states.map(item =>
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </Select>
        <If condition={typeof hasState !== 'undefined'}>
          <Select
            label="Cidade"
            error={errors.city && errors.city.message}
            name="headOfficeCity"
            firstValue="Cidade"
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            isLoading={isLoading}
          >
            {cities
              .filter(city => city['state_id'].toString() === getValues().state)
              .map(filteredCities => (
                <option
                  value={filteredCities.name}
                  key={filteredCities.id}
                >
                  {filteredCities.name}
                </option>
              ))
            }
          </Select>
        </If>
        <Checkboxes
          label="Outros estados que a empresa tem atuação"
          register={register}
          fields={states}
          name="otherStatesOperation"
        />
        <Checkboxes
          label="Segmento de atuação"
          register={register}
          fields={segment}
          name="businessSegment"
        />
        <Checkboxes
          label="Campos de atuação"
          register={register}
          fields={actions}
          name="businessField"
        />
        <Checkboxes
          label="Funções que busca diversificar na empresa :"
          register={register}
          fields={functions}
          name="diversifyFunctions"
        />

        <Checkboxes
          label="Qual o tipo do seu CNPJ ?"
          register={register}
          fields={cnpj_type}
          name="cnpjType"
        />

        <Radios
          label="Sua empresa é vocacionada para conteúdo identitário?"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="identityContent"
          fields={["Sim", "Não"]}
          error={errors.identityContent && errors.identityContent.message}
        />
        <If condition={identityYes === 'sim'}>
          <Checkboxes
            label="Se sim, em qual segmento?"
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            fields={identitySegments}
            name="identityContentSegment"
          />
        </If>


        <Radios
          label="A empresa é associado(a) da APAN?"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="apanAssociate"
          fields={["Sim", "Não"]}
          error={errors.identityContent && errors.identityContent.message}
        />


        <Button type="submit">Enviar</Button>
      </Form>
    </Flexbox>
  )
}

export default Enterprise