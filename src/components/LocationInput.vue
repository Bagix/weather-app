<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { ref } from 'vue'

const store = useWeatherStore()
const city = ref('')

async function checkWeather() {
  if (city.value.length < 3) {
    return
  }

  await store.setCurrentWeather(city.value)
}
</script>

<template>
  <input
    type="text"
    name="city"
    v-model="city"
    @keydown.enter="checkWeather"
    placeholder="min. 3 characters"
  />
  <button @click="checkWeather">Search</button>
</template>

<style scoped></style>
