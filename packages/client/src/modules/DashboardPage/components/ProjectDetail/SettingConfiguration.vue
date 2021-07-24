<template>
  <div id="setting-configuration" class="setting-content-wrapper">
    <p class="setting-content-title">Configuration</p>
    <div class="text-field-long">
      <p class="text-field-caption">Project Name</p>
      <p class="text-field-value">{{ projectName }}</p>
    </div>
    <div class="text-field-long">
      <p class="text-field-caption">Domain</p>
      <div class="input-group items-center">
        <input
          placeholder="www.production.your-website.com"
          ref="domainInput"
          class="text-field-value"
          style="width: 100%; margin-top: 0"
          v-model="currentDomain"
          :disabled="!owner"
        />
        <button v-if="owner" @click="onUpdateDomain">Update</button>
      </div>
    </div>
    <div class="text-field-short">
      <p class="text-field-caption">API Token</p>
      <div class="items-center">
        <input readonly id="apiKey" class="text-field-value" :value="apiToken" />
        <button @click="copyToClipboard">Copy</button>
        <button v-if="owner" @click="onRegenerateAPIToken" class="text-red-500 bg-white">
          Regenerate
        </button>
      </div>
    </div>
    <p class="text-caption">Integrate to your frontend app</p>
    <div class="code-field">
      <p class="code-field-caption">Embed our Behind The Scene SDK</p>
      <div class="code-field-value">
        <code>{{ embedScript }}</code>
      </div>
    </div>
    <div class="code-field">
      <p class="code-field-caption">Init our SDK as soon as possible</p>
      <div class="code-field-value">
        <code><span v-html="initCode"></span></code>
      </div>
    </div>
    <button
      v-if="owner"
      @click="toggleConfirmModal"
      class="text-red-500 border-red-500 border bg-white mt-12 ml-0"
    >
      Remove project
    </button>
    <transition name="fade">
      <div v-show="isUpdateDomainSuccess" class="collaborator-invitation-notify">
        <p>Update successfully</p>
      </div>
    </transition>
    <modal :isShown="isConfirmModalShown" title="Confirm" :hideModal="toggleConfirmModal">
      <div class="modal-main-content">
        <div>
          <p>Are you sure that you want to delete this project?</p>
        </div>
        <div class="buttons">
          <div />
          <div>
            <button @click="confirmDelete">Accept</button>
            <button @click="toggleConfirmModal">Cancel</button>
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
        <div>
          <p>Invalid domain</p>
        </div>
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
import { getSession } from '../../../../utils/session';
import apiService from '../../../../utils/apiService';

export default Vue.extend({
  components: {
    Modal,
  },
  name: 'SettingConfiguration',
  data() {
    return {
      projectName: '',
      domain: '',
      currentDomain: '',
      apiToken: '',
      embedScript: '\x3Cscript src="https://bts-backend.herokuapp.com/api/script">\x3C/script>',
      owner: false,
      isConfirmModalShown: false,
      isErrorModalShown: false,
      isFetching: false,
      isUpdateDomainSuccess: false,
    };
  },
  created() {
    const { currentProject } = this.$store.state;
    const {
      name,
      domain,
      apiKey,
      owner,
    } = currentProject;
    const { _id } = getSession();
    this.projectName = name;
    this.domain = domain;
    this.currentDomain = domain;
    this.apiToken = apiKey;
    this.owner = owner === _id;
  },
  methods: {
    async onDelete() {
      await apiService.delete(`/api/projects/${this.$route.params.id}`);
      this.$router.push({ name: 'dashboard' });
      this.$router.go(0);
    },
    toggleConfirmModal() {
      this.isConfirmModalShown = !this.isConfirmModalShown;
    },
    toggleErrorModal() {
      this.isErrorModalShown = !this.isErrorModalShown;
    },
    confirmDelete() {
      this.onDelete();
      this.toggleConfirmModal();
    },
    copyToClipboard() {
      const apiKey = document.querySelector('#apiKey') as HTMLInputElement;
      apiKey.select();
      document.execCommand('copy');
    },
    async onRegenerateAPIToken() {
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;
      const result = await apiService.patch(`/api/projects/${this.$route.params.id}/api-key`, {});
      const { data } = result;
      const { apiKey } = data;
      this.apiToken = apiKey;
      this.$store.commit('updateCurrentProjectApiKey', apiKey);
      this.isFetching = false;
    },
    async onUpdateDomain() {
    // const isDomainOnly = /^www\.(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9]{0,10}[^/]$/i;

      if (this.currentDomain === this.domain) {
        return;
      }

      // if (!isDomainOnly.test(this.currentDomain)) {
      //   this.toggleErrorModal();
      //   return;
      // }

      this.domain = this.currentDomain;
      await apiService.patch(`/api/projects/${this.$route.params.id}/domain`, {
        domain: this.currentDomain,
      });
      this.$store.commit('updateCurrentProjectDomain', this.currentDomain);
      this.isUpdateDomainSuccess = true;
      setTimeout(() => {
        this.isUpdateDomainSuccess = false;
      }, 2000);
    },
  },
  computed: {
    initCode(): string {
      return `<span><span style="color: #F286C4">BTS</span>.<span style="color: #62E884">init</span>({ key<span style="color: #F286C4">=</span><span style="color: #FFF4C5">"${this.apiToken}"</span> });</span>`;
    },
  },
});
</script>

<style lang="scss" scoped>
.text-field-long {
  margin-bottom: 16px;
}
.text-field-short {
  margin-bottom: 16px;
}
.text-field-long .text-field-caption,
.text-field-short .text-field-caption,
.text-caption {
  @apply text-primary;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
}
.text-field-long .text-field-value,
.text-field-short .text-field-value {
  margin-top: 6px;
  background: rgba(33, 77, 113, 0.25);
  border-radius: 4px;
  font-size: 13px;
  line-height: 32px;
  padding-left: 8px;
}
.code-field .code-field-caption {
  @apply text-primary;
  margin-top: 8px;
  font-size: 13px;
  line-height: 23px;
  margin-bottom: 8px;
}
.code-field .code-field-value {
  width: 100%;
  @apply bg-bgcode;
  padding: 6px 8px;
  border-radius: 4px;
}
.modal-main-content {
  pointer-events: unset;
  .buttons {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    button {
      padding: 8px 36px;
    }
  }
}
.input-group {
  width: 100%;
  display: flex;
  margin-top: 6px;
}
.collaborator-invitation-notify {
  @apply bg-primary;
  @apply text-white;
  position: absolute;
  bottom: 10px;
  right: 7px;
  font-size: 14px;
  line-height: 19px;
  padding: 8px 26px;
  border-radius: 4px;
}
</style>
