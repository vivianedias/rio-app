import { thunk, action } from 'easy-peasy'
import axios from 'axios'

import history from '../history'

const registerModel = {
  registerProfessional: thunk(async (actions, payload) => {
    actions.setUser(payload)

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
  user: {},
  errors: {},
  setUser: action((state, payload) => {
    state.user = payload
  }),
  setErrors: action((state, payload) => {
    state.errors = payload
  }),
}

export default registerModel