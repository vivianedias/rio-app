import { thunk } from 'easy-peasy'
import axios from 'axios'

const enterpriseModel = {
  registerJob: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/enterprise/job', payload)
      return {
        status: 200,
        msg: 'Sua vaga foi postada!'
      }
    }
    catch (e) {
      const errors = e.response.data
      // return actions.setErrors(errors)
    }
  }),
}

export default enterpriseModel