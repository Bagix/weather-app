<script setup lang="ts">
import { type IDailyForecast } from '@/Types'

defineProps<{
  dayilyWeather: IDailyForecast
}>()

function getDate(date: string): string {
  const newDate = new Date(date)
  return `${newDate.getDate()} ${newDate.toLocaleString('en-US', { month: 'short' })}`
}
</script>

<template>
  <a :href="`./day/${dayilyWeather.date}`" class="daily-weather-card">
    <div class="date">{{ getDate(dayilyWeather.date) }}</div>
    <div class="icon">
      <img :src="dayilyWeather.day.condition.icon" />
    </div>
    <div class="temp">
      {{ dayilyWeather.day.avgtemp_c }}/ {{ dayilyWeather.day.condition.text }}
    </div>
  </a>
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
  border: 1px solid darkslategrey;
  box-shadow: 0 0 4px 0 darkslategrey;
  border-radius: 5px;
  transform: translateY(0);
  background: #000;
  color: var(--color-text);
  text-decoration: none;
  transition: box-shadow 0.2s linear;

  @media (min-width: 768px) {
    margin: 0 16px;
  }

  &:hover {
    box-shadow: 0 0 4px 5px darkslategrey;
  }
}
</style>
