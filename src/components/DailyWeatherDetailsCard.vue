<script setup lang="ts">
import type { IDailyDetails } from '@/Types'

const props = defineProps<{
  title: string
  data: IDailyDetails[]
}>()
</script>

<template>
  <div class="card">
    <div class="row header">{{ props.title }}</div>
    <div class="row" v-for="(weather, index) in props.data" :key="index">
      {{ weather.title }} <span class="value">{{ weather.data }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  border: 1px solid darkslategray;
  border-radius: 3px;

  @media (width >= 768px) {
    max-width: 350px;
    margin-top: 30px;
  }

  .header {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .row {
    padding: 10px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid darkslategray;

    &:last-child {
      border: none;
    }
  }

  .value {
    margin-left: 5px;
  }
}
</style>
