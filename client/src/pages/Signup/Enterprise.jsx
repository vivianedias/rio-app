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
  identitySegments
} from './dicioFields'

import { Form } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, getValues, watch } = useForm({
    defaultValues: {
      companyLinks: 'blablablablablablablablablablablabla',
      companyPresentation: 'blablablablablablablablablablablabla',
      email: 'test@test.com',
      tel: 12988801105,
      responsibleName: 'blablabla',
      city: 'blablabla',
      companyName: 'blebli'
    },
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
        <Select
          label="Estado"
          error={errors.state && errors.state.message}
          name="state"
          firstValue="Estado"
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
            name="city"
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
          name="otherStates"
        />
        <Checkboxes
          label="Segmento de atuação"
          register={register}
          fields={segment}
          name="segment"
        />
        <Checkboxes
          label="Campos de atuação"
          register={register}
          fields={actions}
          name="actionFields"
        />
        <Checkboxes
          label="Funções que busca diversificar na empresa :"
          register={register}
          fields={functions}
          name="companyFunctions"
        />
        <Radios
          label="Auto Declaração (pessoa responsável pelo cadastro)"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="color"
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
            name="companyIdentitySegments"
          />
        </If>
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
          error={errors.tel && errors.tel.message}
        />
        <InputText
          name="responsibleName"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Nome da pessoa responsável pelo cadastro"
          placeholder="Insira o nome da pessoa responsável"
          error={errors.responsibleName && errors.responsibleName.message}
        />
        <InputText
          name="city"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Cidade sede"
          placeholder="Insira a cidade sede"
          error={errors.city && errors.city.message}
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