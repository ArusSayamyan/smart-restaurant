<template>
  <div class="mainContainer">
    <TheNav/>
    <router-view>

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

</style>
<style lang="scss" src="./styles/app.scss"></style>
