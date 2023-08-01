<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import DailyWeatherDetailsCard from '@/components/DailyWeatherDetailsCard.vue'
import WeatherChart from '@/components/WeatherChart.vue'
import { ref, nextTick } from 'vue'
import type { IWeatherLineChart } from '@/Types'

const store = useWeatherStore()
const temperatureData = [
  { title: 'Min. temp:', data: store.dailyForecast?.day.mintemp_c },
  { title: 'Avr. temp:', data: store.dailyForecast?.day.avgtemp_c },
  { title: 'Max. temp:', data: store.dailyForecast?.day.maxtemp_c }
]
const windData = [{ title: 'Max. wind:', data: store.dailyForecast?.day.maxwind_kph }]
const humidityData = [{ title: 'Avr. humidity:', data: store.dailyForecast?.day.avghumidity }]
const isChartVisible = ref<boolean>(false)
const chart = ref<HTMLElement>()
let chartData = ref<IWeatherLineChart>({ labels: [], datasets: [] })

function close(): void {
  store.toggleDailyModal()
}

async function toggleChart(): Promise<void> {
  if (!store.dailyForecast) {
    return
  }

  ;(document.activeElement as HTMLElement)?.blur
  console.log('document.activeElement', document.activeElement)

  if (isChartVisible.value) {
    document.querySelector('.content')?.scrollTo({ top: 0, behavior: 'smooth' })
    isChartVisible.value = false
    return
  }

  let labels: string[] = []
  let data: number[] = []

  store.dailyForecast.hour.forEach((hour) => {
    labels.push(hour.time.slice(11, 13))
    data.push(hour.temp_c)
  })

  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Temparature',
        backgroundColor: '#ffffff',
        data,
        borderColor: '#2f4f4f',
        tension: 0.1
      }
    ]
  }

  isChartVisible.value = true
  await nextTick()
  chart.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="daily-weather-modal">
    <div class="header">
      <h1 class="location">
        {{ store.dailyForecast?.date }} {{ store.locationName }} ({{ store.location?.country }})
      </h1>
      <div class="close" @click="close">X</div>
    </div>
    <div class="content" v-if="store.dailyForecast">
      <div class="daily">
        <img :src="store.dailyForecast.day.condition.icon" />
        <p>{{ store.dailyForecast.day.condition.text }}</p>
      </div>
      <div class="details">
        <DailyWeatherDetailsCard title="Temperature" :data="temperatureData" />
        <DailyWeatherDetailsCard title="Wind" :data="windData" />
        <DailyWeatherDetailsCard title="Humidity" :data="humidityData" />
      </div>

      <div class="btn-wrapper">
        <button class="chart-btn" @click="toggleChart">Toggle Chart</button>
      </div>

      <Transition name="pop-up">
        <div v-if="isChartVisible" ref="chart" class="chart-container">
          <WeatherChart :data="chartData" xAxisText="Hour" yAxisText="Temperature" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-weather-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100dvh;
  overflow-y: hidden;
  background: var(--color-background);
  border: 2px solid darkslategray;
  border-radius: 5px;

  @media (width >= 1366px) {
    top: 2dvh;
    left: 2vw;
    width: 96vw;
    height: 96dvh;
  }
}

.daily-weather-modal > .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  background: var(--color-background);
  border-bottom: 2px solid darkslategray;

  .close {
    width: 30px;
    height: 30px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
}

.content {
  height: calc(100% - 118px);
  padding: 16px 24px;
  overflow-x: hidden;
  overflow-y: auto;
}

.card {
  width: 100%;
  border: 1px solid darkslategray;
  border-radius: 3px;

  @media (width >= 768px) {
    max-width: 350px;
  }

  .header {
    text-align: center;
  }

  .row {
    padding: 10px;
    border-bottom: 1px solid darkslategray;

    &:last-child {
      border: none;
    }
  }
}

.daily {
  text-align: center;
}

.details {
  display: flex;
  flex-direction: column;

  @media (width >= 768px) {
    flex-flow: row wrap;
    justify-content: space-between;
  }
}

.btn-wrapper {
  width: 100%;
  text-align: center;
}

.chart-btn {
  width: 100%;
  padding: 12px 24px;
  margin: 20px 0;
  font-size: 24px;
  color: #8f8f8f;
  cursor: pointer;
  background: var(--color-background);
  border: 2px solid darkslategrey;
  transition: all 0.2s linear;

  @media (width >= 768px) {
    max-width: 300px;
  }

  &:hover {
    @media (hover: hover) {
      color: #fff;
      border: 2px solid #fff;
    }
  }
}

.chart-container {
  height: 300px;
  background-color: #f7f7f7;
}

.pop-up-enter-active {
  animation: popin 0.75s linear 1;
}

.pop-up-leave-active {
  animation: popout 0.25s linear 1;
}

@keyframes popin {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  75% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes popout {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
