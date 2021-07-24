<template>
  <div class="bg-primary lg:h-screen">
    <NavBar />
    <div class="max-w-7xl mx-auto px-2 flex items-center body-container">
      <div
        class="flex items-center flex-col lg:flex-row flex-1 justify-between lg:-mt-28 mt-0"
      >
        <div class="max-w-xl pr-0 lg:pr-10 text-white">
          <div
            class="content-title px-6; lg:px-0 lg:pr-10 text-center lg:text-left lg:mt-0"
          >
            Working Code, Happy Customers
          </div>
          <div
            class="text-2xl mb-6 font-normal text-center lg:text-left px-4 sm:px-0"
          >
            Behind The Scene's application monitoring platform helps every
            developer diagnose, fix, and optimize the performance of their code.
          </div>
          <div
            class="text-2xl font-normal mb-10 text-center lg:text-left px-4 sm:px-0"
          >
            Over 1M developers and 60K organizations already ship better
            software faster with Behind The Scene. Won't you join them?
          </div>
          <div
            ref="OpenLoginBtn"
            v-on:click="toggleLogin"
            v-if="!openLogin"
            class="flex justify-center lg:justify-start"
          >
            <button class="content-get-started-button hover:text-white">
              <span class="text-base lg:text-2xl text-primary"
                >Let's Get Started</span
              >
            </button>
          </div>
        </div>
        <img
          v-if="!openLogin"
          class="lg:mr-16 my-6 lg:mt-0 image"
          alt="Landing Page Image"
          src="../../../assets/images/LandingPage_img.png"
        />
        <div v-else class="login-container lg:my-0 py-10 sm:py-0">
          <span class="text-primary text-4xl mb-16"> Sign in </span>
          <g-signin-button
            class="gg-button hover:text-white"
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            <img
              class="w-12 h-12 mr-4"
              src="../../../assets/images/google_icon.png"
            />
            <span class="text-base lg:text-2xl text-primary"
              >Sign in with Google</span
            >
          </g-signin-button>

          <a :href="githubURL" class="github-button hover:text-white">
            <img
              class="w-12 h-12 mr-4"
              src="../../../assets/images/github-icon.png"
            />
            <span class="text-base lg:text-2xl text-primary"
              >Sign in with GitHub</span
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import NavBar from './NavBar.vue';
import {
  createSession,
  storeRedirectUrl,
  getRedirectUrl,
  getLoginStatus,
} from '../../../utils/session';
import apiService from '../../../utils/apiService';

export default Vue.extend({
  name: 'LandingPage',
  components: {
    NavBar,
  },
  data() {
    return {
      openLogin: false,
      githubURL:
        'https://github.com/login/oauth/authorize?scope=user&client_id=045692baa39a0c14b963',
      googleSignInParams: {
        /* eslint-disable @typescript-eslint/camelcase */
        client_id:
          '17236584994-un7mjnehr7li4b3pkvk2fpket4bpm89n.apps.googleusercontent.com',
      },
    };
  },
  async created() {
    const { query } = this.$route;
    const { openLogin = false, code = '', redirectUrl = '' } = query;
    if (redirectUrl) {
      storeRedirectUrl(redirectUrl as string);
    }
    if (openLogin) {
      this.openLogin = true;
    }
    if (code) {
      const result = await apiService.get('/api/auth/github/token', {
        params: {
          code,
          state: null,
        },
      });
      const { data } = result;
      const userResult = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${data.access_token}`,
        },
      });
      if (userResult.status !== 200) {
        return;
      }
      const { email, id, name } = userResult.data;
      const loginResult = await apiService.post('/api/auth', {
        email,
        githubId: id.toString(),
        displayName: name,
      });
      this.$router.replace('/');

      const { data: loginData } = loginResult;
      this.userInfo(loginData.accessToken);
    }
  },
  methods: {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    async onSignInSuccess(googleUser: any) {
      const profile = googleUser.getBasicProfile();
      const result = await apiService.post('api/auth', {
        email: profile.getEmail(),
        googleId: profile.getId(),
        displayName: profile.getName(),
      });

      const { data } = result;
      this.userInfo(data.accessToken);
    },
    /* eslint-disable @typescript-eslint/no-explicit-any */
    onSignInError(error: any) {
      console.log('error google login', error);
    },
    async userInfo(accessToken: string) {
      window.localStorage.setItem('token', JSON.stringify(accessToken));
      apiService.defaults.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const userInfo = await apiService.get('/api/users/me');
      const { currentUser } = userInfo.data;
      createSession(currentUser);
      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        this.$router.push({ path: redirectUrl });
        return;
      }
      this.$router.push({ name: 'dashboard' });
    },
    toggleLogin() {
      if (getLoginStatus()) {
        this.$router.push({ name: 'dashboard' });
        return;
      }

      this.openLogin = true;
    },
  },
});
</script>

<style scoped lang="scss">
.content-title {
  @apply text-5xl;
  @apply mb-6;
  @apply font-semibold;
  @apply leading-tight;
  @apply mt-6;
}
.content-get-started-button {
  @apply bg-white;
  @apply py-1;
  @apply px-8;
  @apply rounded-full;
}
.content-get-started-button:focus {
  @apply outline-none;
  @apply ring-2;
  @apply ring-offset-2;
  @apply ring-offset-gray-800;
  @apply ring-white;
}
.body-container {
  @media only screen and (min-width: 1024px) {
    height: calc(100% - 80px);
  }
}
.image {
  width: 300px;
  height: 300px;
  @media only screen and (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
}
.login-container {
  @apply bg-white;
  @apply flex;
  @apply flex-col;
  @apply justify-center;
  @apply items-center;
  @apply rounded-lg;
  @apply my-6;
  width: 350px;
  @media only screen and (min-width: 640px) {
    width: 450px;
    height: 400px;
  }
}
.gg-button {
  @apply border-primary;
  @apply block;
  @apply py-3;
  @apply px-4;
  @apply rounded-full;
  @apply flex;
  @apply flex-row;
  @apply items-center;
  @apply mb-8;
  @apply cursor-pointer;
  @apply border-2;
}
.gg-button:focus {
  @apply outline-none;
  @apply ring-2;
  @apply ring-offset-2;
  @apply ring-offset-gray-800;
  @apply ring-white;
}
.github-button {
  @apply border-primary;
  @apply block;
  @apply py-3;
  @apply px-4;
  @apply rounded-full;
  @apply border-2;
  @apply flex;
  @apply flex-row;
  @apply items-center;
}
</style>
