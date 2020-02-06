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
      console.log({ isEmpty: !isEmpty(decoded) })
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
  logoutUser: thunk(async (actions, payload) => {
     // Remove token from localStorage
     localStorage.removeItem('jwtToken')

     // Remove auth header for future requests
     setAuthToken(false)
 
     // Set the current user to {} wich will set isAuthenticated to false
     actions.setAuth({
       isAuthenticated: false,
       user: {}
     })
 
     history ? history.push('/') : window.location.href = '/'
  }),
  auth: {
    isAuthenticated: false,
    user: {}
  },
  setAuth: action((state, payload) => ({
    auth: { ...payload }
  })),
}

export default authModel