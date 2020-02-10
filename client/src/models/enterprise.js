import { thunk, action } from 'easy-peasy'
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
  getAllEnterprises: thunk(async (actions, payload) => {
    try {
      const res = await axios.get('/api/user/all')

      actions.setEnterprises(
        res.data.filter(user => user.type === 'enterprise')
      )
    }
    catch (e) {
      const errors = e.response.data
      // return actions.setErrors(errors)
    }
  }),
  enterprises: [],
  setEnterprises: action((state, payload) => ({
    enterprises: [ ...payload ]
  })),
}

export default enterpriseModel