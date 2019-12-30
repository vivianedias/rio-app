import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy';
import jwtDecode from 'jwt-decode'

// import setAuthToken from '../services/setAuthToken'
// import { handleAuth, logoutUser } from '../actions/auth'
import history from './history'

// import PrivateRoute from './PrivateRoute/PrivateRoute'
import Home from './pages/Home'

// if (localStorage.jwtToken) {
//   // Set the auth token header auth
//   setAuthToken(localStorage.jwtToken)
//   // Decode token and get user info and exp
//   const decoded = jwtDecode(localStorage.jwtToken)
//   // Set user and auth
//   store.dispatch(handleAuth(decoded))
//   // Check for expired token
//   const currentTime = Date.now() / 1000
//   if (decoded.exp < currentTime) {
//     // Logout user
//     // Clear current profile
//     // Redirect to login
//     store.dispatch(logoutUser())
//   }
// }

const App = ({ store }) => (
  <StoreProvider store={store}>
    <Router history={history}>
      <div className="app">
        {/* <Header /> */}
        <div className="app-body">
          <Route path="/" exact component={Home} />
        </div>
      </div>
    </Router>
  </StoreProvider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
