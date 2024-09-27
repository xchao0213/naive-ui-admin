<template>
  <div class="w-full h-full" id="bar-chart-container">
    <div id="bar-chart"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'barChart'
}
</script>

<script setup lang="ts">
import { onMounted, watch, inject } from 'vue';
import { Chart } from '@antv/g2';

interface Props {
  data: Array;
}

const props = withDefaults(defineProps<Props>(), {
  data: []
})

const windowWidth = inject('windowWidth');
const windowHeight = inject('windowHeight');

watch(() => windowWidth.value, (val) => {
  if (chart) {
    chart?.destroy();
    chart = null;
  }
  setTimeout(() => {
    renderChart(props.data);
  }, 500)
})

watch(() => windowHeight.value, (val) => {
  if (chart) {
    chart?.destroy();
    chart = null;
  }
  setTimeout(() => {
    renderChart(props.data);
  }, 500)
})

let chart = null;

const renderChart = (data) => {
  if (chart) {
    chart.changeData(data)
  } else {
    const chartContainer = document.getElementById('bar-chart-container');
    const width = chartContainer?.offsetWidth;
    const height = chartContainer?.offsetHeight;
    console.log(width, height)
    chart = new Chart({
      container: 'bar-chart',
      width,
      height,
      autoFit: true,
    });

    chart.interval().data(data).encode('x', 'letter').encode('y', 'frequency').slider('x', {});

    chart.render();

  }
}

watch(() => props.data, (val) => {
  if (val && val.length > 0) {
    renderChart(val);
  }
})

onMounted(() => {
  if (props.data && props.data.length > 0) {
    renderChart(props.data);
  }
});

</script>
