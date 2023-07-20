<template>
  <div class="mainContainer">
    <TheNav/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import TheNav from "@/layout/TheNav.vue";
import {useRouter} from 'vue-router'

const router = useRouter()

window.onload = function () {
  router.push('/')
}


</script>
<style>
body {
  margin: 0;
  font-family: sans-serif;
}

.mainContainer {
  max-width: 1920px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

</style>
<style lang="scss" src="./styles/app.scss"></style>
