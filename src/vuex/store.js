/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      displayName: '',
      email: '',
      photoUrl: '',
      uid: '',
    },
  },

  getters: {
    user: state => state.user,
    userId: state => state.user.uid,
    isUserLogado: state => state.user.uid !== '',
  },

  mutations: {
    user: (state, user) => {
      state.user.displayName = user.displayName;
      state.user.email = user.email;
      state.user.photoUrl = user.photoUrl;
      state.user.uid = user.uid;
    },
  },
});

export default store;
