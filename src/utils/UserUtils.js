import store from '@/vuex/store';

class UserUtils {
  static getUserId() {
    return store.getters.userId;
  }
}


export default UserUtils;
