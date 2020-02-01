import { thunk, action } from 'easy-peasy'
import axios from 'axios'

import history from '../history'

const registerModel = {
  registerCandidate: thunk(async (actions, payload) => {
    actions.setCandidate(payload)

    axios.post('/api/candidate/register', payload)
      .then(() => {
        localStorage.defaultLocation
          ? history.push(`/login?${localStorage.defaultLocation}`)
          : history.push('/login')
      })
      .catch(err => {
        const errors = err.response.data
        return actions.setErrors(errors)
      })
  }),

  registerCompany: thunk(async (actions, payload) => {
    actions.setCompany(payload)
    axios.post('/api/company/register', payload)
      .then(() => {
        localStorage.defaultLocation
          ? history.push(`/login?${localStorage.defaultLocation}`)
          : history.push('/login')
      })
      .catch(err => {
        const errors = err.response.data
        return actions.setErrors(errors)
      })
  }),
  candidate: {},
  company: {},
  errors: {},
  setCandidate: action((state, payload) => {
    state.candidate = payload
  }),
  setCompany: action((state, payload) => {
    state.company = payload
  }),
  setErrors: action((state, payload) => {
    state.errors = payload
  }),
}


export default registerModel