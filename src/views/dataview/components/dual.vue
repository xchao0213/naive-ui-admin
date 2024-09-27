<template>
  <div class="w-full h-full" id="dual-chart-container">
    <div id="dual-chart"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dualChart'
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
    const chartContainer = document.getElementById('dual-chart-container');
    const width = chartContainer?.offsetWidth;
    const height = chartContainer?.offsetHeight;
    chart = new Chart({
      container: 'dual-chart',
      width,
      height,
      autoFit: true,
    });

    chart.data(data);

    chart
      .interval()
      .encode('x', 'time')
      .encode('y', 'waiting')
      .axis('y', { title: 'Waiting', titleFill: '#5B8FF9' });

    chart
      .line()
      .encode('x', 'time')
      .encode('y', 'people')
      .encode('shape', 'smooth')
      .style('stroke', '#fdae6b')
      .style('lineWidth', 2)
      .scale('y', { independent: true })
      .axis('y', {
        position: 'right',
        grid: null,
        title: 'People',
        titleFill: '#fdae6b',
      });

    chart.render();

  }
}

// const reRenderChart = () => {
//   if (chart) {
//     chart.destroy();
//     chart = null;
//   }
//   renderChart(props.data);
// }

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
