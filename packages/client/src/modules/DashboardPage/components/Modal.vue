<template>
  <div
    id="modal"
    class="modal"
    :class="{ 'modal-shown': isShown }"
    @click.self="hideModal"
  >
    <!-- Modal content -->
    <div class="modal-content">
      <p class="modal-title">{{ title }}</p>
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'modal',
  props: {
    title: {
      type: String,
      default: 'Modal Title',
    },
    isShown: {
      type: Boolean,
      default: false,
    },
    hideModal: {
      type: Function,
      default: () => {
        console.log('');
      },
    },
  },
});
</script>

<style>
/* The Modal (background) */
.modal {
  visibility: hidden;
  opacity: 0;
  transition: all 0.125s linear;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  border-radius: 4px;
  padding: 24px;
  margin: 15% auto; /* 15% from the top and centered */
  width: 50%; /* Could be more or less, depending on screen size */
}

.modal-title {
  @apply text-primary;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 16px;
}

.modal-shown {
  visibility: visible;
  opacity: 1;
}
</style>
