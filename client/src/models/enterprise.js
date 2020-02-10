import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const enterpriseModel = {
  getAllEnterprises: thunk(async (actions, payload) => {
    try {
      const res = await axios.get('/api/enterprise/all')

      // Set current user profile
      actions.setUser(res.data)
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