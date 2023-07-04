<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { ref } from 'vue'

const store = useWeatherStore()
const city = ref<string>('')
const isFocus = ref<boolean>(false)
const input = ref()

function toggleFocus(value: boolean): void {
  isFocus.value = value
}

async function checkWeather(): Promise<void> {
  if (city.value.length < 3) {
    return
  }

  const letters = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż']
  const replacement = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z']

  for (let i = 0; i < letters.length; ++i) {
    city.value = city.value.replaceAll(letters[i], replacement[i])
  }

  await store.setCurrentWeather(city.value)

  if (!store.error) {
    input.value.blur()
  }
}
</script>

<template>
  <div class="location-input" :class="{ 'show-up': !store.error && store.currentWeather }">
    <div class="wrapper">
      <div class="container" :class="{ 'is-active': isFocus }">
        <input
          type="text"
          class="input"
          name="city"
          v-model="city"
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
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  height: 60px;
  transition: transform 0.3s linear;
  z-index: 10;
  transform: translateY(calc(50vh - 60px));

  &.show-up {
    transform: translateY(0);

    .input {
      border-bottom: none;
    }
  }
}
.input {
  background: transparent;
  border-bottom: 1px solid #8f8f8f;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 16px;
  padding: 2px 10px;
  color: #fff;

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
}

.btn {
  margin-left: 15px;
  background: transparent;
  border: 1px solid #8f8f8f;
  font-size: 16px;
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
