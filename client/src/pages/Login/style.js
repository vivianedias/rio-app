import styled from 'styled-components';
import { Link } from 'react-router-dom'

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
  height: 40rem;
`

export const StyledFont = styled.h1`
  color:#fc9b44;
  font-size: 40px;
`

export const StyledButton = styled.button(props => ({
  background: props.background,
  lineHeight: '1.5',
  paddingBottom: 'calc(.5em - 1px)',
  paddingLeft: 'calc(.75em - 1px)',
  paddingRight: 'calc(.75em - 1px)',
  paddingTop: 'calc(.5em - 1px)',
  borderRadius: '4px',
  fontSize: '1rem',
  marginBottom: '.5rem',
  marginRight: '10px',
  color: props.color
}));

export const Styledlink = styled(Link)`
  color:#fc9b44
`;