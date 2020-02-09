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

import { Form, Success, Background, Title } from './styles'

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

  const registerUser = useStoreActions(actions => actions.user.registerProfessional)
  const [isLoading, setLoader] = useState(false)

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      birthday: '22/01/1998',
      apan_associate: data.apanAssociate,
      identity_content: data.identityContent,
      identity_segments: formatCheckboxFields(data.identitySegments),
      expertise_areas: formatCheckboxFields(data.expertiseAreas),
      type: 'profissional'
    }
    delete formatted.apanAssociate
    delete formatted.identityContent
    delete formatted.identitySegments
    delete formatted.expertiseAreas
 
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
          <Title>Cadastro</Title>
          <Select
            name="sexual_orientation"
            label="Orientação sexual"
            error={errors.sexual_orientation && errors.sexual_orientation.message}
            firstValue="Orientação Sexual"
            register={register}
          >
            {sexualOrientation.map((item,index) =>
              <option value={item} key={index}>{item}</option>
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
            error={errors.homeState && errors.home_state.message}
            name="home_state"
            firstValue="Estado"
            register={register}
          >
            {states.map(item =>
              <option value={item.name} key={item.id}>{item.name}</option>
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
              <option value={item.name} key={item.id}>{item.name}</option>
            )}
          </Select>

          {/* <Select
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
          </Select> */}

          <InputText
            name="city"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Cidade de Residência"
            placeholder="Insira sua cidade"
            error={errors.city && errors.city.message}
          />

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
            {formations.map((item, index) =>
              <option value={item} key={index}>{item}</option>
            )}
          </Select>

          <InputText
            name="formation_institution"
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
            name="cnpj_type"
            firstValue="Tipo de CPNJ"
            register={register}
          >
            {registryTypes.map((type, index) => (
              <option value={type} key={index}>
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