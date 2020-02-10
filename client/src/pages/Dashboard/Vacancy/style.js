import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  display: flex;
  margin: 10px auto;
  flex-direction: column;
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90vh;
  background-image: linear-gradient(220deg,#6f0000 0%,#200112 100%);
`

export const Title = styled.h1`
  font-size: 22px;
  color: #FFFFFF;
  margin: 2vh 0;
  font-weight: 600;
`
export const Label = styled.p`
  font-size: 17px;
`
export const Group = styled.div`
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  margin: 0.4vw 0;
  justify-content: space-between;
`;
export const Textarea = styled.p`
  font-size: 17px;  
  margin-left: 0.5vw;
  color: #fff;
`;

export const Form = styled.form`
  width: 50%;
  padding: 20px;
`