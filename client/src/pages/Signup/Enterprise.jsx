import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'

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

import { Form, Success, Background } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()
    // defaultValues: {
    //   name: 'Viviane',
    //   gender:'bla',
    //   email: 'bla@gmail.com',
    //   selfDeclaration: 'bla',
    //   companyName:'bla',
    //   foundationDate:'bla',
    //   companyPresentation:'bla',
    //   companySocialMidia:'bla',
    //   diversifyFunctions:'bla',
    //   identityContent: false,
    //   companyRegistryType:'bla',
    //   identityContentSegment:'bla',
    //   businessSegment:'bla',
    //   businessField: 'bla',
    //   otherStates:'bla',
    //   city: 'bla',
    //   state: 'bla',
    //   apanAssociate: true,
    //   fieldsWork: 'bla',
    //   phone: 'bla',
    //   password:'bla'
    // }
  // })

  const registerUser = useStoreActions(actions => actions.user.registerCompany)
  const [isSuccessful, setSuccess] = useState(false)
  const [isLoading, setLoader] = useState({
    city: false,
    submit: false
  })

  const onSubmit = (data) => {
    setLoader({ ...isLoading, submit: true })
    console.log(data)
    setSuccess(true)
    setLoader({ ...isLoading, submit: false })
    registerUser(data)
  }

  const programIsLoading = () => {
    setLoader({ ...isLoading, city: true })
    setTimeout(() => { setLoader({...isLoading, city: false }) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

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
              name="name"
              type="text"
              register={register({
                required: 'Esse campo é obrigatório',
              })}
              label="Nome da pessoa responsável pelo cadastro"
              placeholder="Insira o nome da pessoa responsável"
              error={errors.responsibleName && errors.responsibleName.message}
            />


          <Textarea
            label="Links para site e redes socias da empresa"
            placeholder="Insira aqui links"
            rows={5}
            error={errors.companySocialMidia && errors.companySocialMidia.message}
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
            error={errors.phone && errors.phone.message}
          />

          <InputText
            name="name"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Nome da pessoa responsável pelo cadastro"
            placeholder="Insira o nome da pessoa responsável"
            error={errors.name && errors.name.message}
          />
          <Select
            label="Auto Declaração (pessoa responsável pelo cadastro)"
            register={register}
            firstValue="Auto Declaração"
            name="selfDeclaration"
            error={errors.selfDeclaration && errors.selfDeclaration.message}
          >
            {color.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Select
            label="Gênero (pessoa responsável pelo cadastro)"
            error={errors.gender && errors.gender.message}
            name="gender"
            firstValue="Gênero"
            register={register}
          >
            {gender.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Select
            label="Estado"
            error={errors.state && errors.state.message}
            name="state"
            firstValue="Estado Sede"
            register={register}
            onChange={programIsLoading}
          >
            {states.map(item =>
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </Select>
          <If condition={typeof getValues().state !== 'undefined'}>
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
            name="businessSegment"
          />
          <Checkboxes
            label="Campos de atuação"
            register={register}
            fields={actions}
            name="businessField"
          />
          <Checkboxes
            label="Funções que busca diversificar na empresa"
            register={register}
            fields={functions}
            name="diversifyFunctions"
          />

          <Select
            label="Qual o tipo do seu CNPJ?"
            register={register}
            firstValue="Tipo de CNPJ"
            fields={cnpj_type}
            name="companyRegistry"
            error={errors.companyRegistry && errors.companyRegistry.message}
          >
            {cnpj_type.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Radios
            label="Sua empresa é vocacionada para conteúdo identitário?"
            name="identityContent"
            error={errors.identityContent && errors.identityContent.message}
            onChange={e => handleRadio('identityContent', e.target.value)}
          />

          <Checkboxes
            label="Se sim, em qual segmento?"
            fields={identitySegments}
            name="identityContentSegment"
            register={register}
          />

          <Radios
            label="A empresa é associado(a) da APAN?"
            name="apanAssociate"
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
          />

          <Button
            type="submit"
            isLoading={isLoading.submit}
          >
            Enviar
          </Button>
          <If condition={isSuccessful}>
            <Success>Seu cadastro foi realizado com sucesso!</Success>
          </If>
        </Form>
      </Flexbox>
    </Background>
  )
}

export default Enterprise