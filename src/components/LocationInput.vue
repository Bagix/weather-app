<script setup lang="ts">
import { transformText } from '@/Utils'
import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const store = useWeatherStore()
const { locationName } = storeToRefs(store)
const place = ref<string>('')
const isFocus = ref<boolean>(false)
const input = ref()

function toggleFocus(value: boolean): void {
  isFocus.value = value
}

async function checkWeather(): Promise<void> {
  if (place.value.length < 3) {
    return
  }

  await store.getCurrentWeather(transformText(place.value))

  if (!store.error) {
    input.value.blur()
  }
}

watch(locationName, (newValue: string) => {
  if (!place.value) {
    place.value = newValue
  }
})
</script>

<template>
  <div class="location-input" :class="{ 'show-up': !store.error && store.currentWeather }">
    <div class="wrapper">
      <div class="container" :class="{ 'is-active': isFocus }">
        <input
          type="text"
          class="input"
          name="place"
          v-model="place"
          ref="input"
          @keydown.enter="checkWeather"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
          autocomplete="off"
          placeholder="min. 3 characters"
        />
      </div>
      <button @click="checkWeather" class="btn">Search</button>
    </div>
    <span v-if="store.error" class="error">{{ store.error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.location-input {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 360px;
  margin: 0 auto;
  padding: 20px 15px 0;
  height: 60px;
  transition: transform 0.3s linear;
  z-index: 10;
  transform: translateY(calc(50vh - 60px));

  @media (min-width: 768px) {
    max-width: 400px;
  }

  &.show-up {
    transform: translateY(0);

    .input {
      border-bottom: none;
    }
  }
}
.input {
  background: transparent;
  border-bottom: 1px solid darkslategrey;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 20px;
  padding: 2px 10px;
  color: #fff;
  max-width: 220px;

  @media (min-width: 768px) {
    font-size: 24px;
    max-width: 250px;
  }

  &:focus {
    outline: none;
  }
}

.container {
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    margin-top: -1px;
    height: 1px;
    width: 100%;
    background: #fff;
    transform: scaleX(0);
    transform-origin: bottom center;
    transition: transform 0.25s linear;
  }

  &.is-active::after {
    transform: scaleX(1);
  }
}

.wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}

.btn {
  background: transparent;
  border: 1px solid darkslategrey;
  font-size: 18px;
  color: #8f8f8f;
  transition: all 0.2s linear;
  cursor: pointer;
  padding: 10px 15px;

  &:hover {
    border: 1px solid #fff;
    color: #fff;
  }
}

.error {
  color: #db143c;
}
</style>
