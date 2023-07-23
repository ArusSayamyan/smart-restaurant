<template>
    <nav class="nav">
      <div class="nav__logoWrapper">
        <img src="../assets/logo.png" alt="restaurantLogo" class="nav__logo">
        <router-link to="/" class="nav__restaurantName">Smart Restaurant</router-link>
      </div>
      <div class="nav__workerInfo" v-if="router.currentRoute.value.path !== '/'">
        <p>
          <span class="nav__workerName">{{ worker.statue + ' ' + worker.name }}</span> <span class="nav__workerName">{{ date }}</span>
        </p>

      <div class="nav__exit" @click="exit">
        <img src="../assets/exit.svg" alt="" class="nav__exitImg">
      </div>
      </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
const router = useRouter()
const store = useStore()


const worker = computed(()=> {
  return store.getters.getWorker
})

//FUNCTION EXIT
const date = computed(()=> {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  const day = today.getDate();


  if(month < 10) {
    month = '0' + month
  }

//GET TIME
  const hours = today.getHours();
  let minutes = today.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
})
function exit() {
  router.push('/')
  store.commit('updateProducts', [])

}


</script>

<style scoped lang="scss" src="../styles/theNav.scss"></style>