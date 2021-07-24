<template>
  <div id="setting" class="setting">
    <div class="setting-side-panel">
      <ul>
        <router-link
          tag="li"
          v-for="item in sidePanelItems"
          :to="item.path"
          :key="item.id"
        >
          <img :src="item.icon" />
          <p>{{ item.name }}</p>
        </router-link>
        <li>
          <img src="../../../../assets/images/Card_icon.svg" />
          <p>Payment (Coming soon)</p>
        </li>
      </ul>
    </div>
    <div class="setting-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import collaboratorIcon from '../../../../assets/images/Group_icon.svg';
import configurationIcon from '../../../../assets/images/Configuration_icon.svg';
import notificationIcon from '../../../../assets/images/Notification_icon.svg';

/**
 * @param {array} sidePanelItems - List items of side panel
 */

export default Vue.extend({
  name: 'SettingWrapper',
  data() {
    return {
      sidePanelItems: [
        {
          id: 0,
          name: 'Collaborator',
          icon: collaboratorIcon,
          path: 'collaborator',
        },
        {
          id: 1,
          name: 'Configuration',
          icon: configurationIcon,
          path: 'configuration',
        },
        {
          id: 2,
          name: 'Notification',
          icon: notificationIcon,
          path: 'notification',
        },
        // {
        //   id: 3,
        //   name: 'Payment (Coming soon)',
        //   icon: cardIcon,
        //   path: '#',
        // },
      ],
    };
  },
});
</script>

<style lang="scss">
.setting {
  display: flex;
  width: 100%;
  height: 100%;
}
.setting-side-panel {
  width: 255px;
  border-right: 1px solid #e5e5e5;
}
.setting-side-panel ul li {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 12px 24px 12px 24px;
}
.setting-side-panel ul li p {
  @apply text-primary;
  margin-left: 9px;
  font-size: 14px;
  line-height: 19px;
}
.setting-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
.setting-content-wrapper {
  min-width: 634px;
  padding: 0px 16px;
  position: relative;
}
.setting-content-title {
  @apply text-primary;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin: 18px 0px 24px 0px;
}
.router-link-active {
  font-weight: 600;
}
</style>
