import actions from './actions';
import getters from './getter';
import mutations from './mutations';
import state from './state';

const store = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default store;
