import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const {
  example,
  authModel,
  registerModel,
  userModel,
  enterpriseModel
} = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  register: registerModel,
  user: userModel,
  enterprise: enterpriseModel
};

const store = createStore(storeModel);

export default store