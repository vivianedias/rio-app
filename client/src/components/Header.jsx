import React, {
  useState,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import jwtDecode from 'jwt-decode'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Modal from '../components/Modal'
import SignupPopup from '../components/popups/Signup'
import Button from '../components/Button'
import { IfElse } from '../components/If'

import setAuthToken from '../utils/setAuthToken'
import { isEmpty, getUserType } from '../utils/service'

const Wrapper = styled.nav`
  background-color: #200122;
  padding: 5px;
`

const StyledLogo = styled.img`
  margin-left: 30px;
`

const StyledButton = styled.button(props => ({
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
  color: props.color,
  border: 'none',
}));

const StyledNavlink = styled(NavLink)(props => ({
  background: 'linear-gradient(101deg,#6f0000 0%,rgb(65, 1, 20) 80%)',
  lineHeight: '1.5',
  paddingBottom: 'calc(.5em - 1px)',
  paddingLeft: 'calc(.75em - 1px)',
  paddingRight: 'calc(.75em - 1px)',
  paddingTop: 'calc(.5em - 1px)',
  borderRadius: '4px',
  fontSize: '1rem',
  marginBottom: '.5rem',
  marginRight: '10px',
  color: "#FC9B55",
  border: 'none'
}));



const Header = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const setAuth = useStoreActions(actions => actions.auth.setAuth)
  const logoutUser = useStoreActions(actions => actions.auth.logoutUser)
  const auth = useStoreState(state => state.auth.auth)

  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set the auth token header auth
      setAuthToken(localStorage.jwtToken)

      // Decode token and get user info and exp
      const decoded = jwtDecode(localStorage.jwtToken)

      // Set user and auth
      setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded
      })

      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // Logout user
        // Clear current profile
        // Redirect to login
        logoutUser()
      }
    }
  }, [setAuth, logoutUser])

  const type = getUserType(auth && auth.user.type)

  return (
    <Wrapper
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="https://raio.agency/">
          <StyledLogo
            src="https://raio.agency/wp-content/uploads/2020/01/RAIO_logo.png"
            width="274.141"
            height="93.594"
            alt="RIO Logo"
          />
        </a>
        <button
          type="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <IfElse
                condition={auth && auth.isAuthenticated}
                True={
                  <>
                    <StyledButton
                      background="#200122"
                      color="#FC9B55"
                      href="https://raio.agency/"
                    >
                      Home
                    </StyledButton>
                    <StyledNavlink
                      to={`/dashboard/${type}`}
                    >
                      Dashboard
                    </StyledNavlink>
                    <StyledButton
                      background="#200122"
                      color="#FC9B55"
                      onClick={logoutUser}
                    >
                      Sair
                    </StyledButton>
                  </>
                }
                False={
                  <>
                    <StyledButton
                      background="#200122"
                      color="#FC9B55"
                      href="https://raio.agency/"
                    >
                      Home
                    </StyledButton>
                    <StyledButton
                      background="linear-gradient(101deg,#6f0000 0%,rgb(65, 1, 20) 80%)"
                      color=" #FC9B55"
                      onClick={() => setModalStatus(!modalStatus)}
                    >
                      Cadastre-se
                    </StyledButton>
                    <StyledNavlink to="/" >
                      Entrar
                    </StyledNavlink>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        width="500px"
      >
        <SignupPopup
          toggleModalStatus={() => setModalStatus(!modalStatus)}
        />
      </Modal>
    </Wrapper>
  );
}

export default Header;
