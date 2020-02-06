import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useStoreState(state => state.auth.auth)

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={'/entrar'}
          />
        )
      }
    />
  )
}

export default PrivateRoute
