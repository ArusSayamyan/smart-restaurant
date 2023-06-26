<template>
  <base-wrapper>
    <div class="createOrder">
      <div class="createOrder__block">
        <div class="createOrder__categories">
          <MainTables @myEvent="getTableNumber"/>
          <div class="createOrder__selectedDesc">
            <div class="createOrder__box">
              <div class="createOrder__freeBox"></div>
              <span class="createOrder__tableStatus">Free Tables</span>
            </div>
            <div class="createOrder__box">
              <div class="createOrder__selectedBox"></div>
              <span class="createOrder__tableStatus">Selected Tables</span>
            </div>
          </div>
        </div>
        <div class="createOrder__info">
          <div class="createOrder__list">
            <p class="createOrder__desc">Count of guests</p>
            <p class="createOrder__count" ref="addCount" @click="setCount"></p>
          </div>
          <div class="createOrder__list">
            <p class="createOrder__desc">Table</p>
            <p class="createOrder__count">{{ tabNumber }}</p>
          </div>
        </div>
        <div class="createOrder__inputs">
          <div class="createOrder__number">
            <input type="number" class="createOrder__input" ref="count">
          </div>
          <div class="createOrder__content">
            <p class="createOrder__btn" @click="getNumber($event)">7</p>
            <p class="createOrder__btn" @click="getNumber($event)">8</p>
            <p class="createOrder__btn" @click="getNumber($event)">9</p>
            <p class="createOrder__btn" @click="getNumber($event)">4</p>
            <p class="createOrder__btn" @click="getNumber($event)">5</p>
            <p class="createOrder__btn" @click="getNumber($event)">6</p>
            <p class="createOrder__btn" @click="getNumber($event)">1</p>
            <p class="createOrder__btn" @click="getNumber($event)">2</p>
            <p class="createOrder__btn" @click="getNumber($event)">3</p>
            <p class="createOrder__btn" @click="getNumber($event)">0</p>
            <p class="createOrder__btn" @click="delNumber">del</p>
          </div>
          <button :disabled="disabled" class="createOrder__create" @click="orderDetails">
            create new order
          </button>
          <!--          <p class="createOrder__create">-->
          <!--            create empty order-->
          <!--          </p>-->
          <div class="createOrder__control">
            <p class="createOrder__del"><img src="../assets/exit.svg" alt="" class="createOrder__icon"></p>
            <p class="createOrder__save"><img src="../assets/check.svg" alt="" class="createOrder__iconSave"></p>
          </div>
        </div>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
import BaseWrapper from "@/base/BaseWrapper.vue";
import {ref} from 'vue';
import MainTables from "@/pages/MainTables.vue";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex';

const store = useStore();

const router = useRouter()

const count = ref();
const addCount = ref();
const tabNumber = ref();
const disabled = ref(true);

function getNumber(event) {
  count.value.value = count.value.value + event.target.textContent
}

function setCount() {
  addCount.value.textContent = count.value.value
  count.value.value = ''
  if (tabNumber.value !== undefined) {
    disabled.value = false
  }
}

//get table number
function getTableNumber(tableNum) {
  tabNumber.value = tableNum
  if (addCount.value.textContent !== '') {
    disabled.value = false
  }
}

// change main page
function orderDetails() {
  const waiter = JSON.parse(localStorage.getItem('name'))
  store.commit('updateSelectedTables', {
    id: waiter.id,
    table: tabNumber.value
  })
  router.push('/order')
}

//delete input value

function delNumber() {
  count.value.value = '';
}

</script>

<style scoped lang="scss" src="../styles/createOrder.scss">
</style>