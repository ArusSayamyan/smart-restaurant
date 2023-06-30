<template>
<div class="homePage">
  <base-wrapper>
    <div class="homePage__signIn">
      <form action="" class="homePage__signInForm" @submit.prevent="checkCode">
        <h3 class="homePage__formTitle">enter your access code</h3>
        <div class="homePage__inputBlock">
          <input type="number" required class="homePage__pin" placeholder="your code" v-model="enteredCode">
          <p class="homePage__codeNotFound" v-if="codeNotFound">This code not found</p>
        </div>
        <button class="homePage__btn">Login</button>
      </form>
    </div>
  </base-wrapper>
</div>
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import data from '@/json/data.json'
const enteredCode = ref();
const status = ref('');
const codeNotFound = ref(false)
const router = useRouter()
const store = useStore()
// const route = useRoute()
function checkCode() {
  for(let obj of data) {
    if(enteredCode.value === +obj.code){
      store.commit('changeLoginId', obj.id)
      status.value = obj.status
      enteredCode.value = null;
      router.push('/' + status.value + '/' + obj.id)
      localStorage.setItem('name', JSON.stringify({
        name: obj.name,
        statue: obj.status,
        id: obj.id
      }))
    }else {
      codeNotFound.value = true
    }
  }
}

// localStorage.clear();
</script>
<style scoped lang="scss" src="../styles/app.scss">

</style>