<template>
  <div id="app">
    <router-view/>
    <div class="bg-blue-200">A</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'A',
});
</script>
