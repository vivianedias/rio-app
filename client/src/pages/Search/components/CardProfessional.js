import React from "react";
import styled from "styled-components";

const CardProfessional = (props) => {
  return (
    <Container>
      <Card>
        {/* <Group>
          <Label>Nome:</Label>
          <Textarea>{props.name}</Textarea>
        </Group> */}
        <Group>
          <Label>Estado:</Label>
          <Textarea>{props.state}</Textarea>
        </Group>
        <Group>
          <Label>Cnpj:</Label>
          <Textarea>{props.cnpj}</Textarea>
        </Group>
        <Group>
          <Label>Orientação sexual:</Label>
          <Textarea>{props.self_declaration}</Textarea>
        </Group>
        <Group>
          <Label>Áreas de atuação:</Label>
          <Textarea>{props.expertise_areas}</Textarea>
        </Group>
        <Group>
          <Label>Pcd:</Label>
          <Textarea>{props.pcd}</Textarea>
        </Group>
        <Group>
          <Label>Bio:</Label>
          <Textarea>{props.bio}</Textarea>
        </Group>
      </Card>
    </Container>
  );
};

export default CardProfessional;

export const Container = styled.div`
    border-radius: 8px;
    box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
    border: 1px solid transparent;
    transition: border 300ms ease-in;
    min-width: 100%;
    min-height: 100%;
    margin-top: 2vh;

    &:hover {
        border: 1px solid #fc9b44;
    }
`;
export const Card = styled.div`
    padding: 20px;

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