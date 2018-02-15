<template>
    <v-snackbar
            :timeout="timeout"
            :color="cor"
            v-model="toast"
    >
        {{ texto }}
    </v-snackbar>
</template>

<script>

    export default {
      name: 'toast',
      props: {
        toastMostrar: false,
        cor: '',
        timeout: 3000,
        texto: '',
      },
      data() {
        return {
          toast: this.toastMostrar,
        };
      },
      watch: {

        toastMostrar() {
          this.toast = this.toastMostrar;
        },

        toast() {
          this.$emit('toast-atualizar', this.toast);
        },
      },
    };
</script>

<style scoped>

</style>
