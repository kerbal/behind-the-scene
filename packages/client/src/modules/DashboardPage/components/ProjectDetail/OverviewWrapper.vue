<template>
  <div id="overview" class="overview">
    <div class="overview-charts">
      <p>Today: {{ moment().format('MMM DD, YYYY') }}</p>
      <LineChart v-if="loaded" chartName="today-chart" :chartOptions="options" :chartData="today" />
      <div class="separator" />
      <p>
        Last 7 days:
        {{
          moment()
            .subtract(6, 'days')
            .format('MMM DD, YYYY')
        }}
        - {{ moment().format('MMM DD, YYYY') }}
      </p>
      <LineChart
        v-if="loaded"
        chartName="7-days-chart"
        :chartOptions="options"
        :chartData="last7Days"
      />
      <div class="separator" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import LineChart from '../LineChart.vue';
import apiService from '../../../../utils/apiService';

export default Vue.extend({
  name: 'OverviewWrapper',
  components: {
    LineChart,
  },
  data() {
    return {
      options: {
        curveType: 'function',
        legend: { position: 'bottom' },
        colors: ['#FD6096'],
      },
      today: [] as any[],
      last7Days: [] as any[],
      loaded: false,
    };
  },
  methods: {
    moment: () => moment(),
  },
  async mounted() {
    const today = await apiService.get(`/api/projects/${this.$route.params.id}/dashboard/today`);
    this.today = [['Hour', 'Bug count'], ...today.data];
    const last7Days = await apiService.get(
      `/api/projects/${this.$route.params.id}/dashboard/last7days`,
    );
    this.last7Days = [['Day', 'Bug count'], ...last7Days.data];
    this.loaded = true;
  },
});
</script>

<style lang="scss" scoped>
p {
  @apply text-primary;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}
.separator {
  border-bottom: 1px solid rgba(33, 77, 113, 0.25);
  padding-bottom: 24px;
  margin-bottom: 24px;
}
.overview {
  width: 100%;
  overflow: scroll;
  height: 100%;
  overflow-x: hidden;
  padding: 24px;
}
</style>
