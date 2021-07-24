import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentProject: {
      apiKey: '',
      domain: '',
      errorLimit: '',
      members: [],
      name: '',
      numberOfErrors: 0,
      owner: '',
      status: '',
      _id: '',
      telegramChatId: '',
    },
  },
  mutations: {
    setCurrentProject(state, data) {
      state.currentProject = { ...data };
    },
    updateCurrentProjectApiKey(state, apiKey) {
      if (state.currentProject !== null) {
        state.currentProject.apiKey = apiKey;
      }
    },
    updateCurrentProjectDomain(state, newDomain) {
      if (state.currentProject !== null) {
        state.currentProject.domain = newDomain;
      }
    },
    updateCurrentProjectTelegram(state, data) {
      if (state.currentProject !== null) {
        state.currentProject.telegramChatId = data;
      }
    },
  },
});
