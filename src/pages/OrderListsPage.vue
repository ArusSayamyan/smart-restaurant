<template>
  <base-wrapper>
    <div class="orderListPage">
      <h1>Order list page</h1>
      <div class="orderListPage__checkList" >
        <div class="orderListPage__list"  v-for="item in arr" :key="item">
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
import BaseWrapper from "@/base/BaseWrapper.vue";
// import {ref} from "vue";

const store = useStore();
const loginId = store.getters.getLoginId;
// const showList = ref(false);
const table = store.getters.getTable
const productsList = JSON.parse(localStorage.getItem(loginId))
let arr = []
for(let item of productsList) {
  arr = [...item]
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
  }

  &__checkWrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
  }
}
</style>