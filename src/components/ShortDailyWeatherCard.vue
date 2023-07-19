<script setup lang="ts">
import { type IDailyForecast } from '@/Types'
import { useWeatherStore } from '@/stores/weather'

const store = useWeatherStore()
defineProps<{
  dayilyWeather: IDailyForecast
}>()

function getDate(date: string): string {
  const newDate = new Date(date)
  return `${newDate.getDate()} ${newDate.toLocaleString('en-US', { month: 'short' })}`
}

function openDailyModal(date: string): void {
  store.openDailyModal(date)
}
</script>

<template>
  <div class="daily-weather-card" @click="openDailyModal(dayilyWeather.date)">
    <div class="date">{{ getDate(dayilyWeather.date) }}</div>
    <div class="icon">
      <img :src="dayilyWeather.day.condition.icon" />
    </div>
    <div class="temp">
      {{ dayilyWeather.day.avgtemp_c }}/ {{ dayilyWeather.day.condition.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-weather-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  color: var(--color-text);
  cursor: pointer;
  background: #000;
  border: 2px solid darkslategrey;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 darkslategrey;
  transition: box-shadow 0.2s linear;
  transform: translateY(0);

  @media (width >= 768px) {
    margin: 0 16px;
  }

  &:hover {
    box-shadow: 0 0 4px 5px darkslategrey;
  }
}
</style>
