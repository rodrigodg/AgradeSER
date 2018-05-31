import store from '@/vuex/store';
import * as firebase from 'firebase';

class ServicesUtils {
  static isUsuarioLogadoEFirebaseInicializado() {
    return store.getters.isUserLogado && firebase.app.length;
  }
}


export default ServicesUtils;
