<template>
    <div class="w-full h-full flex flex-col">
        <div class="header h-10 bordered mb-1">header</div>
        <div class="flex-1 flex flex-col">
            <div class="flex mb-1" style="flex:2">
                <div class="flex-1 flex flex-col">
                    <div class="flex-1 bordered mb-1">
                        <panel title="双坐标" :isEmpty="dualData.length===0" :isLoading="loading">
                            <dual-chart :data="dualData" />
                        </panel>
                    </div>
                    <div class="flex-1 bordered">
                        <panel title="环形图" :isEmpty="pieData.length===0" :isLoading="loading">
                            <pie-chart :data="pieData" />
                        </panel>
                    </div>
                </div>
                <div class="bordered mx-1" style="flex:2">
                    <map-chart />
                </div>
                <div class="flex-1 flex flex-col bordered">
                    <div class="flex-1">
                        <panel title="线图" :isEmpty="lineData.length===0" :isLoading="loading">
                            <line-chart id="line2" :data="lineData" />
                        </panel>
                    </div>
                    <div class="flex-1">
                        <panel title="柱状图" :isEmpty="barData.length===0" :isLoading="loading">
                            <bar-chart :data="barData" />
                        </panel>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex">
                <div class="flex-1 bordered mr-1">
                    <panel title="线图" :isEmpty="lineData.length===0" :isLoading="loading">
                        <line-chart :data="lineData" />
                    </panel>
                </div>
                <div class="flex-1 flex bordered">
                    <div class="flex-1">
                        <panel title="雷达图" :isEmpty="radarData.length===0" :isLoading="loading">
                            <radar-chart :data="radarData" />
                        </panel>
                    </div>
                    <div class="flex-1">
                        <panel title="线图" :isEmpty="lineData.length===0" :isLoading="loading">
                            <line-chart id="line" :data="lineData" />
                        </panel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, provide } from 'vue';
import _ from 'lodash';
import { barDataMock, dualDataMock, lineDataMock, pieDataMock, radarDataMock } from './components/chartData.js';
import panel from './components/panel.vue'
import barChart from './components/bar.vue';
import dualChart from './components/dual.vue';
import lineChart from './components/line.vue';
import pieChart from './components/pie.vue';
import radarChart from './components/radar.vue';
import mapChart from './components/map.vue'

const windowWidth = ref(1920);
const windowHeight = ref(1080);

provide('windowWidth', windowWidth)
provide('windowHeight', windowHeight)

const barData = ref([]);
const dualData = ref([]);
const lineData = ref([]);
const pieData = ref([]);
const radarData = ref([]);

const loading = ref(true);

const handleResize = _.debounce(() => {
    windowHeight.value = window.innerHeight;
    windowWidth.value = window.innerWidth;
}, 200)

onMounted(() => {
    windowHeight.value = window.innerHeight;
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', handleResize)
    setTimeout(() => {
        barData.value = barDataMock;
        dualData.value = dualDataMock;
        lineData.value = lineDataMock;
        pieData.value = pieDataMock;
        radarData.value = radarDataMock;
        loading.value = false;
    }, 200)
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