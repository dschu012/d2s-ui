import Vue from 'vue';
import Router from 'vue-router';
import Armory from '@/components/Armory.vue';
import List from '@/components/List.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
    },
    {
      path: '/character/:character',
      name: 'armory',
      component: Armory,
    },
  ],
});
