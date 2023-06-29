<template>
  <base-wrapper>
    <PrintOrder v-if="printOrder"></PrintOrder>
    <div class="orderListPage">
      <h1>Order list page</h1>
      <div class="orderListPage__wrapper">
        <div class="orderListPage__checkList">
          <img src="../assets/pencil.svg" alt="" class="orderListPage__editList" @click="editList" v-if="!showPayBlock">
          <img src="../assets/payedOrder.svg" alt="" class="orderListPage__editList" v-else-if="orderPayed">
          <div class="orderListPage__list" v-for="item in products" :key="item">
            <div v-if="item.table === table">
              <p class="orderListPage__prodItem">{{ item.name }}-{{ item.count }}
                {{ item.count * item.price }}$</p>
            </div>
          </div>
          <p class="orderListPage__totalPrice">total Price {{ totalPrice }}$</p>
        </div>
        <div class="orderListPage__payBlock" v-if="showPayBlock">
          <CalculateInput @payOrder="payedOrder"/>
        </div>
      </div>

    </div>
  </base-wrapper>
</template>


<script setup>
const PrintOrder = defineAsyncComponent(() =>
    import('@/components/PrintOrder.vue')
)
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {computed, defineAsyncComponent, ref} from 'vue'

//import components
import BaseWrapper from "@/base/BaseWrapper.vue";
import CalculateInput from "@/components/CalculateInput.vue";

//variables
const showPayBlock = ref(false)
const router = useRouter()
const store = useStore();
const orderPayed = ref(false);
const printOrder = ref(false);



const loginId = store.getters.getLoginId;
const table = store.getters.getTable
let productsList = JSON.parse(localStorage.getItem(loginId))
let products;



//chashie chan see all orderLists
if (loginId.includes('cashier')) {
  showPayBlock.value = true;
  const getProducts = JSON.parse(localStorage.getItem('tables'))
  for (let obj of getProducts) {
    if (obj.table === table) {
      productsList = JSON.parse(localStorage.getItem(obj.id))
    }
  }
}

//UPDATE CHANGED ORDER LIST
let arr = productsList.filter(subArray =>
    subArray.some(obj => obj.table === table)
);
for (let i = 0; i < arr.length; i++) {
  products = arr[arr.length - 1]
}

//get total price

const totalPrice = computed(() => {
  let price = 0;
  for(let item of products) {
    price += item.count * +item.price
  }
  return price;
});


//emit payed value

function payedOrder (payed) {
  printOrder.value = true
  setTimeout(() => {
    printOrder.value = false
    orderPayed.value = payed
  }, 3000)
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

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__checkList {
    height: fit-content;
  }

  &__totalPrice {
    text-transform: uppercase;
    font-weight: bold;
    font-style: italic;
  }
}
</style>