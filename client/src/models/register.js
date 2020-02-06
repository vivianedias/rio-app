import { thunk, action } from 'easy-peasy'
import axios from 'axios'
import history from '../history'

const registerModel = {
  registerProfessional: thunk(async (actions, payload) => {
    return axios.post('/api/candidate/register', payload)
      .then(() => {
        history.push('/dashboard')
      })
      .catch(err => {
        const errors = err.response.data
        return actions.setErrors(errors)
      })
  }),
  registerCompany: thunk(async (actions, payload) => {
    return axios.post('/api/company/register', payload)
      .then(() => {
        history.push('/dashboard')
      })
      .catch(err => {
        const errors = err.response.data
        return actions.setErrors(errors)
      })
  }),
  registerUser: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/user/register', payload)
      return history.push('/entrar')
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
  }),
}


export default registerModel