import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import InputText from "../components/InputText"

const CardVacancy = (props) => {
    return (
        <Container>
            <Card>
                <GroupCard>
                    <Group>
                        <Label>Nome:</Label>
                        <Textarea>{props.name}</Textarea>
                    </Group>
                    <Group>
                        <Label>Email:</Label>
                        <Textarea>{props.email}</Textarea>
                    </Group>
                    <Group>
                        <Label>Telefone:</Label>
                        <Textarea>{props.phone}</Textarea>
                    </Group>
                </GroupCard>
                <Group>
                    <Path>
                        <Link to="#">
                            Visualizar perfil completo
                        </Link>
                    </Path>
                    <InputText
                        name="name"
                        type="text"
                        label="Quantidade de vagas"
                        placeholder="Insira quantidade de vagas"
                    />
                </Group>
                <Button>Aprovar</Button>
            </Card>
        </Container>
    );
};

export default CardVacancy;

export const Container = styled.div`
    border-radius: 8px;
    box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
    border: 1px solid transparent;
    transition: border 300ms ease-in;
    min-width: 22vw;
    min-height: 30vh;

    &:hover {
        border: 1px solid #200112;
    }
`;
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 1vh 1vh;
`;
export const Textarea = styled.p`
    font-size: 16px;  
`;
export const Label = styled.label`
    font-size: 16px;
    margin-right: 1vw;
`;
export const Group = styled.div`
    display: flex;
    margin: 0.4vw 0;
`;
export const Path = styled.p`
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    margin-right: 1vh;
`;
export const GroupCard = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.4vw 0;
`;
export const Button = styled.button`
    font-size: 16px;
    background-color: #3CB371;
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    color: white;
    cursor: pointer;
`