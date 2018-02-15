<template>
    <v-btn
            fixed
            bottom
            right
            dark
            fab
            :color="cor"
            @click="botaoClicado">
        <v-icon>{{ icone }}</v-icon>
    </v-btn>
</template>

<script>
    export default {
      name: 'button-action',
      props: ['cor', 'icone'],
      methods: {
        botaoClicado() {
          this.$emit('botao-clicado');
        },
      },
    };
</script>

<style scoped>

</style>
