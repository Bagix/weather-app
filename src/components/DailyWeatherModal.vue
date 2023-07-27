<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import DailyWeatherDetailsCard from '@/components/DailyWeatherDetailsCard.vue'
import WeatherChart from '@/components/WeatherChart.vue'
import { Line } from 'vue-chartjs'
import { ref } from 'vue'
import type { IWeatherLineChart } from '@/Types'

const store = useWeatherStore()
const temperatureData = [
  { title: 'Min. temp', data: store.dailyForecast?.day.mintemp_c },
  { title: 'Avr. temp', data: store.dailyForecast?.day.avgtemp_c },
  { title: 'Max. temp', data: store.dailyForecast?.day.maxtemp_c }
]
const windData = [{ title: 'Max. wind', data: store.dailyForecast?.day.maxwind_kph }]
const humidityData = [{ title: 'Avr. humidity', data: store.dailyForecast?.day.avghumidity }]
const isChartVisible = ref<boolean>(false)
let chartData = ref<IWeatherLineChart>({ labels: [], datasets: [] })

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#ffffff',
      data: [40, 39, 10, 40, 39, 80, 40],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
}

function close(): void {
  store.toggleDailyModal()
}

function loadChart(): void {
  if (!store.dailyForecast) {
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
      <button @click="loadChart">Show Chart</button>
      <div class="chart-container">
        <WeatherChart
          :data="chartData"
          v-if="chartData.datasets.length"
          xAxisText="Hour"
          yAxisText="Temperature"
        />
      </div>
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
  overflow-y: scroll;
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

.details {
  display: flex;
  flex-direction: column;

  @media (width >= 768px) {
    flex-flow: row wrap;
    justify-content: space-between;
  }
}

.chart-container {
  background-color: #f7f7f7;
}
</style>
