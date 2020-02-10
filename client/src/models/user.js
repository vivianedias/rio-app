import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const userModel = {
  getUser: thunk(async (actions, payload) => {
    try {
      const user = await axios.get('/api/user/current')
      const userTypeData = await axios.get(`/api/${payload}`)

      // Set current user profile
      actions.setUser({
        ...user.data,
        ...userTypeData.data
      })
    }
    catch (e) {
      const errors = e.response.data
      // return actions.setErrors(errors)
    }
  }),
  user: {},
  setUser: action((state, payload) => ({
    user: { ...payload }
  })),
}

export default userModel