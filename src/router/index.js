import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Singup from '@/views/autenticacao/Singup';
import Relato from '@/views/Relato';
import Loading from '@/views/autenticacao/Loading';
import Estrutura from '@/views/Estrutura';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: Loading,
    },
    {
      path: '',
      name: 'estrutura',
      component: Estrutura,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/relato',
          name: 'relato',
          component: Relato,
        },
      ],
    },
    {
      path: '/login',
      name: 'singup',
      component: Singup,
    },
  ],
});
