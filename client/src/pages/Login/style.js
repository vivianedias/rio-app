import styled from 'styled-components';

export const FullWidth = styled.div`
  width: 100%;
  padding: 40px;
`

export const Form = styled.form`
  background-color: pink;
  width: 100%;
  padding: 20px;
  @media(min-width: 576px) {
    width: unset;
  }
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`