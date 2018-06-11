<template>
    <v-toolbar dark color="primary" app absolute clipped-left>
        <v-toolbar-side-icon v-if="iconeMenuMostrar" @click="drawerAlternar()"/>
        <span class="title">AgradeSER</span>
        <div v-if="iconeEsquerda.mostrar" class="d-flex align-center" style="margin-left: auto">
            <v-btn icon @click="iconeEsquerdaClicado()">
                <v-icon>{{ iconeEsquerda.icone }}</v-icon>
            </v-btn>
        </div>
    </v-toolbar>
</template>

<script>

    /*
     * EventBus lida com as mensagens entre componentes não parentais
     * LayoutProps lida com as propriedades de Layout
    */
    import EventBus, { LayoutProps } from '@/main';

    export default {
      name: 'toolbar',
      data: () => ({
        iconeEsquerda: {
          icone: '',
          mostrar: false,
        },
      }),
      computed: {

        /* Show Icon */
        iconeMenuMostrar() {
          return this.$vuetify.breakpoint.width <= LayoutProps.biggerScreenBreakpoint;
        },

      },
      methods: {

        /* Drawer */

        drawerAlternar() {
          this.$emit('drawer-alternar');
        },


        /* Left Button Click */
        iconeEsquerdaClicado() {
          EventBus.$emit('toolbar-clicado-icone-esquerda', this.iconeEsquerda.icone);
        },

      },
      created() {
        /* Event Bus */

        // Ouve o evento para alterar o ícone da direita
        const vm = this;
        EventBus.$on('toolbar-definir-icone-esquerda', (value) => {
          vm.iconeEsquerda.mostrar = value;

          if (value) {
            vm.iconeEsquerda.icone = value;
          }
        });
      },
      destroyed() {
        /* Event Bus */

        // Pára de ouvir o evento para alterar o ícone da direita
        EventBus.$off('toolbar-definir-icone-esquerda');
      },
    };
</script>

<style scoped>

</style>
