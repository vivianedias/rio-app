import React from 'react'
import { useForm } from 'react-hook-form'

import { emailValidation } from '../../utils/service'
import InputText from '../../components/InputText'

const Professionals = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          type="text"
          register={register({
            required: 'Esse campo é obrigatório',
            pattern: {
              value: emailValidation(),
              message: 'Insira um endereço de e-mail válido'
            }
          })}
          placeholder="Endereço de e-mail"
          name="email"
        />
      </form>
    </div>
  )
}

export default Professionals