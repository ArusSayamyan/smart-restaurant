<template>
<div class="homePage">
  <TheNav/>
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
import TheNav from "@/layout/TheNav.vue";
import data from '@/json/data.json'
const enteredCode = ref();
const status = ref('');
const codeNotFound = ref(false)
function checkCode() {
  for(let obj of data) {
    if(enteredCode.value === +obj.code){
      status.value = obj.status
      enteredCode.value = null;
      window.location.replace('/' + status.value)
    }else {
      codeNotFound.value = true
    }
  }
}
</script>
<style scoped lang="scss" src="../styles/app.scss">

</style>