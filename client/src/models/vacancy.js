import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const vacancyModel = {
  setVacancy: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/jobs', payload)
    }
    catch (e) {
      const errors = e.response.data
      // return actions.setErrors(errors)
    }
  }),
  getAllVacancies: thunk(async (actions, payload) => {
    try {
      const res = await axios.get('/api/job/all')
      actions.setVacancies(res)
    }
    catch (e) {
      const errors = e.response.data
      // return actions.setErrors(errors)
    }
  }),
  vancacies: [],
  setVacancies: action((state, payload) => ({
    vancacies: [ ...payload ]
  })),
}

export default vacancyModel