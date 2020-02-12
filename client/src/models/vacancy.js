import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const vacancyModel = {
  getAllVacancies: thunk(async (actions, payload) => {
    // all specific enterpise vacancies or all vacancies
    try {
      const res = payload
        ? await axios.get(`/api/job/all/${payload}`)
        : await axios.get('/api/job/all')
      actions.setVacancies(res.data && res.data)
    }
    catch (err) {
      console.log(err)
    }
  }),
  vancancies: [],
  setVacancies: action((state, payload) => ({
    vacancies: payload
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default vacancyModel