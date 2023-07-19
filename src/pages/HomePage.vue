<template>
    <div class="homePage">
      <base-wrapper>
        <div class="homePage__signIn">
          <form action="" class="homePage__signInForm" @submit.prevent="checkCode">
            <h3 class="homePage__formTitle">enter your access code</h3>
            <div class="homePage__inputBlock">
              <input type="number" required class="homePage__pin" placeholder="your code" v-model="enteredCode"
                     id="accessCode">
              <p class="homePage__codeNotFound" v-if="codeNotFound">This code not found</p>
              <p class="homePage__codeNotFound" v-if="isMobile">Can't be accessed by phone</p>
            </div>
            <button class="homePage__btn">Login</button>
          </form>
        </div>
      </base-wrapper>
    </div>
</template>

<script setup>

//IMPORT VUE COMPONENTS
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

//IMPORT DATA FROM LOCAL JSON FILE
import data from '@/json/data.json'

//VARIABLES
const enteredCode = ref();
const status = ref('');
const codeNotFound = ref(false)
const isMobile = ref(false)
const router = useRouter()
const store = useStore()

function checkCode() {
  const elem = data.find(item => +item.code === enteredCode.value)
  if (elem !== undefined) {
    if (elem.status !== 'waiter' && window.outerWidth < 420) {
      isMobile.value = true;
    } else {
      store.commit('changeLoginId', elem.id)
      status.value = elem.status
      enteredCode.value = null;
      router.push('/' + status.value + '/' + elem.id)
      localStorage.setItem('name', JSON.stringify({
        name: elem.name,
        statue: elem.status,
        id: elem.id
      }))
      store.commit('updateWorker', {
        name: elem.name,
        statue: elem.status,
        id: elem.id
      })

    }

  } else {
    codeNotFound.value = true
  }
}

const prod = computed(() => {
  return store.getters.getProductList
});

onMounted(() => {
  if (localStorage.getItem('allProducts')) {
    const products = JSON.parse(localStorage.getItem('allProducts'))
    localStorage.setItem('allProducts', JSON.stringify(products))
  } else {
    localStorage.setItem('allProducts', JSON.stringify(prod.value))
  }
})
// localStorage.clear();
</script>
<style scoped lang="scss" src="../styles/app.scss"></style>