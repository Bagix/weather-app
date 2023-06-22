import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { config } from '@/config'
import { type IWeather, type IWeatherLocation, type ICurrentWeather } from '@/Types'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeatherData = ref<IWeather>()

  const location = computed(
    (): IWeatherLocation | null => currentWeatherData.value?.location ?? null
  )
  const currentWeather = computed(
    (): ICurrentWeather | null => currentWeatherData.value?.current ?? null
  )

  async function setCurrentWeather(city: string) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${config.api.key}&q=${city}`
    )

    currentWeatherData.value = await response.json()
  }

  return { currentWeather, location, setCurrentWeather }
})
