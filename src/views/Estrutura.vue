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
    <!-- Toast -->
    <toast
      :toast-mostrar="toast.mostrar"
      :cor="toast.cor"
      :texto="toast.texto"
      @toast-atualizar="toastAtualizar"
    />
  </v-container>
</template>

<script>

  /* Import Components */
  import Footer from '@/components/Footer';
  import NavigationDrawer from '@/components/NavigationDrawer';
  import Toolbar from '@/components/Toolbar';
  import Toast from '@/components/Toast';

  // LayoutProps lida com as propriedades de Layout
  import EventBus, { LayoutProps } from '@/main';

  export default {
    name: 'Estrutura',
    components: {
      Footer,
      NavigationDrawer,
      Toolbar,
      Toast,
    },
    data: () => ({
      drawerMostrar: false,
      toast: {
        mostrar: false,
        cor: '',
        texto: '',
      },
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

      /* Toast */

      toastAtualizar(value) {
        this.toast.mostrar = value;
      },
    },

    mounted() {
      // Ouve o evento de click no icone salvar da toolbar
      const vm = this;
      EventBus.$on('toaster', (value) => {
        vm.toast.mostrar = true;
        vm.toast.cor = value.cor;
        vm.toast.texto = value.texto;
      });
    },

  };

</script>

<style scoped>

</style>
