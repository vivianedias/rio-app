import { thunk, action } from 'easy-peasy'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import history from '../history'
import { isEmpty } from '../utils/service'

const authModel = {
  authUser: thunk(async (actions, payload) => {
    const { value, query } = payload
    try {
      const res = await axios.post('/api/users/login', value)
      actions.setAuth({
        user: {
          email: undefined,
          password: undefined
        }
      })
  
      // Set token to localStorage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
  
      // Set token to auth header
      setAuthToken(token)
  
      // Decode token to get user data
      const decoded = jwtDecode(token)
  
      // Set current user
      actions.setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded
      })
  
      history && query
        ? history.push(`/${query}`)
        : history.push('/dashboard')
  
      query && localStorage.removeItem('defaultLocation')
    }
    catch (e) {
      const errors = e.response.data
      return actions.setErrors(errors)
    }
  }),
  auth: {
    isAuthenticated: false,
    user: {
      email: undefined,
      password: undefined
    }
  },
  recovery: {
    msg: '',
    isLoading: false
  },
  errors: {},
  setAuth: action((state, payload) => {
    state.auth = payload
  }),
  setRecovery: action((state, payload) => {
    state.recovery = payload
  }),
  setErrors: action((state, payload) => {
    state.errors = payload
  }),
}

export default authModel