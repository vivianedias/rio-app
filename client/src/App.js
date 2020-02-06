import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Router, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy';
import styled from 'styled-components'

import history from './history'

import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login/Login'
import Enterprise from './pages/Signup/Enterprise'
import Professionals from './pages/Signup/Professional'
import Users from './pages/Signup/User'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

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
