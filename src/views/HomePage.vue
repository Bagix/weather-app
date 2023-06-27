<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import LocationInput from '@/components/LocationInput.vue'

const store = useWeatherStore()
</script>

<template>
  <LocationInput />
  <div class="container" :class="{ 'show-up': !store.error && store.currentWeather }">
    <div v-if="store.location" class="location">
      <p>Contry: {{ store.location.country }}</p>
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.2s linear 0.3s;

  &.show-up {
    opacity: 1;
  }
}

.location,
.weather {
  text-align: center;
}
</style>
