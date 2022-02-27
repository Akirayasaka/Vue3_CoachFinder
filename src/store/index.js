import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';

export default createStore({
  strict: true,
  state: {},
  actions: {},
  mutations: {},
  modules: {
    coachesModule
  },
});
