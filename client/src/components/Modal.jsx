import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ModalStyled = styled.div`
  display: ${props => !props.isOpen ? 'none' : 'block'}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContentStyled = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  background-image: linear-gradient(77deg,rgba(111,0,0,0) 20%,#200122 100%);
  background-color: #6f0000;
  border: none;
  width: 500px;
    @media(max-width: 425px) {
      width: 100%;
    }
`

const CloseButtonStyled = styled.div`
  color: #fc9b44;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #FFFF;
    text-decoration: none;
    cursor: pointer;
  }
`


const Modal = ({ children, isOpen, onClose, width }) => (
  <ModalStyled isOpen={isOpen}>
    <ModalContentStyled>
      <CloseButtonStyled onClick={onClose}>&times;</CloseButtonStyled>
      {children}
    </ModalContentStyled>
  </ModalStyled>
)

Modal.propTypes = {
  /** Flag used to control modal open and close */
  isOpen: PropTypes.bool,
  /** Width of modal content in percent (%) */
  width: PropTypes.string,
  /** Function used when closing modal */
  onClose: PropTypes.func.isRequired
}

Modal.defaultProps = {
  opened: false,
  width: 30
}

/** @component */
export default Modal