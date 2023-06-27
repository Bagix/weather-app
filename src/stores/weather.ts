import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { config } from '@/config'
import { type IWeather, type IWeatherLocation, type ICurrentWeather } from '@/Types'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeatherData = ref<IWeather>()
  const error = ref<string>('')

  const location = computed(
    (): IWeatherLocation | null => currentWeatherData.value?.location ?? null
  )
  const currentWeather = computed(
    (): ICurrentWeather | null => currentWeatherData.value?.current ?? null
  )

  async function setCurrentWeather(city: string) {
    try {
      error.value = ''

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${config.api.key}&q=${city}`
      )

      const data = await response.json()

      console.log(data)

      if (!response.ok) {
        throw new Error(data.error.message)
      }

      currentWeatherData.value = data
    } catch (e) {
      console.log(e)
      error.value = String(e)
    }
  }

  return { currentWeather, location, setCurrentWeather, error }
})
