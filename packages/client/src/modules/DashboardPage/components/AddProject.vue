<template>
  <div class="h-full px-4 pt-4">
    <div class="bg-white h-full align-center pt-6">
      <div class="form-container m-auto text-primary">
        <p class="font-semibold text-lg mb-6">Create New Project</p>
        <form v-on:submit.prevent="onSubmit">
          <p class="font-semibold text-sm">Project name *</p>
          <input placeholder="Project name" ref="InputName" required/>
          <p class="font-light text-sm italic mb-6">Project name can not be changed later</p>
          <p class="font-semibold text-sm">Project domain</p>
          <input placeholder="https://www.production.your-website.com" ref="InputUrl"/>
          <p class="font-light text-sm italic mb-10">Domain can be changed later</p>
          <button class="ml-auto w-40 font-semibold text-sm rounded-full">Confirm</button>
        </form>
      </div>
    </div>
    <modal
      :isShown="isErrorModalShown"
      title="Error"
      :hideModal="toggleErrorModal"
    >
      <div class="modal-main-content">
        <div>
          <p>Http:// or Https:// must not be included</p>
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
import Modal from './Modal.vue';
import apiService from '../../../utils/apiService';

export default Vue.extend({
  components: {
    Modal,
  },
  name: 'AddProduct',
  methods: {
    async onSubmit() {
      const projectName = (this.$refs.InputName as HTMLInputElement).value;
      const projectDomain = (this.$refs.InputUrl as HTMLInputElement).value.toString();

      // if (projectDomain.includes('http://') || projectDomain.includes('https://')) {
      //   this.toggleErrorModal();
      //   return;
      // }

      const result = await apiService.post('/api/projects', {
        name: projectName,
        domain: projectDomain,
      });
      const { data } = result;
      const { _id } = data;
      this.$router.push({ path: `/dashboard/project-detail/${_id}` });
      this.$router.go(0);
    },
    toggleErrorModal() {
      this.isErrorModalShown = !this.isErrorModalShown;
    },
  },
  data() {
    return {
      isErrorModalShown: false,
    };
  },
});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column
}
form input {
  @apply text-placeholdertext;
  flex-grow: 1;
  border: 1px solid rgba(33, 77, 113, 0.5);
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 19px;
  padding: 6px 8px;
  @apply mt-2;
  @apply mb-1;
}
.form-container {
  max-width: 729px;
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
</style>
