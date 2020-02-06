import React, {
  useState,
  useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import jwtDecode from 'jwt-decode'
import { useStoreActions } from 'easy-peasy'

import Modal from '../components/Modal'
import SignupPopup from '../components/popups/Signup'
import Button from '../components/Button'

import setAuthToken from '../utils/setAuthToken'
import { isEmpty } from '../utils/service'

const Wrapper = styled.nav`
  background-color: #200122;
  padding: 5px;
`

const StyledLogo = styled.img`
  margin-left: 30px;
`

const Header = () => {
  // constructor(props) {
  // 	super(props);
  // 	this.state = {
  // 		isActive: false,
  // 		isBurguerOpen: false,
  // 	}
  // }

  // componentDidMount() {
  // 	window.addEventListener('resize', _.throttle(this.setWindowWidth, 500), false);
  // 	// this.props.dispatchScreenSize(document.documentElement.clientWidth);
  // }

  // componentWillUnmount() {
  // 	window.removeEventListener('scroll', this.setWindowWidth, false);
  // }

  // setWindowWidth = () => {
  // 	// this.props.dispatchScreenSize(document.documentElement.clientWidth);		
  // }

  // handleClick = (e) => {
  // 	e.preventDefault();
  // 	this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }));
  // }

  // const { auth: { isAuthenticated, user }, history } = this.props;
  // const { isActive } = this.state;

  const [modalStatus, setModalStatus] = useState(false)
  const setAuth = useStoreActions(actions => actions.auth.setAuth)
  const logoutUser = useStoreActions(actions => actions.auth.logoutUser)

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
              <Button onClick={() => setModalStatus(!modalStatus)}>
                Cadastre-se
              </Button>
              <NavLink to="/entrar" className="button is-light">
                Entrar
              </NavLink>
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
