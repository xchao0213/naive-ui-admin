<template>
  <div class="w-full h-full">
    <div id="map-container" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts">
export default {
  name:'map'
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  securityJsCode: "202a4c47f7e5ebd49aca45c5c835154a",
};
let map = null;

const chinaBounds = [[122.896465, 53.746822], [109.256937, 18.513361], [73.681672, 39.475744], [134.989243, 48.456683]]

const renderMap = () => {
  if (map) {
    map.destroy();
    map = null;
  }

AMapLoader.load({
  key: "ed247488060e38cccc47b2c90d62ff4b", //申请好的 Web 端开发者 Key，首次调用 load 时必填
  version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
})
  .then((AMap) => {
    map = new AMap.Map("map-container", {
      zoom: [3, 20],
      viewMode: "2D",
    }); //"container"为 <div> 容器的 id

    new AMap.Polygon({
      map: map,
      path: chinaBounds,
      strokeColor: "#ff0000",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#ff0000",
      fillOpacity: 0.35,
    })

    map.setFitView();
    map.clearMap()
  })
  .catch((e) => {
    console.log(e);
  });
}

onMounted(() => {
  renderMap();
})
</script>