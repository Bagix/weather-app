<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import LocationInput from '@/components/LocationInput.vue'

const store = useWeatherStore()
</script>

<template>
  <LocationInput />
  <Transition name="fade">
    <div v-if="!store.error && store.currentWeather" class="container">
      <div v-if="store.location" class="location">
        <p>Contry: {{ store.location.country }}</p>
      </div>
      <div v-if="store.currentWeather" class="weather">
        <img :src="store.currentWeather.condition.icon" />
        <p>{{ store.currentWeather.temp_c }} / {{ store.currentWeather.condition.text }}</p>
      </div>
    </div>
  </Transition>
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
}

.location,
.weather {
  text-align: center;
}

.fade-enter-active {
  transition: opacity 0.3s ease-out 0.4s;
}

.fade-enter-from {
  opacity: 0;
}
</style>
