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
  functions,
  color as selfDeclaration,
  gender,
  registryTypes,
  formations,
  identitySegments,
  sexualOrientation
} from './dicioFields'

import { Form, Success, Background } from './styles'

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue
  } = useForm()
    // defaultValues: {
      // name: "Viviane"
      // email: "vivi@gmail.com",
      // password: "123456",
      // confirmPassword: "123456",
      // birthday:"12/1/1995",
      // gender: "bla",
      // pcd: true,
      // homeState: "bla",
      // currentState:"bla",
      // currentCity: "bla",
      // selfDeclaration: "bla",
      // address: "blabla",
      // education: "blabla",
      // formationInstitution: "bla",
      // cnpj: true,
      // cnpjType: "bla",
      // identityContent: true,
      // identitySegments: "",
      // expertiseAreas: "bla",
      // apanAssociate: true,
      // phone: "13123123",
      // sexualOrientation: "bla",
      // bio: "blasdjasjkdaskdbaskd",
      // links: "blablablablabldajsdnkasjdnsaja"
    // }
  // })

  const registerUser = useStoreActions(actions => actions.user.registerProfessional)
  const [isSuccessful, setSuccess] = useState(false)
  const [isLoading, setLoader] = useState({
    city: false,
    submit: false
  })
  const onSubmit = async (data) => {
    setLoader({ ...isLoading, submit: true })
    console.log(data)
    // const res = registerUser(data)
    // console.log(res)
    // if (res.status === 200) {
    //   setSuccess(true)
    //   setLoader({ ...isLoading, submit: false })
    // }
  }

  const programIsLoading = () => {
    setLoader({ ...isLoading, city: true })
    setTimeout(() => { setLoader({...isLoading, city: false }) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'pcd' });
    register({ name: 'cnpj' });
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
            register={register}
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
            register={register}
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
            register={register}
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

          {/* <Datepicker /> */}

          <Select
            label="Estado de origem"
            error={errors.homeState && errors.homeState.message}
            name="homeState"
            firstValue="Estado"
            register={register}
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
            register={register}
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
              register={register}
              isLoading={isLoading.city}
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
            register={register}
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
            onChange={e => handleRadio('cnpj', e.target.value)}
            error={errors.cnpj && errors.cnpj.message}
            name="cnpj"
          />

          <Select
            label="Se sim, qual o tipo do seu CNPJ ?"
            error={errors.cnpjType && errors.cnpjType.message}
            name="cnpjType"
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
            register={register}
            fields={functions}
            name="expertiseAreas"
          />

          <Radios
            label="É associado(a) da APAN"
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
            name="apanAssociate"
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

export default Professionals