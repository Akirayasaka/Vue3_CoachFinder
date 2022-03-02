import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  //namespaced: true, 註冊為全域
  state: {
    userId: null,
    token: null,
    didAutoLogout: false
  },
  actions,
  mutations,
  getters,
};
