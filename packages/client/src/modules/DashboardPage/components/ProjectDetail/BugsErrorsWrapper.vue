<template>
  <div id="bugs-errors" class="bugs-errors">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BugsErrorsWrapper',
  data() {
    return {
      errors: [
        {
          id: '65b17f9ffcef4ddc8638aeb72697a612',
          errorType: 'Type Error',
          errorMessage: "Cannot read property 'table_fields' of undefined",
          url: 'URL: https://www.google.com.vn/search/page/okeelel',
          stack: '',
          occuredTime: '23:50 - Jan 12, 2021',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        },
        {
          id: '65b17f9ffcef4ddc8638aeb72697a612',
          errorType: 'Type Error',
          errorMessage: "Cannot read property 'table_fields' of undefined",
          url: 'URL: https://www.google.com.vn/search/page/okeelel',
          stack: '',
          occuredTime: '23:50 - Jan 12, 2021',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        },
        {
          id: '65b17f9ffcef4ddc8638aeb72697a612',
          errorType: 'Type Error',
          errorMessage: "Cannot read property 'table_fields' of undefined",
          url: 'URL: https://www.google.com.vn/search/page/okeelel',
          stack: '',
          occuredTime: '23:50 - Jan 12, 2021',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.bugs-errors {
  height: 100%;
}
</style>
