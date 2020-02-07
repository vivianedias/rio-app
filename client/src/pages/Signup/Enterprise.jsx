import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'

import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'

import cities from '../../assets/cities.json'
import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  identitySegments,
  cnpj_type
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'

import { Form, Background } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm({
    mode: 'onBlur'
  })
  // defaultValues: {
  //   foundation_date: '12/12/2020',
  //   presentation: 'blablabla',
  //   links: 'blablalba',
  //   city: 'blabla',
  //   state: 'blablalba',
  //   cnpj_type: false,
  //   apan_associate: false,
  //   identity_content: true,
  //   identity_segments: ['bla', 'bla'],
  //   other_states: ['bla', 'bla', 'bla'],
  //   diversity_functions: ['bla', 'bla'],
  //   business_segments: ['bla', 'bla'],
  //   business_fields: ['bla', 'bla'],
  // }

  const registerCompany = useStoreActions(actions => actions.user.registerCompany)
  const [isLoading, setLoader] = useState(false)
  
  const onSubmit = (data) => {
    console.log(data)
    const formatted = {
      ...data,
      foundation_date: '12/12/2010', // TODO: Arrumar isso, deixar dinamico
      city: 'blablalba', // TODO: Arrumar isso, deixar o select dinamico
      cnpj_type: data.cnpjType,
      apan_associate: data.apanAssociate,
      identity_segments: formatCheckboxFields(data.identitySegments),
      other_states: formatCheckboxFields(data.otherStates),
      diversity_functions: formatCheckboxFields(data.diversityFunctions),
      business_segments: formatCheckboxFields(data.businessSegments),
      business_fields: formatCheckboxFields(data.businessFields),
      identity_content: data.identityContent,
      type: 'empresa'
    }
    registerCompany(formatted)
  }

  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <Background>
      <Flexbox justify="center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            label="Links para site e redes socias da empresa"
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

          <Textarea
            label="Apresentação da Empresa"
            placeholder="Faça uma apresentação da empresa"
            rows={5}
            error={errors.presentation && errors.presentation.message}
            name="presentation"
            register={register({
              required: 'Esse campo é obrigatório',
              minLength: {
                value: 10,
                message: 'Nos fale um pouco mais sobre sua empresa'
              }
            })}
          />

          <Select
            label="Estado"
            error={errors.state && errors.state.message}
            name="state"
            firstValue="Estado Sede"
            register={register}
            onChange={programIsLoading}
            isLoading={isLoading}
          >
            {states.map(item =>
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </Select>

          <Select
            label="Cidade"
            error={errors.city && errors.city.message}
            name="city"
            firstValue="Cidade"
            register={register}
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
            name="businessSegments"
          />
          <Checkboxes
            label="Campos de atuação"
            register={register}
            fields={actions}
            name="businessFields"
          />
          <Checkboxes
            label="Funções que busca diversificar na empresa"
            register={register}
            fields={functions}
            name="diversityFunctions"
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
            name="identitySegments"
            register={register}
          />

          <Radios
            label="A empresa é associado(a) da APAN?"
            name="apanAssociate"
            error={errors.apanAssociate && errors.apanAssociate.message}
            onChange={e => handleRadio('apanAssociate', e.target.value)}
          />

          <Button type="submit">
            Enviar
          </Button>
        </Form>
      </Flexbox>
    </Background>
  )
}

export default Enterprise