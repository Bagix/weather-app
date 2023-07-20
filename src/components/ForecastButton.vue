<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

const store = useWeatherStore()

function loadForecast(): void {
  store.loadForecast()
}
</script>

<template>
  <button class="forecast-button" @click="loadForecast" :disabled="store.isLoadingForecast">
    3 days forecast
  </button>
</template>

<style lang="scss" scoped>
.forecast-button {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: auto;
  padding: 12px 24px;
  margin-top: 50px;
  overflow: hidden;
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

  &:disabled {
    border: 2px solid rgb(43 43 43);

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: rgb(0 0 0 / 70%);
    }
  }
}
</style>
