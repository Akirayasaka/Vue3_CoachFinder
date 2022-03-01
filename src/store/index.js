import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

export default createStore({
  strict: true,
  state: {
    userId: 'c3'
  },
  actions: {},
  mutations: {},
  modules: {
    coachesModule,
    requestsModule
  },
  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});
