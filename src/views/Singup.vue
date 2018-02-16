<template>

  <v-container fluid fill-height>
    <v-flex style="text-align: center" xs12 sm12 lg12>

      <div v-if="showLogin" id="firebaseui-auth-container"></div>

      <v-progress-circular
        v-if="!progressoEsconder"
        indeterminate
        :size="70"
        :width="7"
        color="primary"/>

    </v-flex>
  </v-container>

</template>

<script>

  // Importar o CSS do FirebaseUI
  import 'firebaseui/dist/firebaseui.css';

  // Importar Firebase, firebaseUI e Firebase config
  import * as firebaseui from 'firebaseui';
  import * as firebase from 'firebase';

  export default {
    name: 'singup',
    props: {
      showLogin: {
        default: false,
        type: Boolean,
      },
    },
    data: () => ({
      progressoEsconder: false,
    }),

    mounted() {
      // Configuração do FirebaseUI
      const uiConfig = {
        signInSuccessUrl: '/home',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '/',
      };

      // Inicializa o widget FirebaseUI usando o Firebase
      const ui = new firebaseui.auth.AuthUI(firebase.auth());

      setTimeout(
        () => {
          if (this.showLogin) {
            ui.start('#firebaseui-auth-container', uiConfig);
            this.progressoEsconder = true;
          }
        }, 1000);
    },
  };
</script>

<style scoped>

</style>
