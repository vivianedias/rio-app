import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: 95%;
  display: block;
  margin: 10px auto;
`;
export const Title = styled.h1`
  font-size: 22px;
  color: #FFFFFF;
  margin: 2vh 0;
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
`;
export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(220deg,#6f0000 0%,#200112 100%);
  height: inherit;
`

export const Form = styled.form`
  width: 50%;
  padding: 20px;
`