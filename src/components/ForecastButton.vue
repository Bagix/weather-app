<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

const store = useWeatherStore()

function loadForecast(): void {
  store.loadForecast()
}
</script>

<template>
  <button class="forecast-button" @click="loadForecast">3 days forecast</button>
</template>

<style lang="scss" scoped>
.forecast-button {
  width: 100%;
  max-width: 300px;
  padding: 12px 24px;
  margin-top: 50px;
  font-size: 24px;
  color: #8f8f8f;
  cursor: pointer;
  background: transparent;
  border: 2px solid darkslategrey;
  transition: all 0.2s linear;

  &:hover {
    color: #fff;
    border: 2px solid #fff;
  }
}
</style>
