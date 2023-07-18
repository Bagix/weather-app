<script setup lang="ts">
import type { IDailyForecast } from '@/Types'
import { useWeatherStore } from '@/stores/weather'
import { onMounted, ref } from 'vue'

const store = useWeatherStore()
const weather = ref<IDailyForecast>()
const emit = defineEmits(['close'])
const modal = ref<HTMLDivElement>()
const props = defineProps<{
  date: string
}>()

function close(): void {
  emit('close')
}

onMounted(() => {
  weather.value = store.forecast?.find((item) => item.date === props.date)

  if (!modal.value) {
    return
  }

  modal.value.style.top = `calc(2vh + ${window.scrollY}px)`
})
</script>

<template>
  <div ref="modal" class="daily-weather-modal">
    <div class="header">
      <h1 class="location">{{ store.locationName }}</h1>
      <div class="close" @click="close">X</div>
    </div>
    <div class="content">
      {{ weather }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-weather-modal {
  position: absolute;
  top: 2vh;
  left: 2vw;
  z-index: 50;
  width: 96vw;
  height: 96vh;
  overflow-y: hidden;
  background: var(--color-background);
  border: 2px solid darkslategray;
  border-radius: 5px;
}

.header {
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
  height: calc(100% - 70px);
  padding: 16px 24px;
  overflow-y: scroll;
}
</style>
