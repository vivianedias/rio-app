import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const { example, authModel, registerModel, getModel } = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  user: registerModel,
  get: getModel
};

const store = createStore(storeModel);

export default store