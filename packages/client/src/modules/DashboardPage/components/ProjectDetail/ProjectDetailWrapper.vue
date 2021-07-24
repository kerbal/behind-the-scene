<template>
  <div id="project-detail" class="project-detail">
    <div class="project-detail-container">
      <div class="project-detail-appname">
        <p class="project-detail-appname-text">{{ appName }}</p>
      </div>
      <div class="project-detail-subroutes">
        <ul>
          <li
            v-for="item in subRoutes"
            :key="item.id"
            @click="onNavigate(item.route)"
            v-bind:class="{ 'selectedContainer': currentRoute === item.route }"
          >
            <p v-bind:class="{ 'selectedText': currentRoute === item.route }">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="project-detail-content">
        <div v-if="loading"></div>
        <router-view v-else/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '../../../../config';
import apiService from '../../../../utils/apiService';

export default Vue.extend({
  name: 'ProjectDetailWrapper',
  data() {
    return {
      appName: '',
      subRoutes: [
        {
          id: 0,
          name: 'Overview',
          route: 'overview',
        },
        {
          id: 1,
          name: 'Bugs & Errors',
          route: 'bugs-errors',
        },
        {
          id: 2,
          name: 'Setting',
          route: 'setting',
        },
      ],
      loading: false,
      currentRoute: '',
    };
  },
  methods: {
    onNavigate(route: string) {
      if (route === this.currentRoute) {
        return;
      }
      this.currentRoute = route;
      this.$router.push({ path: `/dashboard/project-detail/${this.$route.params.id}/${route}` });
    },
    async loadProjectData() {
      this.loading = true;
      const result = await apiService.get(`/api/projects/${this.$route.params.id}`);
      const { data } = result;
      if (data.status !== 'NORMAL') {
        this.$router.push({ name: 'dashboard' });
        return;
      }
      this.$store.commit('setCurrentProject', data);
      this.appName = this.$store.state.currentProject.name;
      document.title = `${this.appName} - Behind The Scene`;
      this.loading = false;
    },
  },
  created() {
    this.loadProjectData();
    const routes = this.$route.path.split('/');
    if (routes.includes('overview')) {
      this.currentRoute = 'overview';
    } else if (routes.includes('bugs-errors')) {
      this.currentRoute = 'bugs-errors';
    } else {
      this.currentRoute = 'setting';
    }
  },
});
</script>

<style lang="scss" scoped>
.project-detail,
.project-detail-container {
  @apply h-full;
}
.project-detail-container {
  @apply h-full;
  @apply flex;
  @apply flex-col;
}
.project-detail-appname {
  @apply bg-white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  padding-left: 16px;
}
.project-detail-appname .project-detail-appname-text {
  @apply text-primary;
  font-weight: 600;
  font-size: 18px;
  line-height: 56px;
}
.project-detail-subroutes {
  padding: 16px;
}
.project-detail-subroutes ul {
  display: flex;
  cursor: pointer;
}
.project-detail-subroutes ul li {
  @apply bg-white;
  width: 160px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 50px;
  margin-right: 30px;
}
.project-detail-subroutes ul li:hover {
  @apply bg-hover;
  p {
    @apply text-white;
  }
}
.project-detail-subroutes ul li p {
  @apply text-primary;
  font-weight: 600;
  font-size: 14px;
  line-height: 32px;
}
.project-detail-content {
  @apply bg-white;
  @apply flex-grow;
  border-radius: 5px;
  margin: 0px 16px 16px 16px;
  overflow: hidden;
}
.router-link-active {
  @apply border-primary;
  border-width: 1px;
}
.project-detail-subroutes ul .selectedContainer {
  @apply border;
  @apply border-primary
}
</style>
