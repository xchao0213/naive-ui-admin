<template>
  <div class="w-full h-full" id="pie-chart-container">
    <div id="pie-chart"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'pieChart'
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
    const chartContainer = document.getElementById('pie-chart-container');
    const width = chartContainer?.offsetWidth;
    const height = chartContainer?.offsetHeight;
    chart = new Chart({
      container: 'pie-chart',
      width,
      height,
      autoFit: true,
    });

    chart.coordinate({ type: 'theta', innerRadius: 0.55, outerRadius: 0.8 });

    chart
      .interval()
      .data(data)
      .transform({ type: 'stackY' })
      .encode('y', 'value')
      .encode('color', 'id')
      .scale('color', {
        range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
      })
      .label({
        text: 'value',
        fontWeight: 'bold',
        offset: 0,
      })
      .label({
        text: 'id',
        position: 'spider',
        connectorDistance: 0,
        fontWeight: 'bold',
        textBaseline: 'bottom',
        textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
        dy: -4,
      })
      .style('radius', 4)
      .style('stroke', '#fff')
      .style('lineWidth', 2)
      .animate('enter', { type: 'waveIn' })
      .legend(false);

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
