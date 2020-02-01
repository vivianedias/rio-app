import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const { example, authModel, registerModel } = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  candidate: registerModel
};

const store = createStore(storeModel);

export default store