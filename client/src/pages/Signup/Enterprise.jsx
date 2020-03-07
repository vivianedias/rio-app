import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import uuid from 'uuid'

import Flexbox from '../../components/Flexbox'
import Button from '../../comps/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'
import InputText from '../../components/InputText'
import { Error } from '../../components/Status'

import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  identitySegments,
  cnpj_type
} from './dicioFields'
import { formatCheckboxFields } from '../../utils/service'

import { Form, Background, WrapButton, Title } from './styles'

const Enterprise = () => {
  const { register, handleSubmit, errors, setValue } = useForm()

  const registerCompany = useStoreActions(actions => actions.register.registerCompany)
  const registerError = useStoreState(state => state.register.error)
  const [isLoading, setLoader] = useState(false)

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      foundation_date: '12/12/2010', // TODO: Arrumar isso, deixar dinamico
      cnpj_type: data.cnpjType,
      apan_associate: data.apanAssociate,
      identity_segments: formatCheckboxFields(data.identitySegments),
      other_states: formatCheckboxFields(data.otherStates),
      diversity_functions: formatCheckboxFields(data.diversityFunctions),
      business_segments: formatCheckboxFields(data.businessSegments),
      business_fields: formatCheckboxFields(data.businessFields),
      identity_content: data.identityContent,
      type: 'enterprise'
    }
    console.log(formatted)
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
          <Typography variant="h4" component="h2">Formulário de Cadastro da Empresa</Typography>
          <InputText
            name="enterprise_name"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Nome da Empresa"
            placeholder="Insira o nome da empresa"
            error={errors.name && errors.name.message}
          />

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
                message: 'Fale um pouco mais sobre sua empresa'
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

          <InputText
            name="city"
            type="text"
            register={register({
              required: 'Esse campo é obrigatório',
            })}
            label="Cidade"
            placeholder="Insira o nome da sua cidade"
            error={errors.city && errors.city.message}
          />

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
            name="cnpjType"
            error={errors.cnpjType && errors.cnpjType.message}
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

          <Error msg={registerError && registerError.enterprise} />

          <WrapButton>
            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </WrapButton>

        </Form>
      </Flexbox>
    </Background>
  )
}

export default Enterprise