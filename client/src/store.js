import { createStore } from 'easy-peasy';
import GlobalModels from './models/index'

const {
  example,
  authModel,
  registerModel,
  userModel,
  vacancyModel,
  enterpriseModel
} = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  register: registerModel,
  user: userModel,
  vacancy: vacancyModel,
  enterprise: enterpriseModel
};

const store = createStore(storeModel);

export default store