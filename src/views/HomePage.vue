<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import LocationInput from '@/components/LocationInput.vue'

const store = useWeatherStore()
</script>

<template>
  <div class="container">
    <LocationInput />
    <div v-if="store.location" class="location">
      <p>{{ store.location.name }} / {{ store.location.country }}</p>
    </div>
    <div v-if="store.currentWeather" class="weather">
      <img :src="store.currentWeather.condition.icon" />
      <p>{{ store.currentWeather.temp_c }} / {{ store.currentWeather.condition.text }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
}

.location,
.weather {
  text-align: center;
}
</style>
