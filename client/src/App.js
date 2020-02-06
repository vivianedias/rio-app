import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Router, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy';
// import jwtDecode from 'jwt-decode'
import styled from 'styled-components'

// import setAuthToken from '../services/setAuthToken'
// import { handleAuth, logoutUser } from '../actions/auth'
import history from './history'

// import PrivateRoute from './PrivateRoute/PrivateRoute'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login/Login'
import Enterprise from './pages/Signup/Enterprise'
import Professionals from './pages/Signup/Professional'
import Users from './pages/Signup/User'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import ProfessionalProfile from './pages/Dashboard/Professional/Professional'
import EnterpriseProfile from './pages/Dashboard/Enterprise/Enterprise'
import Operator from './pages/Dashboard/Operator/Operator'
import VacancyList from './pages/Dashboard/Vacancy/VacancyList'
import VacancyRegister from './pages/Dashboard/Vacancy/VacancyRegister'
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

const AppWrapper = styled.div`
  height: 100vh;
`

const AppBody = styled.div`
  height: calc(100vh - 3.25rem);
  width: 100%;
  font-family: "Montserrat";
`

const App = ({ store }) => (
  <StoreProvider store={store}>
    <Router history={history}>
      <AppWrapper>
        <Header />
        <AppBody>
          <Route path="/" exact component={Home} />
          <Route path="/entrar" exact component={Login} />
          <Route path="/cadastro" exact component={Users} />
          <Route path="/profissional/meu-perfil" component={ProfessionalProfile} />
          <Route path="/empresa/meu-perfil" component={EnterpriseProfile} />
          <Route path='/admin/operadora' component={Operator} />
          <Route path='/listagem/vagas' component={VacancyList} />
          <Route path='/cadastro/vaga' component={VacancyRegister} />

          <Switch>
          <PrivateRoute path='/cadastro/empresa' component={Enterprise} />
            <PrivateRoute
              path='/cadastro/profissional'
              component={Professionals}
            />
            {/* <PrivateRoute path='/dashboard' component={Dashboard} /> */}
          </Switch>
          <Footer fixed>
          </Footer>
        </AppBody>
      </AppWrapper>
    </Router>
  </StoreProvider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
