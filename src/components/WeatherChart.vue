<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { IWeatherLineChart } from '@/Types'
import { onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = defineProps<{
  data: IWeatherLineChart
  xAxisText: string
  yAxisText: string
}>()

const isAxisTextVisible = ref<boolean>(window.innerWidth < 768 ? false : true)

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: props.xAxisText
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: props.yAxisText
      }
    }
  }
})
</script>

<template>
  <Line class="weather-chart" :data="props.data" :options="options" />
</template>

<!-- <style lang="scss" scoped></style> -->
