import styled from 'styled-components';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(220deg,#6f0000 0%,#200112 100%);
`

export const Button = styled.button`
  font-size: 16px;
  background-color: #FF4500;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`

export const Group = styled.div`
  display: flex;
  width: 80%;
  margin: 1vh 0;
`

export const Title = styled.h1`
  font-size: 22px;
  color: #FFFFFF;
  align-self: center;
`

export const Textarea = styled.p`
  font-size: 16px; 
  color: #FFFFFF; 
`;

export const Label = styled.label`
  font-size: 16px;
  margin-right: 1vw;
  color: #FFFFFF;
`;

export const Container = styled.div`
  &.ad {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 150px;
  }
`

export const GroupButton = styled.div`
  display: flex;
  width: 80%;
  margin: 1vh 0;
  justify-content: flex-end;
`
export const ButtonDelete = styled.button`
  font-size: 16px;
  background-color: #FF4500;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
  margin-left: 2vh;
`

export const GroupButtons = styled.div`
  display: flex;
  width: 80%;
  margin: 1vh 0;
  justify-content: flex-end;
`