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
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 360px;
  height: 60px;
  padding: 20px 15px 0;
  margin: 0 auto;
  transition: transform 0.3s linear;
  transform: translateY(calc(50vh - 60px));

  @media (width >= 768px) {
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
  max-width: 220px;
  padding: 2px 10px;
  font-size: 20px;
  color: #fff;
  background: transparent;
  border-top: none;
  border-right: none;
  border-bottom: 1px solid darkslategrey;
  border-left: none;

  @media (width >= 768px) {
    max-width: 250px;
    font-size: 24px;
  }

  &:focus {
    outline: none;
  }
}

.container {
  position: relative;

  &::after {
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -1px;
    content: '';
    background: #fff;
    transition: transform 0.25s linear;
    transform: scaleX(0);
    transform-origin: bottom center;
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
  padding: 10px 15px;
  font-size: 18px;
  color: #8f8f8f;
  cursor: pointer;
  background: transparent;
  border: 2px solid darkslategrey;
  transition: all 0.2s linear;

  &:hover {
    color: #fff;
    border: 2px solid #fff;
  }
}

.error {
  color: #db143c;
}
</style>
