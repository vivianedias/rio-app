import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'

import InputText from '../../components/InputText'
import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'

import cities from '../../assets/cities.json'
import states from '../../assets/states.json'
import {
  functions,
  registryTypes,
  formations,
  identitySegments,
  sexualOrientation
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'

import { Form, Success, Background } from './styles'

const Professionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue
  } = useForm({
    mode: 'onBlur'
  })
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
  const [isLoading, setLoader] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
    const formatted = {
      ...data,
      birthday: '22/01/1998',
      city: 'blabla',
      home_state: data.homeState,
      cnpj_type: data.cnpjType,
      identity_content: data.identityContent,
      identity_segments: formatCheckboxFields(data.identitySegments),
      expertise_areas: formatCheckboxFields(data.expertiseAreas),
      apan_associate: data.apanAssociate,
      formation_institution: data.formationInstitution,
      sexual_orientation: data.sexualOrientation,
      type: 'profissional'
    }
    registerUser(formatted)
  }

  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000)
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'pcd' });
    register({ name: 'cnpj' });
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.

  return (
    <Background>
      <Flexbox justify="center">
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Select
            name="sexualOrientation"
            label="Orientação sexual"
            error={errors.sexualOrientation && errors.sexualOrientation.message}
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
            error={errors.state && errors.state.message}
            name="state"
            firstValue="Estado"
            register={register}
            onChange={programIsLoading}
          >
            {states.map(item =>
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </Select>

          <Select
            label="Cidade de Residência"
            error={errors.city && errors.city.message}
            name="city"
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
            name="identitySegments"
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

          <Button type="submit">
            Enviar
          </Button>
        </Form>
      </Flexbox>
    </Background>
  )
}

export default Professionals