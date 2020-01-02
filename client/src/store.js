import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const { example, authModel } = GlobalModels

const storeModel = {
  products: example,
  auth: authModel
};

const store = createStore(storeModel);

export default store