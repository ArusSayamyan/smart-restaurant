<template>
  <base-wrapper>
    <div class="createOrder">
      <div class="createOrder__block">
        <div class="createOrder__categories">
          <MainTables @myEvent="getTableNumber"/>
          <div>
            <div class="createOrder__orderCategory">
              <p class="createOrder__item">Main</p>
              <p class="createOrder__item"></p>
              <p class="createOrder__item"></p>
              <p class="createOrder__item"></p>
              <p class="createOrder__item"></p>
              <p class="createOrder__item"></p>
            </div>
            <div class="createOrder__checkWrapper">
              <div class="createOrder__checkList"  v-for="item in productsList" :key="item">
                <div class="createOrder__list">
                  <div v-for="obj in item" :key="obj">
                    <p v-if="obj.tableNumber">Table number - {{ obj.tableNumber }}</p>
                    <p class="createOrder__prodItem" v-if="obj.name">{{ obj.name }}-{{ obj.count }}
                      {{ obj.count * obj.price }}$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="createOrder__info">
          <div class="createOrder__list">
            <p class="createOrder__desc">Count</p>
            <p class="createOrder__count" ref="addCount" @click="setCount"></p>
          </div>
          <div class="createOrder__list">
            <p class="createOrder__desc">Table</p>
            <p class="createOrder__count" ref="tableText">{{ tabNumber }}</p>
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
          <p class="createOrder__create">
            create empty order
          </p>
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
const tableText = ref();
const addCount = ref();
const tabNumber = ref();
const disabled = ref(true);


const productsList = JSON.parse(localStorage.getItem('selectedItems'))

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
  store.commit('updateSelectedProducts', {
    tableNumber: tabNumber.value
  })
  router.push('/order')
}

//delete input value

function delNumber() {
  count.value.value = '';
}

</script>

<style scoped lang="scss">
.createOrder {
  padding: 20px;
  box-sizing: border-box;

  &__block {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px 0;
  }

  &__btn {
    flex-basis: 30%;
    text-align: center;
    margin: 0;
    padding: 15px 0;
    box-sizing: border-box;
    background: cadetblue;
    color: #ffff;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;

    &:last-child {
      flex-basis: 65%;
    }
  }

  &__input {
    background: cadetblue;
    padding: 10px 0;
    margin-bottom: 10px;
    border: 2px solid #4e7475;
    width: 100%;
    outline: none;
  }

  &__create {
    padding: 15px;
    text-transform: uppercase;
    background: #4c74bcb5;
    cursor: pointer;
    border: none;
    display: block;
    width: 100%;
    margin-top: 8px;
    font-size: 16px;

    &[disabled=disabled], &:disabled {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: unset
    }
  }

  &__control {
    display: flex;
    justify-content: space-between;
  }

  &__del, &__save {
    width: 100px;
    background: red;
    margin: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__save {
    background: green;
  }

  &__icon {
    width: 25px;
  }

  &__iconSave {
    width: 35px;
  }

  &__info {
    margin-right: 35px;
  }

  &__count {
    margin: 0;
    padding: 15px 25px;
    background: darkgray;
    width: 100px;
    height: 55px;
    display: block;
  }

  &__desc {
    margin: 8px 0;
  }

  &__categories {
    width: 100%;
    margin-right: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
  }

  &__orderCategory {
    display: flex;
    justify-content: space-between;

    &:first-child {
      margin-bottom: 15px;
    }
  }

  &__item {
    margin: 0;
    padding: 20px;
    background: #85CCEB;
    max-width: 135px;
    width: 100%;
    text-align: center;
    height: 58px;
    font-weight: 700;
    font-size: 20px;

    &:first-child {
      background: darkgray;
    }
  }

  &__checkList {
    max-width: 210px;
    width: 100%;
    border: 1px solid #000;
    padding: 5px;
    border-radius: 5px;
  }

  &__prodItem {
    padding: 5px;
    border-bottom: 1px solid #3c3637;
    margin: 3px 0;
  }

  &__checkWrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
  }

}
</style>