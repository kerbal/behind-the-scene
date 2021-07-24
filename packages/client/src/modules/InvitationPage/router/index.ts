import { RouteConfig } from 'vue-router';
import InvitationPage from '../components/InvitationPage.vue';
import { getLoginStatus } from '../../../utils/session';

const route: RouteConfig[] = [{
  path: '/invitations/:invitationId',
  component: InvitationPage,
  name: 'invitation',
  beforeEnter(to, from, next) {
    if (!getLoginStatus()) {
      next({ name: 'landing', query: { openLogin: 'true', redirectUrl: to.fullPath } });
    } else {
      document.title = 'Invitation - Behind The Scene';
      next();
    }
  },
}];

export default route;
