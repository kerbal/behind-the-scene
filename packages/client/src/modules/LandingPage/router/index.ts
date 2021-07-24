import { RouteConfig } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';

const route: RouteConfig[] = [{
  path: '/',
  component: LandingPage,
  name: 'landing',
  children: [],
  beforeEnter(to, from, next) {
    document.title = 'Behind The Scene';
    next();
  },
}];

export default route;
