<script setup lang="ts"></script>

<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  left: 50%;
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-left: -40px;
}

.loader div {
  position: absolute;
  left: 8px;
  display: inline-block;
  width: 16px;
  background: #fff;
  animation: loader-adnimation 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.loader div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}

.loader div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}

.loader div:nth-child(3) {
  left: 56px;
  animation-delay: 0s;
}

@keyframes loader-adnimation {
  0% {
    top: 8px;
    height: 64px;
  }

  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
