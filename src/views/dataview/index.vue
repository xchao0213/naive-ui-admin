<template>
    <div class="w-full" :style="{ 'height': dataViewHeight + 'px' }">
        <div class="header h-10 bordered">header</div>
        <div class="flex" :style="{ 'height': (dataViewHeight - 38) / 3 * 2 + 'px' }">
            <div class="flex-1">
                <div class="bordered" :style="{ 'height': (dataViewHeight - 38) / 3 + 'px' }">
                    1</div>
                <div class="bordered" :style="{ 'height': (dataViewHeight - 38) / 3 + 'px' }">
                    2</div>
            </div>
            <div style="flex:2" class="bordered">3</div>
            <div class="flex-1 bordered">4</div>
        </div>
        <div class="flex" :style="{ 'height': (dataViewHeight - 38) / 3 + 'px' }">
            <div class="flex-1 bordered">
                <column-chart ref="columnChartRef" />
            </div>
            <div class="flex-1 bordered">6</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import _ from 'lodash';
import columnChart from './components/columnChart.vue';
const windowHeight = ref(1080);

const dataViewHeight = computed(() => {
    return windowHeight.value - 64 - 38;
})

const columnChartRef = ref();

const handleResize = _.debounce(() => {
    columnChartRef.value.resize();
}, 200)

onMounted(() => {
    windowHeight.value = window.innerHeight;
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style>
.bordered {
    border: 1px solid #330453;
}
</style>