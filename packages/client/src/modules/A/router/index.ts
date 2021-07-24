import { RouteConfig } from 'vue-router';
import A from '../components/A.vue';

const route: RouteConfig[] = [{
  path: '/',
  component: A,
  children: [],
}];

export default route;
