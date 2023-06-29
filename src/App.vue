<script setup lang="ts">
import { RouterView } from 'vue-router'
import HomePage from './views/HomePage.vue'
import { useWeatherStore } from './stores/weather'

const store = useWeatherStore()
</script>

<template>
  <div class="canvas" :class="store.weatherCodeClass">
    <HomePage />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.canvas {
  background-color: var(--color-background);
  transition: background-color 0.5s ease-out;

  &.weather-1000 {
    background-color: rgb(241, 198, 6);
  }

  &.weather-1003 {
    background-color: rgb(221, 221, 125);
  }
}
</style>
