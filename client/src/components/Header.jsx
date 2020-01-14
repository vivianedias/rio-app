import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Modal from '../components/Modal'
import SignupPopup from '../components/popups/Signup'
import Button from '../components/Button'

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
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
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
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>
          <button className="navbar-item">
            Documentation
          </button>
          <div className="navbar-item has-dropdown is-hoverable">
            <button className="navbar-link">
              More
            </button>
            <div className="navbar-dropdown">
              <button className="navbar-item">
                About
              </button>
              <button className="navbar-item">
                Jobs
              </button>
              <button className="navbar-item">
                Contact
              </button>
              <hr className="navbar-divider" />
              <button className="navbar-item">
                Report an issue
              </button>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Button
                onClick={() => setModalStatus(!modalStatus)}
                styles="is-primary"
              >
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
          onClick={() => setModalStatus(false)}
        />
      </Modal>
    </nav>
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
