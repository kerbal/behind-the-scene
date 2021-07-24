import { RouteConfig } from 'vue-router';
import { getLoginStatus } from '../../../utils/session';
import DashboardWrapper from '../components/DashboardWrapper.vue';
import AddProject from '../components/AddProject.vue';
import ProjectDetailWrapper from '../components/ProjectDetail/ProjectDetailWrapper.vue';
import projectDetailRoute from './ProjectDetailRoute';

const route: RouteConfig[] = [{
  path: '/dashboard',
  name: 'dashboard',
  component: DashboardWrapper,
  children: [
    {
      path: 'add-project',
      component: AddProject,
      beforeEnter(to, from, next) {
        document.title = 'Add project - Behind The Scene';
        next();
      },
    },
    {
      path: 'project-detail/:id',
      component: ProjectDetailWrapper,
      children: projectDetailRoute,
    },
  ],
  beforeEnter(to, from, next) {
    if (!getLoginStatus()) {
      next({ name: 'landing' });
    } else {
      document.title = 'Dashboard - Behind The Scene';
      next();
    }
  },
}];

export default route;
