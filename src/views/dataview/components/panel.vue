<template>
  <div class="flex flex-col w-full h-full">
    <div class="">{{ title }}</div>
    <div class="flex-1">
      <div v-if="isLoading || isEmpty" class="w-full h-full flex items-center justify-center">
        <n-spin size="large" v-if="isLoading" />
        <n-empty v-else-if="isEmpty" />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'panel'
}
</script>

<script setup lang="ts">

interface Props {
  title: string;
  isLoading: boolean;
  isEmpty: boolean;
}

withDefaults(defineProps<Props>(), {
  title: '',
  isLoading: true,
  isEmpty: true
})

</script>