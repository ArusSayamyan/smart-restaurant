<template>
  <base-wrapper>
    <div class="orderListPage">
      <h1>Order list page</h1>
      <div class="orderListPage__checkList">
        <img src="../assets/pencil.svg" alt="" class="orderListPage__editList" @click="editList">
        <div class="orderListPage__list"  v-for="item in products" :key="item">
          <div v-if="item.table === table">
            <p class="orderListPage__prodItem" >{{ item.name }}-{{ item.count }}
              {{ item.count * item.price }}$</p>
          </div>
        </div>
      </div>

    </div>
  </base-wrapper>
</template>


<script setup>

import {useStore} from 'vuex';
import {useRouter} from 'vue-router'

//import components
import BaseWrapper from "@/base/BaseWrapper.vue";

//variables
const router = useRouter()
const store = useStore();

const loginId = store.getters.getLoginId;
const table = store.getters.getTable
const productsList = JSON.parse(localStorage.getItem(loginId))
let products;

let arr = productsList.filter(subArray =>
    subArray.some(obj => obj.table === table)
);
for(let i = 0; i < arr.length; i++) {
  products = arr[arr.length-1]
}


//edit order List
function editList() {
  const result = products.filter(item => item.table === table)
    store.commit('updateProducts', result)
  router.push('/order')
}


</script>
<style scoped lang="scss">
.orderListPage {
  &__checkList {
    max-width: 210px;
    width: 100%;
    border: 1px solid #000;
    padding: 5px;
    border-radius: 5px;
    position: relative;
  }

  &__checkWrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
  }

  &__editList {
    position: absolute;
    right: 8px;
    cursor: pointer;
  }
}
</style>