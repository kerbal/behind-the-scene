<template>
  <div id="setting-notification" class="setting-content-wrapper">
    <p class="setting-content-title">Notification</p>
    <ul class="setting-content-services">
      <li>
        <div>
          <img src="../../../../assets/images/Envelop_icon.svg" alt="icon-email" />
          <p>Send error notification to <b>Email</b></p>
        </div>
        <div>
          <button v-if="isEmailEnabled" class="bg-success enabled" @click="toggleEmail">On</button>
          <button v-else class="enabled" @click="toggleEmail">Off</button>
        </div>
      </li>
      <li>
        <div>
          <img src="../../../../assets/images/Slack_icon.svg" alt="icon-slack" />
          <p>Send error notification to <b>Slack</b> (Coming soon)</p>
        </div>
        <div>
          <button v-if="!isSlackEnabled" class="enabled bg-gray-400">
            Connect Slack
          </button>
          <div class="service-enabled" v-if="isSlackEnabled">
            <p>thesims.slack.com</p>
            <button @click="turnOffSlack">Disconnect</button>
          </div>
        </div>
      </li>
      <li>
        <div>
          <img src="../../../../assets/images/Telegram_icon.svg" alt="icon-telegram" />
          <p>Send error notification to <b>Telegram</b></p>
        </div>
        <div>
          <button v-if="!isTelegramEnabled" class="enabled" @click="toggleTelegramModal">
            Connect Telegram
          </button>
          <div class="service-enabled" v-else>
            <p>{{ telegramChatId }}</p>
            <button @click="turnOffTelegram">Disconnect</button>
          </div>
        </div>
      </li>
    </ul>
    <modal
      class="modal-connect-slack"
      :isShown="isSlackModalShown"
      title="Connect to Slack"
      :hideModal="toggleSlackModal"
    >
      <div class="modal-main-content">
        <div class="field">
          <span class="field-caption">Workspace</span>
          <input />
        </div>
        <div class="field">
          <span class="field-caption">Channel</span>
          <input />
        </div>
        <div class="buttons">
          <div />
          <div>
            <button>OK</button>
            <button class="bg-error" @click="toggleSlackModal">Cancel</button>
          </div>
        </div>
      </div>
    </modal>
    <modal
      :isShown="isTelegamModalShown"
      title="Connect to Telegram"
      :hideModal="toggleTelegramModal"
    >
      <div class="modal-main-content">
        <div class="field">
          <span class="field-caption">Chat ID</span>
          <input ref="telegramChatId" />
        </div>
        <div class="buttons">
          <div />
          <div>
            <button @click="onSubmitTelegram">OK</button>
            <button class="bg-error" @click="toggleTelegramModal">Cancel</button>
          </div>
        </div>
      </div>
    </modal>
    <modal
      :isShown="isErrorModalShown"
      title="Error"
      :hideModal="toggleErrorModal"
    >
      <div class="modal-main-content">
        <span class="field-caption">Invalid Telegram ID</span>
        <div class="buttons">
          <div />
          <div>
            <button @click="toggleErrorModal">OK</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '../Modal.vue';
import apiService from '../../../../utils/apiService';

export default Vue.extend({
  components: { Modal },
  name: 'SettingNotification',
  methods: {
    toggleSlackModal() {
      this.isSlackModalShown = !this.isSlackModalShown;
    },
    toggleTelegramModal() {
      this.isTelegamModalShown = !this.isTelegamModalShown;
    },
    toggleErrorModal() {
      this.isErrorModalShown = !this.isErrorModalShown;
    },
    turnOffSlack() {
      this.isSlackEnabled = false;
    },
    async turnOffTelegram() {
      const result = await apiService.delete(`/api/projects/${this.$route.params.id}/telegram`);

      const { data } = result;
      if (data !== 'Updated') {
        return;
      }

      this.$store.commit('updateCurrentProjectTelegram', '');
      this.telegramChatId = '';
    },
    toggleEmail() {
      this.isEmailEnabled = !this.isEmailEnabled;
    },
    async onSubmitTelegram() {
      const input = (this.$refs.telegramChatId as HTMLInputElement).value;
      if (!input) {
        return;
      }

      this.toggleTelegramModal();
      try {
        const result = await apiService.patch(`/api/projects/${this.$route.params.id}/telegram`, {
          telegramChatId: input,
        });
        const { data } = result;
        console.log('result', result);
        if (data !== 'Updated') {
          return;
        }
        this.$store.commit('updateCurrentProjectTelegram', input);
        this.telegramChatId = input;
      } catch (e) {
        console.log('error', e.response);
        if (e.response.status === 400) {
          this.toggleErrorModal();
        }
      }
    },
  },
  data() {
    return {
      isEmailEnabled: true,
      isSlackModalShown: false,
      isTelegamModalShown: false,
      telegramChatId: '',
      slackUrl: '',
      isErrorModalShown: false,
    };
  },
  computed: {
    isTelegramEnabled(): boolean {
      return !!this.telegramChatId;
    },
    isSlackEnabled(): boolean {
      return !!this.slackUrl;
    },
  },
  created() {
    const { telegramChatId } = this.$store.state.currentProject;
    this.telegramChatId = telegramChatId;
  },
});
</script>

<style lang="scss" scoped>
.setting-content-services li {
  @apply text-primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 19px;
  padding-bottom: 16px;
}
.setting-content-services div {
  display: flex;
}
.setting-content-services div p {
  margin-left: 8px;
}
.setting-content-services div img {
  width: 18px;
  height: 18px;
}
.modal-main-content {
  pointer-events: unset;
  .field {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .field-caption {
    @apply text-primary;
    width: 105px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
  }
  input {
    flex-grow: 1;
    margin-top: 6px;
    background: rgba(33, 77, 113, 0.25);
    border-radius: 4px;
    font-size: 13px;
    line-height: 32px;
    padding-left: 8px;
  }
  .buttons {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    button {
      padding: 8px 36px;
    }
  }
}
.service-enabled {
  display: flex;
  align-items: center;
}
.service-enabled button {
  @apply bg-error;
  margin-left: 16px;
}
.service-enabled .indicator-enabled {
  @apply bg-success;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
}
.enabled {
  width: 150px;
}
</style>
