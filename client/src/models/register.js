import { thunk, action } from 'easy-peasy'
import axios from 'axios'
import history from '../history'

const registerModel = {
  registerProfessional: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/professional/register', payload)
      return history.push(`/dashboard/${payload.type}`)
    }
    catch (err) {
      console.log(err)
      const errors = err.response.data
      return actions.setErrors(errors)
    }
  }),
  registerCompany: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/enterprise/register', payload)
      return history.push(`/dashboard/${payload.type}`)
    }
    catch (err) {
      console.log(err)
      const errors = err.response.data
      return actions.setErrors(errors)
    }
  }),
  registerUser: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/user/register', payload)
      return history.push('/')
    }
    catch (err) {
      console.log(err)
      const errors = err.response.data
      return actions.setErrors(errors)
    }
  }),
  errors: {},
  setErrors: action((state, payload) => {
    state.errors = payload
  })
}


export default registerModel