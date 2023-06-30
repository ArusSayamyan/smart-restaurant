<template>
    <nav class="nav">
      <div class="nav__logoWrapper">
        <img src="../assets/logo.png" alt="restaurantLogo" class="nav__logo">
        <span class="nav__restaurantName">Smart Restaurant</span>
      </div>
      <div class="nav__exit" @click="exit" v-if="router.currentRoute.value.path !== '/'">
        <img src="../assets/exit.svg" alt="" class="nav__exitImg">
      </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function exit() {
  router.push('/')
}
</script>

<style scoped lang="scss" src="../styles/theNav.scss"></style>