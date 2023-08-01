<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import LocationInput from '@/components/LocationInput.vue'
import ShortCurrentWeather from '@/components/ShortCurrentWeather.vue'
import ShortDailyWeatherCard from '@/components/ShortDailyWeatherCard.vue'
import DailyWeatherModal from '@/components/DailyWeatherModal.vue'
import ForecastButton from '@/components/ForecastButton.vue'
import UILoader from '@/components/UILoader.vue'

const store = useWeatherStore()

function beforeSlideUp(): void {
  document.body.classList.add('overflow-hidden')
}

function afterSlideDown(): void {
  document.body.classList.remove('overflow-hidden')
}
</script>

<template>
  <LocationInput />

  <Transition name="fade">
    <div v-if="!store.error && store.currentWeather" class="container">
      <ShortCurrentWeather />

      <Transition name="fade-out">
        <ForecastButton v-if="!store.forecast" class="forecast-btn" />
      </Transition>

      <div class="forecast-container">
        <UILoader v-if="store.isLoadingForecast" clas="test" />

        <TransitionGroup name="drop">
          <template v-if="store.forecast">
            <ShortDailyWeatherCard
              v-for="forecast in store.forecast"
              :key="forecast.date"
              :dayilyWeather="forecast"
            />
          </template>
        </TransitionGroup>
      </div>
    </div>
  </Transition>

  <Transition name="slide-up" @before-enter="beforeSlideUp" @after-leave="afterSlideDown">
    <DailyWeatherModal v-if="store.isDailyModalOpen" />
  </Transition>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1366px;
  padding: 0 16px;
  margin: 10vh auto 0;

  @media (width >= 1366px) {
    margin-top: 20vh;
  }
}

.test.loader {
  height: 80px;
}

.forecast-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80px;
  padding: 15px 0;
  margin-top: 32px;
  overflow: hidden;

  @media (width >= 768px) {
    flex-direction: row;
  }

  @media (width >= 1366px) {
    margin-top: 10vh;
  }
}

// Transitions
.fade-enter-active {
  transition: opacity 0.3s ease-out 0.4s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-out-leave-active {
  transition: all 0.2s linear;
}

.forecast-btn.fade-out-leave-to {
  height: 0;
  padding: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 1s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(130%);
}

.drop-enter-active {
  transition: all 0.5s ease-out;
}

.drop-enter-from {
  transform: translateY(-150%);
}

@media (width <= 767px) {
  .drop-enter-from:nth-child(2),
  .drop-enter-from:nth-child(3) {
    opacity: 0;
    transform: translateY(-121%);
  }
}

// Loop for transition delay

/* stylelint-disable-next-line at-rule-no-unknown */
@for $i from 1 through 3 {
  .drop-enter-active:nth-child(#{$i}n) {
    transition-delay: #{$i * 0.5}s;
  }
}
</style>
