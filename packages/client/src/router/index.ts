import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '@/modules/LandingPage/router/index';
import DashboardPage from '@/modules/DashboardPage/router/index';
import InvitationPage from '@/modules/InvitationPage/router/index';
import DocumentPage from '@/modules/DocumentPage/router/index';
import AboutPage from '@/modules/AboutPage/router/index';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
});

router.addRoutes(LandingPage);

router.addRoutes(DashboardPage);

router.addRoutes(InvitationPage);

router.addRoutes(DocumentPage);

router.addRoutes(AboutPage);

export default router;
