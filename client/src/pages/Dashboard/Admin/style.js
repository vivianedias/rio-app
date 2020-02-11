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
    color:#fc9b44;
    margin: 2vw 0;
`;
export const Group = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(220deg,#6f0000 0%,#200112 100%);
  height: 40rem;
  justify-content: center;
`
export const WrapperChoices = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-between;
    `



/* STYLES ALLENTERPRISE */

export const WrapperSearchEnterprise = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const StyledButtonSearch = styled.button`
    padding: 10px;
    background-color: #6f0000;
    color: #fc9b44;
    `