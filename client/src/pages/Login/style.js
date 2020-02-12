import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const FullWidth = styled.div`
  width: 100%;
  padding: 40px;
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`

export const Wrapper = styled.div`
  height: calc(100vh - 200px);
  background-color: #fff;
`

export const Title = styled.h1`
  color:#000;
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

export const StyledLink = styled(Link)`
  color: #000;
  &:hover {
    color: #fc9b44;
  }
`;