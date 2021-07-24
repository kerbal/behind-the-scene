<template>
  <div class="h-screen overflow-hidden">
    <NavBar />
    <div class="body-container py-10 text-primary" style="overflow: auto; display: block;">
      <div class="max-w-6xl mx-auto">
        <section>
          <p class="text-center text-extrabold text-5xl">What is Behind The Scene?</p>
          <p class="text-center text-semibold text-2xl my-8 mx-36">
            Behind The Scene is a platform that helps you track errors on your website. With Behind
            The Scene, you can know where, or when the error happened, so you can fix bugs in time
            and improve your product.
          </p>
          <p class="title-text">With Behind The Scene:</p>
          <div class="grid grid-cols-3 gap-4 text-xl text-semibold">
            <div class="col-item">
              <img src="../../../assets/images/bug.svg" style="width: 30px;" alt="icon-report" />
              <p class="item-text">Capture the error in time.</p>
            </div>
            <div class="col-item">
              <img src="../../../assets/images/report.svg" style="width: 30px;" alt="icon-report" />
              <p class="item-text">Weekly or monthly report on bugs.</p>
            </div>
            <div class="col-item">
              <img
                src="../../../assets/images/notification_bell.svg"
                style="width: 30px;"
                alt="icon-report"
              />
              <p class="item-text">
                Receive notification via Email, Slack, or another workspace platform.
              </p>
            </div>
          </div>
        </section>
        <section>
          <p class="title-text mt-8">How BTS works</p>
          <img src="../../../assets/images/about_1.png" />
        </section>
        <section>
          <p class="title-text mt-2">Members behind the scene</p>
          <div class="grid grid-cols-5 gap-2 text-xl text-semibold">
            <div class="col-item bg-white" v-for="member in members" :key="member.id">
              <p class="item-text text-xl" style="margin-top: 0px">
                <b>{{ member.name }}</b>
              </p>
              <p class="item-text">{{ member.role }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from '../../LandingPage/components/NavBar.vue';

export default Vue.extend({
  name: 'AboutPage',
  components: {
    NavBar,
  },
  data() {
    return {
      members: [
        {
          id: 20424041,
          name: 'Tran Quoc Khanh',
          role: 'Project Manager',
        },
        {
          id: 20424037,
          name: 'Tran Tuan Huy',
          role: 'Back-end developer',
        },
        {
          id: 20424046,
          name: 'Hong Quoc Lam',
          role: 'Front-end developer',
        },
        {
          id: 20424003,
          name: 'Nguyen Viet Anh',
          role: 'DevOps (CI/CD), QC',
        },
        {
          id: 20424043,
          name: 'Ngo Huu Anh Khoa',
          role: 'Business Analyst',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.body-container {
  @media only screen {
    height: calc(100% - 80px);
  }
}
.col-item {
  @apply bg-primary;
  @apply bg-opacity-20;
  @apply rounded-lg;
  @apply flex;
  @apply flex-col;
  @apply items-center;
  @apply p-4;
}
.item-text {
  @apply text-center;
  @apply mt-2;
}
.title-text {
  @apply text-center;
  @apply text-2xl;
  @apply mb-6;
}
</style>
