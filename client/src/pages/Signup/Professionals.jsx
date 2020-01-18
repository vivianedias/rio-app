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

import { Form } from './styles'

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      name: "Viviane",
      email: "vivi@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      birthday:"12/1/1995",
      gender: "bla",
      pcd: true,
      homeState: "bla",
      currentState:"bla",
      currentCity: "bla",
      selfDeclaration: "bla",
      address: "blabla",
      education: "blabla",
      formationInstitution: "bla",
      cnpj: true,
      cnpjType: "bla",
      identityContent: true,
      identitySegments: "",
      expertiseAreas: "bla",
      apanAssociate: true,
      phone: "13123123",
      sexualOrientation: "bla",
      bio: "blasdjasjkdaskdbaskd",
      links: "blablablablabldajsdnkasjdnsaja"
    }
  })

  const registerUser = useStoreActions(actions => actions.user.registerProfessional)
  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log(data)
    registerUser({data})
  }

  const hasRegistry = watch('companyRegistry')
  const identityYes = watch('identityContent')

  const [isLoading, setLoader] = useState(false)
  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000);
  }

  useEffect(() => {
    register({ name: 'birthday' });
  }, [register])

  const handleBirthday = selectedOption => setValue('birthday', selectedOption);

  return (
    <Flexbox justify="center">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          name="email"
          type="text"
          register={register({
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
            validate: value => value === getValues().password || 'As senhas não são identicas'
          })}
          label="Confirme sua senha"
          placeholder="Insira sua senha novamente"
          error={errors.confirmPassword && errors.confirmPassword.message}
        />

        <InputText
          name="name"
          type="text"
          register={register}
          label="Nome social"
          placeholder="Insira seu nome"
          error={errors.name && errors.name.message}
        />

        <Radios
          label="Auto Declaração"
          register={register}
          name="selfDeclaration"
          fields={selfDeclaration}
          error={errors.selfDeclaration && errors.selfDeclaration.message}
        />

        <Radios
          label="Gênero"
          register={register}
          name="gender"
          fields={gender}
          error={errors.gender && errors.gender.message}
        />

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
          register={register}
          name="pcd"
          fields={["Sim", "Não"]}
          error={errors.pcd && errors.pcd.message}
        />

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
          register={register}
          label="Endereço"
          placeholder="Insira seu endereço atual"
          error={errors.address && errors.address.message}
        />

        <InputText
          name="phone"
          type="text"
          register={register({
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
          register={register}
          label="Qual foi a instituição ou processo de formação? "
          placeholder="Insira sua instituição de formação"
          error={errors.formationInstitution && errors.formationInstitution.message}
        />

        <Radios
          label="Possui CNPJ"
          register={register}
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
            register={register}
          >
            {registryTypes.map(type => (
              <option value={type} key={uuid()}>
                {type}
              </option>
            ))}
          </Select>
        </If>

        <If condition={hasRegistry === true}>
          <Radios
            label="Sua empresa é vocacionada para conteúdo identitário?"
            register={register({
            })}
            name="identityContent"
            fields={["Sim", "Não"]}
            error={errors.identityContent && errors.identityContent.message}
          />
        </If>

        <If condition={identityYes === true}>
          <Checkboxes
            label="Se sim, em qual segmento?"
            register={register}
            fields={identitySegments}
            name="companyIdentitySegments"
          />
        </If>

        <Checkboxes
          label="Áreas de atuação"
          register={register}
          fields={functions}
          name="expertiseAreas"
        />

        <Radios
          label="É associado(a) da APAN"
          register={register}
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