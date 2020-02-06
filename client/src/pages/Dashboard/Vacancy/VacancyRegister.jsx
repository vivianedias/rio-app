import React from "react"
import { useForm } from 'react-hook-form'
import InputText from '../../../components/InputText'
import Radios from '../../../components/Radios'
import Button from '../../../components/Button'

import { Form, Background, Group, Title } from './style'

const Vacancy = () => {
    const {
        register,
        handleSubmit,
        errors,
        getValues,
        setValue
    } = useForm()

    const onSubmit = (data) => {

    }

    const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

    return (
        <Background>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Cadastro de Vaga</Title>
                <InputText
                    name="name"
                    type="text"
                    register={register({
                        required: ''
                    })}
                    label="Nome da Vaga"
                    placeholder="Insira o nome da vaga"
                    error={errors.name && errors.name.message}
                />

                <InputText
                    name="function"
                    type="text"
                    register={register({
                        required: ''
                    })}
                    label="Função"
                    placeholder="Insira a função"
                    error={errors.name && errors.name.message}
                />

                <InputText
                    name="requirements"
                    type="text"
                    register={register({
                        required: ''
                    })}
                    label="Requisitos"
                    placeholder="Insira os requisitos da vaga"
                    error={errors.name && errors.name.message}
                />

                <InputText
                    name="address"
                    type="text"
                    register={register({
                        required: 'Esse campo é obrigatório',
                    })}
                    label="Endereço"
                    placeholder="Insira o endereço"
                    error={errors.address && errors.address.message}
                />

                <Radios
                    label="CNPJ"
                    error={errors.pcd && errors.pcd.message}
                    onChange={e => handleRadio('pcd', e.target.value)}
                    name="cnpj"
                />

                <Group>
                    <InputText
                        name="periodStart"
                        type="text"
                        register={register({
                            required: 'Esse campo é obrigatório',
                        })}
                        label="Data Inicial"
                        placeholder="Insira a data inicial"
                        error={errors.address && errors.address.message}
                    />
                    <InputText
                        name="periodEnd"
                        type="text"
                        register={register({
                            required: 'Esse campo é obrigatório',
                        })}
                        label="Data Final"
                        placeholder="Insira a data final"
                        error={errors.address && errors.address.message}
                    />
                </Group>

                <InputText
                    name="cache"
                    type="text"
                    register={register({
                        required: 'Esse campo é obrigatório',
                    })}
                    label="Cachê"
                    placeholder="Insira o valor do cachê"
                    error={errors.formationInstitution && errors.formationInstitution.message}
                />
                <InputText
                    name="periodTotal"
                    type="text"
                    register={register({
                        required: 'Esse campo é obrigatório',
                    })}
                    label="Periodo total da vaga"
                    placeholder="Periodo total da vaga"
                    error={errors.formationInstitution && errors.formationInstitution.message}
                />
                <Button type="submit">
                    Enviar
                </Button>
            </Form>
        </Background>
    )
}

export default Vacancy;