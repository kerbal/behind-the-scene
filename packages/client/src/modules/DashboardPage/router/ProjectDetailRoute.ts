import { RouteConfig } from 'vue-router';

import OverviewWrapper from '../components/ProjectDetail/OverviewWrapper.vue';

import BugsErrorWrapper from '../components/ProjectDetail/BugsErrorsWrapper.vue';
import BugsErrorsMain from '../components/ProjectDetail/BugsErrorsMain.vue';
import BugsErrorsDetail from '../components/ProjectDetail/BugsErrorsDetail.vue';

import SettingWrapper from '../components/ProjectDetail/SettingWrapper.vue';
import SettingCollaborator from '../components/ProjectDetail/SettingCollaborator.vue';
import SettingConfiguration from '../components/ProjectDetail/SettingConfiguration.vue';
import SettingNotification from '../components/ProjectDetail/SettingNotification.vue';
import SettingPayment from '../components/ProjectDetail/SettingPayment.vue';

const route: RouteConfig[] = [
  {
    path: '',
    name: 'dashboard.project-detail',
    redirect: 'overview',
  },
  {
    path: 'overview',
    component: OverviewWrapper,
  },
  {
    path: 'bugs-errors',
    name: 'bugs-errors',
    component: BugsErrorWrapper,
    children: [
      {
        path: '',
        name: 'bugs-errors-main',
        component: BugsErrorsMain,
      },
      {
        path: 'bugs-errors-detail/:bugId',
        name: 'bugs-errors-detail',
        component: BugsErrorsDetail,
      },
    ],
  },
  {
    path: 'setting',
    component: SettingWrapper,
    children: [
      {
        path: '',
        redirect: 'collaborator',
      },
      {
        path: 'collaborator',
        component: SettingCollaborator,
      },
      {
        path: 'configuration',
        component: SettingConfiguration,
      },
      {
        path: 'notification',
        component: SettingNotification,
      },
      {
        path: 'payment',
        component: SettingPayment,
      },
    ],
  },
];

export default route;
