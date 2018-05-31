<template>

  <v-container fluid fill-height>
    <v-flex style="text-align: center" xs12 sm12 lg12>

      <div id="firebaseui-auth-container"></div>

      <v-progress-circular
        v-if="mostrarLoading"
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
    data: () => ({
      mostrarLoading: true,
    }),

    mounted() {
      // Configuração do FirebaseUI
      const uiConfig = {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '/',
        callbacks: {
          signInSuccess() { return false; },
        },
      };

      // Inicializa o widget FirebaseUI usando o Firebase
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      ui.start('#firebaseui-auth-container', uiConfig);
      this.mostrarLoading = false;
    },
  };
</script>

<style scoped>

</style>
