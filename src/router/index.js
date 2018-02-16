import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Singup from '@/views/Singup';
import Relato from '@/views/Relato';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'singup',
      component: Singup,
      props: { showLogin: true },
    },
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
});
