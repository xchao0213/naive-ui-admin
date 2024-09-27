<template>
  <div class="w-full h-full" :id="'line-chart-container'+id">
    <div :id="'line-chart'+id"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'lineChart'
}
</script>

<script setup lang="ts">
import { onMounted, watch, inject } from 'vue';
import { Chart } from '@antv/g2';

interface Props {
  data: Array;
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  data: [],
  id: ''
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
    const chartContainer = document.getElementById('line-chart-container'+props.id);
    const width = chartContainer?.offsetWidth;
    const height = chartContainer?.offsetHeight;
    console.log(width, height)

    chart = new Chart({
      container: 'line-chart'+props.id,
      width,
      height,
      autoFit: true,
    });


    chart
      .data(data)
      .encode('x', 'month')
      .encode('y', 'temperature')
      .encode('color', 'city')
      .scale('x', {
        range: [0, 1],
      })
      .scale('y', {
        nice: true,
      })
      .axis('y', { labelFormatter: (d) => d + '°C' });

    chart.line().encode('shape', 'smooth');

    chart.point().encode('shape', 'point').tooltip(false);

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
