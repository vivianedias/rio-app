import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const { example } = GlobalModels

const storeModel = {
  products: example,
};

const store = createStore(storeModel);

export default store