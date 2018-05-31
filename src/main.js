// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

// Importar Firebase e Firebase config
import * as firebase from 'firebase';
import firebaseConfig from '@/config/firebaseConfig';
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/vuex/store';


/* Vuetify */

Vue.use(
  Vuetify, {
    theme: {

      /* Primary */
      primary: '#7b1fa2',
      primaryLight: '#af52d5',

      /* Secondary */
      secondary: '#4a0073',

      /* Accent */
      accent: '#00c853',

      /* Background */
      background: '#fafafa',

      /* Icones */
      iconLight: '#757575',

      /* Texto */
      textPrimary: '#ffffff',
      textBackgroundLight: '#757575',

      /* Cartões */
      cartaoBackground: '#f9fbe7',
      cartaoChip: '#F0F4C3',

      /* Mensagens */
      error: '#f44336',
      warning: '#ffeb3b',
      info: '#2196f3',
      success: '#4caf50',

    } });


/* EventBus */

const EventBus = new Vue();
export default EventBus;


/* Layout */

const LayoutProps = {
  biggerScreenBreakpoint: 1264,
};
export { LayoutProps };


/* Firebase */
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
export const db = firebaseApp.firestore();


/* Vue */

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        /* Armazena dados do usuário no Vuex */
        store.commit('user', {
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
        });

        this.$router.push({ name: 'home' });
      } else {
        /* Deleta dados do usuário no Vuex */
        store.commit('user', {
          displayName: '',
          email: '',
          photoUrl: '',
          uid: '',
        });

        this.$router.push(
          { name: 'singup' },
        );
      }
    });
  },
});
