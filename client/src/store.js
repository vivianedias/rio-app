import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const {
  example,
  authModel,
  registerModel,
  userModel
} = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  register: registerModel,
  user: userModel
};

const store = createStore(storeModel);

export default store