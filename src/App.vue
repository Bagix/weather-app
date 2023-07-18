<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useWeatherStore } from './stores/weather'
import { onMounted } from 'vue'

const store = useWeatherStore()

async function setCurrentPosition(position: GeolocationPosition): Promise<void> {
  const positionString = `${position.coords.latitude},${position.coords.longitude}`
  await store.getCurrentWeather(positionString)
}

onMounted(() => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true
    }

    navigator.geolocation.getCurrentPosition(setCurrentPosition, undefined, options)
  }
})
</script>

<template>
  <div class="canvas" :class="store.weatherCodeClass">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.canvas {
  background-color: var(--color-background);
}
</style>
