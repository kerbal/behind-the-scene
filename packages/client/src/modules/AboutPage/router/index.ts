import { RouteConfig } from 'vue-router';
import AboutPage from '../components/AboutPage.vue';

const route: RouteConfig[] = [
  {
    path: '/about',
    component: AboutPage,
    name: 'about',
    children: [],
    beforeEnter(to, from, next) {
      document.title = 'About us - Behind The Scene';
      next();
    },
  },
];

export default route;
