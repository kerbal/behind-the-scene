<template>
  <div class="screen w-full h-screen flex justify-center items-center">
    <div class="bg-white w-6/12 rounded p-6">
      <p>{{ message }}</p>
      <div class="buttons">
        <div />
        <div>
          <button @click="onAccept">Accept</button>
          <button class="bg-error" @click="onReject">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import apiService from '../../../utils/apiService';

export default Vue.extend({
  name: 'modal',
  data() {
    return {
      message: '',
    };
  },
  async created() {
    try {
      const { invitationId } = this.$route.params;
      const { email } = this.$route.query;
      const result = await apiService.get(`/api/invitations/${invitationId}?email=${email}`);
      const { data } = result;
      this.message = `You have been invited to join ${data.project.name}. Would you like to accept the invitation?`;
    } catch (e) {
      this.$router.push({ name: 'dashboard' });
    }
  },
  methods: {
    async onAccept() {
      const { invitationId } = this.$route.params;
      const { email } = this.$route.query;
      await apiService.patch(`/api/invitations/${invitationId}`, {
        status: 'ACCEPTED',
        email,
      });
      this.$router.push({ name: 'dashboard' });
    },
    async onReject() {
      const { invitationId } = this.$route.params;
      const { email } = this.$route.query;
      await apiService.patch(`/api/invitations/${invitationId}`, {
        status: 'REJECT',
        email,
      });
      this.$router.push({ name: 'dashboard' });
    },
  },
});
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  button {
    padding: 8px 20px;
  }
}
.screen {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
