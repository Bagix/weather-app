<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

const store = useWeatherStore()

function close(): void {
  store.toggleDailyModal()
}
</script>

<template>
  <div class="daily-weather-modal">
    <div class="header">
      <h1 class="location">{{ store.locationName }} {{ store.dailyForecast?.date }}</h1>
      <div class="close" @click="close">X</div>
    </div>
    <div class="content" v-if="store.dailyForecast">
      <div class="averages">
        {{ store.dailyForecast }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-weather-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100dvh;
  overflow-y: hidden;
  background: var(--color-background);
  border: 2px solid darkslategray;
  border-radius: 5px;

  @media (width >= 1366px) {
    top: 2dvh;
    left: 2vw;
    width: 96vw;
    height: 96dvh;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  background: var(--color-background);
  border-bottom: 2px solid darkslategray;

  .close {
    width: 30px;
    height: 30px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
}

.content {
  height: calc(100% - 70px);
  padding: 16px 24px;
  overflow-y: scroll;
}
</style>
