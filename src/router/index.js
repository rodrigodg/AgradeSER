import Vue from 'vue';
import Router from 'vue-router';
import TelaPrincipal from '@/views/TelaPrincipal';
import Relato from '@/views/Relato';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'telaPrincipal',
      component: TelaPrincipal,
    },
    {
      path: '/relato',
      name: 'relato',
      component: Relato,
    },
  ],
});
