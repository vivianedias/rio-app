import React, {
  useState
} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

import Modal from '../components/Modal'
import SignupPopup from '../components/popups/Signup'
import Button from '../components/Button'

const Wrapper = styled.nav`
  background-color: #200122;
  padding: 5px;
`

const StyledLogo = styled.img`
  margin-left: 30px;
`

// import { withRouter } from 'react-router';
// import _ from 'lodash';

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

// const mapDispatchToProps = dispatch => ({
// 	dispatchScreenSize: value => {
// 		dispatch(setScreenSize(value));
// 	},
// 	logoutUser: (history) => {
// 		dispatch(logoutUser(history));
// 	}
// })

// const mapStateToProps = state => ({
// 	auth: state.auth
// })

export default Header;
