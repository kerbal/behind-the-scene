import { RouteConfig } from 'vue-router';
import DocumentPage from '../components/DocumentPage.vue';

const route: RouteConfig[] = [
  {
    path: '/document',
    component: DocumentPage,
    name: 'document',
    children: [],
    beforeEnter(to, from, next) {
      document.title = 'Document - Behind The Scene';
      next();
    },
  },
];

export default route;
