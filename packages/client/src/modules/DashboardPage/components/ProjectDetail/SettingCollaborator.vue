<template>
  <div id="setting-collaboration" class="setting-content-wrapper">
    <p class="setting-content-title">Collaborator</p>
    <div v-if="isOwner" class="input-group">
      <input ref="emailInput" placeholder="Add a user by email address" />
      <button @click="onInvite">Invite</button>
    </div>
    <ul>
      <li>
        <div class="collaborator-info">
          <p class="collaborator-name">{{ ownerData.displayName }}</p>
          <p class="collaborator-email">
            {{ ownerData.email }}
          </p>
        </div>
        <div class="collaborator-actions">
          <div class="collaborator-role">
            Owner
          </div>
        </div>
      </li>
      <li v-for="collaborator in collaborators" :key="collaborator._id">
        <div class="collaborator-info">
          <p class="collaborator-name">{{ collaborator.displayName }}</p>
          <p class="collaborator-email">
            {{ collaborator.email }}
          </p>
        </div>
        <div class="collaborator-actions">
          <div class="collaborator-role">
            Collaborator
          </div>
          <img
            v-if="isOwner"
            @click="toggleDeleteModal(collaborator)"
            class="collaborator-remove cursor-pointer"
            src="../../../../assets/images/Remove_icon.svg"
          />
        </div>
      </li>
    </ul>
    <transition name="fade">
      <div v-show="isInvitationSent" class="collaborator-invitation-notify">
        <p>Invitation sent</p>
      </div>
    </transition>
    <modal :isShown="isErrorModalShown" title="Error" :hideModal="toggleErrorModal">
      <div class="modal-main-content">
        <div>
          <p>Invalid email</p>
        </div>
        <div class="buttons">
          <div />
          <div>
            <button @click="toggleErrorModal">OK</button>
          </div>
        </div>
      </div>
    </modal>
    <modal :isShown="isDeleteModalShown" title="Delete" :hideModal="toggleDeleteModal">
      <div class="modal-main-content">
        <div>
          <p>Are you sure you want to delete {{ selectedMember.displayName }} from project?</p>
        </div>
        <div class="buttons">
          <div />
          <div>
            <button class="bg-error" @click="onAcceptDelete">Yes</button>
            <button @click="onCancelDelete">Cancel</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Modal from '../Modal.vue';
import config from '../../../../config';
import apiService from '../../../../utils/apiService';
import { getSession } from '../../../../utils/session';

/**
 * @param {array} collaborators - List of collaborators in current project
 * @param {boolean} isInvitationSent
 * - Check if "Invitation sent" element at the bottom right corner should be displayed
 */

interface Collaborator {
  createdAt: string;
  displayName: string;
  email: string;
  githubId: string;
  googleId: string;
  projects: Array<object>;
  updatedAt: string;
  _v: number;
  _id: string;
}

export default Vue.extend({
  name: 'SettingCollaborator',
  components: {
    Modal,
  },
  data() {
    return {
      collaborators: [] as Array<Collaborator>,
      ownerData: {} as Collaborator,
      selectedMember: {} as Collaborator,
      isInvitationSent: false,
      isErrorModalShown: false,
      isDeleteModalShown: false,
      isInviting: false,
      isOwner: false,
    };
  },
  methods: {
    async onInvite() {
      if (this.isInviting) {
        return;
      }
      this.isInviting = true;
      const isEmail = /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,3})$/g;
      const input = (this.$refs.emailInput as HTMLInputElement).value;

      if (!isEmail.test(input)) {
        this.toggleErrorModal();
        this.isInviting = false;
        return;
      }

      const isExist = this.collaborators.some((x) => x.email === input);

      if (isExist || this.ownerData.email === input) {
        this.toggleErrorModal();
        this.isInviting = false;
        return;
      }

      const inviteResult = await apiService.post(
        `/api/projects/${this.$route.params.id}/invitations`,
        {
          email: input,
        },
      );
      this.isInviting = false;
      if (inviteResult.data !== 'Invited') {
        return;
      }
      (this.$refs.emailInput as HTMLInputElement).value = '';
      this.isInvitationSent = true;
      setTimeout(() => {
        this.isInvitationSent = false;
      }, 2000);
    },
    toggleErrorModal() {
      this.isErrorModalShown = !this.isErrorModalShown;
    },
    toggleDeleteModal(member: object) {
      this.selectedMember = member as Collaborator;
      this.isDeleteModalShown = !this.isDeleteModalShown;
    },
    onCancelDelete() {
      this.isDeleteModalShown = false;
      this.selectedMember = {} as Collaborator;
    },
    onAcceptDelete() {
      this.isDeleteModalShown = false;
      const _id = this.selectedMember?._id;
      this.onRemoveMember(_id);
      this.collaborators = this.collaborators.filter((collaborator) => {
        const { _id: userId } = collaborator;
        return userId !== _id;
      });
      this.selectedMember = {} as Collaborator;
    },
    async onRemoveMember(memberId: string) {
      await apiService.delete(`/api/projects/${this.$route.params.id}/members/${memberId}`);
    },
  },
  async created() {
    const user = getSession();
    const { _id } = user;
    this.isOwner = this.$store.state.currentProject.owner === _id;

    const result = await apiService.get(`/api/projects/${this.$route.params.id}/members`);
    const { data } = result;
    const { members = [], owner = {} } = data;
    this.collaborators = members;
    this.ownerData = owner;
  },
});
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;
  display: flex;
  margin-bottom: 24px;
}
.input-group input {
  @apply text-placeholdertext;
  flex-grow: 1;
  border: 1px solid rgba(33, 77, 113, 0.5);
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 19px;
  padding: 6px 8px;
}
ul {
  width: 100%;
}
ul li {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #4e7693;
  padding: 8px 0px;
}
ul li .collaborator-info .collaborator-name {
  @apply text-primary;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
}
ul li .collaborator-info .collaborator-email {
  @apply text-placeholdertext;
  font-size: 13px;
  line-height: 18px;
}
ul li .collaborator-actions {
  display: flex;
}
ul li .collaborator-actions .collaborator-role {
  @apply bg-primary;
  @apply text-white;
  font-size: 13px;
  line-height: 34px;
  border-radius: 4px;
  padding: 0px 16px;
}
ul li .collaborator-actions .collaborator-remove {
  margin-left: 37px;
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
.fade-leave-active {
  transition: opacity 0.5s;
}
.setting-content-wrapper {
  overflow: auto;
  height: 100%;
  padding: 24px;
}
</style>
