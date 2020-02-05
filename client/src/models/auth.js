import { thunk, action } from 'easy-peasy'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import history from '../history'
import { isEmpty } from '../utils/service'

const authModel = {
  authUser: thunk(async (actions, payload) => {
    try {
      const res = await axios.post('/api/user/login', payload)
  
      // Set token to localStorage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
  
      // Set token to auth header
      setAuthToken(token)
  
      // Decode token to get user data
      const decoded = jwtDecode(token)
      console.log({ user: decoded })

      // Set current user
      actions.setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded
      })

      const user_type = localStorage.user_type
      
      history.push(`/cadastro/${user_type}`)
      return user_type && localStorage.removeItem('user_type')
    }
    catch (e) {
      const errors = e.response.data
      return actions.setErrors(errors)
    }
  }),
  auth: {
    isAuthenticated: false,
    user: {}
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