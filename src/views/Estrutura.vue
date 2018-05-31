<!--

    Componente: App

    Responsabilidade: Gerenciar a visão geral da applicação (Drawer, Toolbar e Conteúdo)

-->

<template>
  <v-container fluid>
    <navigation-drawer
      :drawer-mostrar="drawerMostrar"
      @drawer-atualizacao="drawerAtualizarDoFilho"
    />
    <toolbar @drawer-alternar="drawerAlternar"/>
    <v-content>
      <router-view/>
    </v-content>
    <footer>
    </footer>
  </v-container>
</template>

<script>

  /* Import Components */
  import Footer from '@/components/Footer';
  import NavigationDrawer from '@/components/NavigationDrawer';
  import Toolbar from '@/components/Toolbar';


  /* Import Propriedades */

  // LayoutProps lida com as propriedades de Layout
  import { LayoutProps } from '@/main';

  export default {
    name: 'Estrutura',
    components: {
      Footer,
      NavigationDrawer,
      Toolbar,
    },
    data: () => ({
      drawerMostrar: false,
    }),
    methods: {

      /* Drawer */

      // Retorna true caso a largura da tela for acima de determinado limiar
      // Usado para mostrar o drawer em telas de grande largura
      drawerMostrarPorBreakpoint() {
        return this.$vuetify.breakpoint.width > LayoutProps.biggerScreenBreakpoint;
      },

      // Alterna entre mostrar/esconder o drawer
      drawerAlternar() {
        this.drawerMostrar = this.drawerMostrarPorBreakpoint() || !this.drawerMostrar;
      },

      // Atualiza a varivavel de controle, caso o componente filho altere o status do drawer
      drawerAtualizarDoFilho(value) {
        this.drawerMostrar = this.drawerMostrarPorBreakpoint() || value;
      },
    },

  };

</script>

<style scoped>

</style>
