import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FullWidth = styled.div`
  width: 100%;
  padding: 40px;
`

export const Form = styled.form`
   background-image: linear-gradient(#200122, #6F0000);
  width: 100%;
  padding: 20px;
  @media(min-width: 576px) {
    width: unset;
  }
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`

export const WrapperScreen = styled.div`
  background-image: linear-gradient(#200122, #6F0000);
`

export const StyledButton = styled.button`
  background-color: #A03C25;
  color: #fc9b44;
  border-radius: 290486px;
  padding-left: calc(1em + .25em);
  padding-right: calc(1em + .25em);
  min-width: 120px;
  &:hover{
    background-color: #6f0000;
     
  }
`
export const Title = styled.h1`
    color: #A03C25;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.125;
`


export const StyledLink = styled(Link)`
  color: #A03C25;
  &:hover{
    color: #FFFF;
  }
`;