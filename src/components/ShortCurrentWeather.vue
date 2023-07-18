<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

const store = useWeatherStore()
</script>

<template>
  <div v-if="store.location" class="location">
    <p>Contry: {{ store.location.country }}</p>
  </div>
  <div v-if="store.currentWeather" class="weather">
    <img :src="store.currentWeather.condition.icon" />
    <p>{{ store.currentWeather.temp_c }} / {{ store.currentWeather.condition.text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.location,
.weather {
  text-align: center;
}
</style>
