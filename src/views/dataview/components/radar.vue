<template>
  <div class="w-full h-full" id="radar-chart-container">
    <div id="radar-chart"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'radarChart'
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

watch(() => windowWidth.value, () => {
  if (chart) {
    chart?.destroy();
    chart = null;
  }
  setTimeout(() => {
    renderChart(props.data);
  }, 500)
})

watch(() => windowHeight.value, () => {
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
    const chartContainer = document.getElementById('radar-chart-container');
    const width = chartContainer?.offsetWidth;
    const height = chartContainer?.offsetHeight;
    chart = new Chart({
      container: 'radar-chart',
      width,
      height,
      autoFit: true,
    });


    chart.coordinate({ type: 'polar' });

    chart
      .data(data)
      .scale('x', { padding: 0.5, align: 0 })
      .scale('y', { tickCount: 5, domainMax: 80 })
      .axis('x', {
        grid: true,
        gridLineWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
      })
      .axis('y', {
        zIndex: 1,
        title: false,
        gridConnect: 'line',
        gridLineWidth: 1,
        gridLineDash: [0, 0],
      })

    chart
      .area()
      .encode('x', 'item')
      .encode('y', 'score')
      .encode('color', 'type')
      .style('fillOpacity', 0.5)

    chart
      .line()
      .encode('x', 'item')
      .encode('y', 'score')
      .encode('color', 'type')
      .style('lineWidth', 2);

    chart
      .point()
      .encode('x', 'item')
      .encode('y', 'score')
      .encode('color', 'type')
      .encode('shape', 'point')
      .encode('size', 3)
      .tooltip(null);

    chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

    chart.render();

  }
}

// const reRenderChart = () => {
//   if (chart) {
//     chart?.destroy();
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
