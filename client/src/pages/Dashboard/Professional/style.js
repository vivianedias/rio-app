import styled from 'styled-components';

export const Form = styled.form`
  width: 50%;
  padding: 20px;
`
export const Background = styled.div`
  display: flex;
  height: inherit;
  flex-direction: column;
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
  flex-wrap: wrap;
  width: 80%;
  margin: 1vh 0;
`
export const Title = styled.h1`
  font-size: 22px;
  color: #FFFFFF;
  margin: 2vh 0;
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
    box-sizing: border-box;
    width: 95%;
    display: block;
    margin: 10px 15vh;
    min-height: 70vh;
`;
export const GroupButton = styled.div`
  display: flex;
  width: 80%;
  margin: 1vh 0;
  justify-content: flex-end;
`


