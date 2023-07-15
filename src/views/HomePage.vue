<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import LocationInput from '@/components/LocationInput.vue'
import DailyWeatherCard from '@/components/DailyWeatherCard.vue'

const store = useWeatherStore()

function getForecast(): void {
  store.getForecast()
}
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

      <button class="forecast-btn" @click="getForecast">3 days forecast</button>

      <div class="forecast-container">
        <TransitionGroup name="drop">
          <template v-if="store.forecast">
            <DailyWeatherCard
              v-for="forecast in store.forecast"
              :key="forecast.date"
              :dayilyWeather="forecast"
            />
          </template>
        </TransitionGroup>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1366px;
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
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

.forecast-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 32px;
  height: 552px;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 152px;
  }
}

.forecast-btn {
  border: 1px solid darkslategrey;
  background: transparent;
  padding: 10px 15px;
  font-size: 16px;
  color: #8f8f8f;
  cursor: pointer;
  transition: all 0.2s linear;
  margin-top: 16px;

  &:hover {
    border: 1px solid #fff;
    color: #fff;
  }
}

.drop-enter-active {
  transition: all 0.5s ease-out;
}

.drop-enter-from {
  transform: translateY(-113%);
}

@media (max-width: 767px) {
  .drop-enter-from:nth-child(2),
  .drop-enter-from:nth-child(3) {
    opacity: 0;
    transform: translateY(-121%);
  }
}

@for $i from 1 through 3 {
  .daily-weather-card:nth-child(#{$i}n) {
    transition-delay: #{$i * 0.5}s;
    z-index: 10 - $i;
  }
}
</style>
