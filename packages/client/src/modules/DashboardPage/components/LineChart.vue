<template>
  <div :id="chartName" style="width: 100%; height: 350px"></div>
</template>

<script>
import Vue from 'vue';

const drawChart = (chartElementId, chartData, chartOptions) => {
  if (typeof window.gstatic !== 'undefined') {
    const google = window.gstatic;
    google.charts.load('current', { packages: ['line'] });
    const drawLineChart = () => {
      const data = google.visualization.arrayToDataTable(chartData);

      const options = chartOptions;

      const chart = new google.charts.Line(
        document.getElementById(chartElementId),
      );

      chart.draw(data, options);
    };
    google.charts.setOnLoadCallback(drawLineChart);
  }
};

export default Vue.component('line-chart', {
  props: {
    chartName: {
      type: String,
      default: '',
    },
    chartData: {
      type: Array,
    },
    chartOptions: {
      type: Object,
    },
  },

  mounted() {
    drawChart(this.chartName, this.chartData, this.chartOptions);
  },
});
</script>
