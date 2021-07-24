<template>
  <div class="sb-user-info-container">
    <img class="sb-user-info-avatar" v-bind:src="avatarUrl" />
    <div class="sb-user-info-text">
      <p class="sb-user-info-fullname">{{ userFullname }}</p>
      <p class="sb-user-info-email">{{ userEmail }}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

/**
 * @param {string} avatarUrl - Url to avatar image
 * @param {string} userFullname - Full name of current user
 * @param {string} userEmail - Email of current user
 */

export default Vue.extend({
  name: 'SideBarUserInfo',
  props: ['avatarUrl', 'userFullname', 'userEmail'],
});
</script>

<style scoped>
.sb-user-info-container {
  display: flex;
  padding: 16px 0px;
}
.sb-user-info-text {
  padding-left: 8px;
}
.sb-user-info-avatar {
  width: 42px;
  height: 42px;
}
.sb-user-info-fullname {
  @apply text-primarytext;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
}
.sb-user-info-email {
  @apply text-secondarytext;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  padding-top: 10px;
}
</style>
