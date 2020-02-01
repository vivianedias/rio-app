import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'
import styled from 'styled-components'

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
  color as selfDeclaration,
  gender,
  registryTypes,
  formations,
  identitySegments,
  sexualOrientation
} from './dicioFields'

import { Form } from './styles'

const Wrapper = styled.div`
background-image: linear-gradient(220deg,#6f0000 0%,#200112 100%); `

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue
  } = useForm({})

  const registerCandidate = useStoreActions(actions => actions.candidate.registerCandidate)

  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log(data)
    registerCandidate(data)
  }

  const [isLoading, setLoader] = useState(false)
  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'pcd' }, { required: true });
    register({ name: 'companyRegistry' }, { required: true });
    register({ name: 'identityContent' }, { required: true });
    register({ name: 'apan' }, { required: true });
  }, []);

  console.log(getValues().companyRegistry)

  return (
    <Wrapper>
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
              required: 'Esse campo é obrigatório',
              minLength: {
                value: 6,
                message: 'A senha precisa ter no mínimo 6 caracteres'
              }
            })}
            label="Senha"
            placeholder="Insira uma senha"
            error={errors.password && errors.password.message}
          />

          <InputText
            name="confirmPassword"
            type="password"
            register={register({
              required: 'Esse campo é obrigatório',
              validate: value => value === getValues().password || 'As senhas não são identicas'
            })}
            label="Confirme sua senha"
            placeholder="Insira sua senha novamente"
            error={errors.confirmPassword && errors.confirmPassword.message}
          />

          <InputText
            name="name"
            type="text"
            register={register({
              required: ''
            })}
            label="Nome social"
            placeholder="Insira seu nome"
            error={errors.name && errors.name.message}
          />

          <Select
            label="Auto Declaração"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            name="selfDeclaration"
            error={errors.selfDeclaration && errors.selfDeclaration.message}
            firstValue="Auto Declaração"
          >
            {selfDeclaration.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Select
            label="Gênero"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            name="gender"
            error={errors.gender && errors.gender.message}
            firstValue="Gênero"
          >
            {gender.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Select
            label="Orientação sexual"
            error={errors.sexualOrientation && errors.sexualOrientation.message}
            name="sexualOrientation"
            firstValue="Orientação Sexual"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
          >
            {sexualOrientation.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

          <Radios
            label="PcD (Pessoa com deficiência)"
            error={errors.pcd && errors.pcd.message}
            onChange={e => handleRadio('pcd', e.target.value)}
            name="pcd"
          />

          <Select
            label="Estado de origem"
            error={errors.homeState && errors.homeState.message}
            name="homeState"
            firstValue="Estado"
            register={register({
              required: 'Esse campo é obrigatório',
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
              required: 'Esse campo é obrigatório',
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
                required: 'Esse campo é obrigatório',
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
            placeholder="Insira seu telefone"
            error={errors.phone && errors.phone.message}
          />

          <Select
            label="Formação"
            error={errors.education && errors.education.message}
            name="education"
            firstValue="Formação"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
          >
            {formations.map(item =>
              <option value={item} key={uuid()}>{item}</option>
            )}
          </Select>

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
            onChange={e => handleRadio('companyRegistry', e.target.value)}
            error={errors.companyRegistry && errors.companyRegistry.message}
            name="companyRegistry"
          />

          <Select
            label="Se sim, qual o tipo do seu CNPJ ?"
            error={errors.companyRegistryType && errors.companyRegistryType.message}
            name="companyRegistryType"
            firstValue="Tipo de CPNJ"
            register={register}
          >
            {registryTypes.map(type => (
              <option value={type} key={uuid()}>
                {type}
              </option>
            ))}
          </Select>

          <Radios
            label="Sua empresa é vocacionada para conteúdo identitário?"
            onChange={e => handleRadio('identityContent', e.target.value)}
            error={errors.identityContent && errors.identityContent.message}
            name="identityContent"
          />

          <Checkboxes
            label="Se sim, em qual segmento?"
            register={register}
            fields={identitySegments}
            name="companyIdentitySegments"
          />

          <Checkboxes
            label="Áreas de atuação"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            fields={functions}
            name="expertiseAreas"
          />

          <Radios
            label="É associado(a) da APAN"
            error={errors.apan && errors.apan.message}
            onChange={e => handleRadio('apan', e.target.value)}
            name="apan"
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
    </Wrapper>
  )
}

export default Professionals