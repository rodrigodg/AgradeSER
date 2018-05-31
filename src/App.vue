<!--

    Componente: App

    Responsabilidade: Conter as rotas da tela retdirecionar pra ela principal

-->

<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

  export default {
    name: 'app',

    mounted() {
      this.$router.push('/');
    },

  };

</script>

<style scoped>

</style>
