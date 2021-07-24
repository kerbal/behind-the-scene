<template>
  <div v-if="!isLoading" id="bugs-errors-detail" class="bugs-errors-detail">
    <div class="return-button" @click="onBack">
      <img src="../../../../assets/images/Arrow_left.svg" />
      <p>All bugs & errors</p>
    </div>
    <div class="bug-detail-title bug-detail-section">
      <p class="bug-detail-title-errorType">{{ errorDetail.name }}</p>
      <p class="bug-detail-title-errorMessage">
        {{ errorDetail.message }}
      </p>
    </div>
    <div class="bug-detail-description bug-detail-section flex row justify-between">
      <span>
        <p class="bug-detail-id"><b>ID:</b> {{ errorDetail._id }}</p>
        <p class="bug-detail-time"><b>Time:</b> {{ formatDate(errorDetail.createdAt) }}</p>
      </span>
      <span style="display: flex; flex-direction: row; align-items: center;">
        <img :src="getBrowserIcon(errorDetail.browserName)" class="mr-2" width="40" height="40" />
        <span>
          <p>
            <b>{{ errorDetail.browserName }}</b>
          </p>
          <p><b>Version:</b> {{ errorDetail.browserVersion }}</p>
        </span>
      </span>
      <span class="mr-16" style="display: flex; flex-direction: row; align-items: center;">
        <img
          :src="
            require(`../../../../assets/images/${OSImage}.png`)
          "
          class="mr-2"
          width="40"
          height="40"
        />
        <span>
          <p>
            <b>{{ errorDetail.osName }}</b>
          </p>
          <p><b>Version:</b> {{ errorDetail.osVersion }}</p>
        </span>
      </span>
    </div>
    <div class="bug-detail-section">
      <p class="bug-detail-url">
        <b>URL:</b> <a>{{ errorDetail.source }}</a>
      </p>
    </div>
    <div class="bug-detail-section">
      <div class="bug-detail-stack">
        <p class="whitespace-pre">
          {{ errorDetail.stack }}
        </p>
      </div>
    </div>
    <div class="bug-detail-browser bug-detail-section">
      <div class="section-title">Browser detail</div>
      <div class="section-detail-pair">
        <div class="section-detail-pair-key">Name</div>
        <div class="section-detail-pair-value">{{ errorDetail.browserName }}</div>
      </div>
      <div class="section-detail-pair">
        <div class="section-detail-pair-key">Version</div>
        <div class="section-detail-pair-value">{{ errorDetail.browserVersion }}</div>
      </div>
    </div>
    <div class="bug-detail-operating-system bug-detail-section">
      <div class="section-title">Operating system detail</div>
      <div class="section-detail-pair">
        <div class="section-detail-pair-key">Name</div>
        <div class="section-detail-pair-value">{{ errorDetail.osName }}</div>
      </div>
      <div class="section-detail-pair">
        <div class="section-detail-pair-key">Version</div>
        <div class="section-detail-pair-value">{{ errorDetail.osVersion }}</div>
      </div>
    </div>
    <div class="bug-detail-section bug-detail-device">
      <div class="section-title">Device detail</div>
      <div class="section-detail-pair">
        <div class="section-detail-pair-key">Name</div>
        <div class="section-detail-pair-value">
          {{ errorDetail.deviceName }}
        </div>
      </div>
      <div class="section-detail-pair">
        <div class="section-detail-pair-key">Model</div>
        <div class="section-detail-pair-value">
          {{ errorDetail.deviceModel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import apiService from '../../../../utils/apiService';

export default Vue.extend({
  name: 'BugsErrorsDetail',
  computed: {
    currentBugId(): string {
      return this.$route.params.bugId;
    },
    OSImage(): string {
      return this.errorDetail.osName.toLowerCase() === 'windows'
        ? `${this.errorDetail.osName.toLowerCase()} ${this.errorDetail.osVersion}`
        : this.errorDetail.osName.toLowerCase();
    },
  },
  data() {
    return {
      errorDetail: {
        osName: '',
        osVersion: '',
      },
      isLoading: false,
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    formatDate(date: string) {
      return moment(date).format('hh:mm - MMM DD, YYYY');
    },
    getBrowserIcon(browserName: string) {
      return `https://cdnjs.cloudflare.com/ajax/libs/browser-logos/69.0.4/${browserName.toLowerCase()}/${browserName.toLowerCase()}_48x48.png`;
    },
  },
  async created() {
    this.isLoading = true;
    const result = await apiService.get(
      `/api/projects/${this.$route.params.id}/errors/${this.$route.params.bugId}`,
    );
    const { data } = result;
    this.errorDetail = data;
    this.isLoading = false;
  },
});
</script>

<style lang="scss" scoped>
.bugs-errors-detail {
  @apply text-primary;
  padding: 24px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;
}
.return-button {
  display: flex;
  cursor: pointer;
  p {
    padding-left: 8px;
  }
}
.bug-detail-section {
  padding: 16px 0px;
  border-bottom: 1px solid rgba(33, 77, 113, 0.25);
  .section-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 16px;
  }
  .section-detail-pair {
    display: flex;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 8px;
    align-items: center;
  }
  .section-detail-pair-key {
    width: 60px;
  }
  .section-detail-pair-value {
    display: flex;
    align-items: center;
    margin-left: 30px;
    background: rgba(33, 77, 113, 0.1);
    border-radius: 4px;
    flex-grow: 1;
    padding: 4px 8px;
    p {
      padding-left: 8px;
    }
  }
}
.bug-detail-title-errorType {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}
.bug-detail-title-errorMessage {
  font-size: 14px;
  line-height: 19px;
  margin-top: 16px;
}
a {
  text-decoration: underline;
}
.bug-detail-stack {
  height: 215px;
  overflow: auto;
  padding: 16px;
  background-color: #fff0f0;
  font-size: 14px;
  line-height: 19px;
  color: #da4a54;
  border-radius: 4px;
  li {
    padding-left: 16px;
  }
  li:first-child {
    padding-left: 0px;
  }
}
.bug-detail-device {
  border-bottom: 0px;
}
</style>
