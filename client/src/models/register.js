import { thunk, action } from 'easy-peasy'
import axios from 'axios'
import history from '../history'

const registerModel = {
  registerProfessional: thunk(async (actions, payload) => {
    try {
      const request = await axios.post('/api/candidate/register', payload)
      localStorage.setItem("idProfessional", request.data._id)
      return history.push(`/dashboard/${payload.type}`)
    }
    catch (err) {
      console.log(err)
      const errors = err.response.data
      return errors
      // return actions.setErrors(errors)
    }
  }),
  registerCompany: thunk(async (actions, payload) => {
    try {
      const request = await axios.post('/api/enterprise/register', payload)
      localStorage.setItem("idEnteprise", request.data._id)
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