import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { config } from '@/config'
import {
  type IWeather,
  type IWeatherLocation,
  type ICurrentWeather,
  type IDailyForecast
} from '@/Types'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeatherData = ref<IWeather>()
  const error = ref<string>('')
  const currentPosition = ref<string>('')
  const forecastData = ref<IDailyForecast[]>()

  const location = computed(
    (): IWeatherLocation | null => currentWeatherData.value?.location ?? null
  )

  const locationName = computed((): string => currentWeatherData.value?.location?.name ?? '')

  const currentWeather = computed(
    (): ICurrentWeather | null => currentWeatherData.value?.current ?? null
  )

  const forecast = computed((): IDailyForecast[] | null => forecastData.value ?? null)

  const weatherCodeClass = computed((): string => {
    const code = currentWeather?.value?.condition.code.toString() ?? ''

    if (!code) {
      return ''
    }

    return `weather-${code}`
  })

  async function getCurrentWeather(position: string): Promise<void> {
    try {
      error.value = ''
      currentPosition.value = position

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${config.api.key}&q=${position}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error.message)
      }

      currentWeatherData.value = data
    } catch (e) {
      error.value = String(e)
    }
  }

  async function getForecast(): Promise<void> {
    try {
      error.value = ''

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${config.api.key}&q=${currentPosition.value}&days=7`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error.message)
      }

      forecastData.value = data.forecast.forecastday
    } catch (e) {
      console.log(e)
    }
  }

  return {
    currentWeather,
    location,
    getCurrentWeather,
    getForecast,
    forecast,
    weatherCodeClass,
    locationName,
    error
  }
})
