<template>
  <div class="h-screen overflow-hidden">
    <NavBar />
    <div class="body-container py-10" style="overflow: auto; display: block;">
      <div class="max-w-6xl mx-auto">
        <p class="text-content">Getting started</p>
        <p class="text-header">1. Logging-in using your Google or GitHub account</p>
        <img src="../../../assets/images/document_1.png" />
        <p class="text-header">2. Click the plus icon right next to "Projects"</p>
        <p class="text-header">3. Enter project's information</p>
        <img src="../../../assets/images/document_2.png" />
        <p class="text-header">4. Setup project</p>
        <p class="text-sub-header">a. Embed our BTS SDK on your website</p>
        <div style="padding-left: 15px; padding-right: 15px">
          <div class="code-field">
            <code class="bg-black">
              &lt;script src="https://bts-backend.herokuapp.com/api/script"
              &gt;&lt;/script&gt;
            </code>
          </div>
        </div>
        <p class="text-sub-header">b. Init our SDK as soon as possible</p>
        <div style="padding-left: 15px; padding-right: 15px">
          <div class="code-field">
            <code class="bg-black">
              BTS.init({ key="Your-API-Key" });
            </code>
          </div>
        </div>
        <p class="text-paragraph">*To get your API key, visit the configuration setting page</p>
        <img src="../../../assets/images/document_3.png" />
        <p class="text-content mt-10">Settings</p>
        <p class="text-header">Invite collaborator</p>
        <p class="text-paragraph">
          You can invite your teammates to the project via email, or remove them in collaborator
          setting
        </p>
        <img src="../../../assets/images/document_4.png" />
        <p class="text-header">Configuration</p>
        <p class="text-paragraph">
          In the configuration setting, you can see your project's name, domain, and API key. You
          need to update the domain if your website's domain has changed.<br /><br />You can also
          update your API key if necessary. don't forget to update the corresponding API key setting
          in your website.<br /><br />Or hit the remove project button to destroy your project.
        </p>
        <img src="../../../assets/images/document_5.png" />
        <p class="text-header">Notification</p>
        <p class="text-paragraph">
          Behind The Scene supports your receiving notification about errors, currently via Email,
          Slack, and Telegram. Other platforms will be supported later.
        </p>
        <img src="../../../assets/images/document_6.png" />
        <p class="text-header">Payment</p>
        <p class="text-paragraph">
          You are allowed to use the FREE plan within 500 errors, if there is more error, you had to
          subscribe to our premium plan to see more bugs.
        </p>
        <img src="../../../assets/images/document_7.png" />
        <p class="text-center mt-8 text-3xl font-bold text-primary">Happy Coding!!!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from '../../LandingPage/components/NavBar.vue';

export default Vue.extend({
  name: 'DocumentPage',
  components: {
    NavBar,
  },
});
</script>

<style lang="scss" scoped>
.body-container {
  @media only screen {
    height: calc(100% - 80px);
  }
}
.text-content {
  @apply text-3xl;
  @apply mb-4;
  @apply font-bold;
  @apply text-primary;
}
.text-header {
  @apply text-xl;
  @apply my-4;
  @apply font-semibold;
}
.text-sub-header {
  text-indent: 15px;
}
.code-field {
  width: 100%;
  @apply bg-bgcode;
  padding: 6px 8px;
  border-radius: 4px;
  @apply my-5;
}
.text-paragraph {
  @apply pb-3;
}
</style>
