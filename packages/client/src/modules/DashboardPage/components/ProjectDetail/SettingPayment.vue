<template>
  <div id="setting-payment" class="setting-content-wrapper">
    <p class="setting-content-title">Payment</p>
    <section>
      <div class="py-4 px-6 border ring-1">
        <p class="section-title" style="margin-bottom: 8px; margin-top: 0">Your subscription</p>
        <p class="text-success mb-2">Behind the scene free</p>
        <p class="mb-2">Usage <span class="ml-2 text-error">225/500 errors</span></p>
        <button class="bg-success m-0">
          Subscribe to our premium plan to get unlimited error notification
        </button>
      </div>
    </section>
    <section>
      <p class="section-title">History</p>
      <table class="table-fixed w-full">
        <tbody>
          <tr
            v-for="transaction in transactionHistory"
            :key="transaction.id"
            class="border-b-2 border-black"
          >
            <td width="50%" class="text-success">{{ transaction.planName }}</td>
            <td class="text-right">{{ transaction.validPeriod }}</td>
            <td width="20%" class="text-error text-right">
              {{ formatPrice(transaction.price) }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SettingPayment',
  data() {
    return {
      isPremium: false,
      errorNotificationsCount: 255,
      transactionHistory: [
        {
          id: 0,
          planName: 'Behind the scene Premium',
          validPeriod: '01/03/2021 - 31/03/2021',
          price: 59000,
        },
        {
          id: 1,
          planName: 'Behind the scene Premium',
          validPeriod: '01/02/2021 - 28/02/2021',
          price: 59000,
        },
      ],
    };
  },
  methods: {
    formatPrice(number: number) {
      return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ`;
    },
  },
});
</script>

<style lang="scss" scoped>
section .section-title {
  @apply text-primary;
  margin: 16px 0px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 600;
}
.payment-warning {
  display: flex;
  align-items: center;
  background-color: #ffc1b6;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  img {
    width: 16px;
    height: 16px;
  }
  .payment-warning-text {
    @apply text-error;
    margin-left: 8px;
    font-size: 13px;
    line-height: 16px;
  }
  .payment-warning-button {
    @apply text-error;
    @apply bg-transparent;
    @apply border-error;
    flex-grow: 1;
    font-size: 13px;
    line-height: 16px;
    border-width: 1px;
  }
}
.payment-tier {
  border-radius: 4px;
  border: 1px solid #d9dadc;
}
.payment-tier p {
  margin: 24px;
}
.payment-tier-caption {
  background: linear-gradient(-180deg, rgb(182, 43, 190) 0%, rgb(150, 34, 185) 100%);
}
.payment-tier-caption-premium {
  background: rgb(160, 195, 210);
  @apply text-black;
}
.payment-tier-description {
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}
.payment-tier-caption div {
  @apply text-white;
  padding: 72px 24px;
  font-size: 36px;
}
table {
  font-size: 14px;
  line-height: 36px;
  .column-1 {
    width: 30%;
  }
  .column-2 {
    width: 30%;
  }
  .column-3 {
    width: 10%;
  }
  th {
    @apply text-gray-400;
    text-transform: uppercase;
  }
}
.setting-content-wrapper {
  @apply max-w-3xl;
}
</style>
