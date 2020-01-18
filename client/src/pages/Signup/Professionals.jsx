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
  functions,
  color,
  gender,
  registryTypes,
  formations,
  identitySegments
} from './dicioFields'

import { Form } from './styles'
import uuid from 'uuid'

const Professionals = () => {
  const { register, handleSubmit, errors, getValues, watch } = useForm({})

  const hasRegistry = watch('companyRegistry');
  const identityYes = watch('identityContent');

  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log(data)
  }
  const [isLoading, setLoader] = useState(false)
  console.log({ errors, values: getValues() })

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
          name="name"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Nome social"
          placeholder="Insira seu nome"
          error={errors.name && errors.name.message}
        />


        <Radios
          label="Auto Declaração"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="selfDeclaration"
          fields={selfDeclaration}
          error={errors.selfDeclaration && errors.selfDeclaration.message}
        />

        <Radios
          label="Gênero"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="gender"
          fields={gender}
          error={errors.gender && errors.gender.message}
        />


        <Radios
          label="Orientação sexual"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="sexualOrientation"
          fields={sexualOrientation}
          error={errors.sexualOrientation && errors.sexualOrientation.message}
        />

        <Radios
          label="PcD (Pessoa com deficiência)"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="pcd"
          fields={["Sim", "Não"]}
          error={errors.pcd && errors.pcd.message}
        />


        <Select
          label="Estado de origem"
          error={errors.originState && errors.originState.message}
          name="originState"
          firstValue="Estado"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
        >
          {states.map(item =>
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </Select>


        <Select
          label="Estado de residência"
          error={errors.currentState && errors.currentState.message}
          name="currentState"
          firstValue="Estado"
          register={register({
            required: 'Esse campo é obrigatório'
          })}
          onChange={programIsLoading}
        >
          {states.map(item =>
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </Select>



        <If condition={typeof getValues().currentState !== 'undefined'}>
          <Select
            label="Cidade de Residência"
            error={errors.currentCity && errors.currentCity.message}
            name="currentCity"
            firstValue="Cidade"
            register={register({
              required: 'Esse campo é obrigatório'
            })}
            isLoading={isLoading}
          >
            {cities
              .filter(city => city['state_id'].toString() === getValues().currentState)
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


        <InputText
          name="address"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Endereço"
          placeholder="Insira seu endereço atual"
          error={errors.address && errors.address.message}
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
          placeholder="Insira seu telefone"
          error={errors.tel && errors.tel.message}
        />


        <InputText
          name="formationInstitution"
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          label="Qual foi a instituição ou processo de formação? "
          placeholder="Insira sua instituição de formação"
          error={errors.formationInstitution && errors.formationInstitution.message}
        />


        <Radios
          label="Possui CNPJ"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="companyRegistry"
          fields={["Sim", "Não"]}
          error={errors.companyRegistry && errors.companyRegistry.message}
        />

        <If condition={hasRegistry === 'sim'}>
          <Select
            label="Qual o tipo do seu CNPJ ?"
            error={errors.companyRegistryType && errors.companyRegistryType.message}
            name="companyRegistryType"
            firstValue="Tipo de CPNJ"
            register={register({
              required: 'Esse campo é obrigatório'
            })}
          >
            {registryTypes.map(type => (
              <option value={type} key={uuid()}>
                {type}
              </option>
            ))}
          </Select>
        </If>

        <If condition={hasRegistry === 'sim'}>
          <Radios
            label="Sua empresa é vocacionada para conteúdo identitário?"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            name="identityContent"
            fields={["Sim", "Não"]}
            error={errors.identityContent && errors.identityContent.message}
          />
        </If>
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
        <Checkboxes
          label="Áreas de atuação"
          register={register}
          fields={functions}
        />
        <Radios
          label="É associado(a) da APAN"
          register={register({
            required: 'Esse campo é obrigatório',
          })}
          name="apan"
          fields={["Sim", "Não"]}
          error={errors.apan && errors.apan.message}
        />
        <Textarea
          label="Mini Bio"
          placeholder="Insira uma apresentação sua"
          rows={5}
          error={errors.bio && errors.bio.message}
          name="bio"
          register={register({
            required: 'Esse campo é obrigatório',
            minLength: {
              value: 15,
              message: 'Apresentação curta demais'
            }
          })}
        />
        <Textarea
          label="Links para IMDB, currículo, portfólio, reel e outros"
          placeholder="Insira aqui links"
          rows={5}
          error={errors.links && errors.links.message}
          name="links"
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

export default Professionals