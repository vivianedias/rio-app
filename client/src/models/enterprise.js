import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const enterpriseModel = {
  registerJob: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/job', payload)
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
  getAll: thunk(async (actions, payload) => {
    try {
      return await axios.get('/api/enterprise/all')
    }
    catch (err) {
      console.log(err)
      return err.response
    } 
  }),
  enterprises: [],
  setEnterprises: action((state, payload) => ({
    enterprises: [...payload]
  })),
}

export default enterpriseModel