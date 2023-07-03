<template>
  <base-wrapper>
    <PrintOrder v-if="printOrder"></PrintOrder>
    <div class="orderListPage">
      <h1>Order list page</h1>
      <div class="orderListPage__wrapper">
        <div class="orderListPage__checkList">
          <img src="../assets/pencil.svg" alt="" class="orderListPage__editList" @click="editList" v-if="!showPayBlock">
          <img src="../assets/pay.svg" alt="" class="orderListPage__editList orderListPage__editList--payCard" v-if="showPayCard" @click="payForOrder">
          <img src="../assets/trash.svg" alt="" class="orderListPage__editList orderListPage__editList--delCard" v-if="showPayCard" @click="delOrder">
          <img src="../assets/payedOrder.svg" alt="" class="orderListPage__editList" v-else-if="orderPaid">
          <div class="orderListPage__list" v-for="item in products" :key="item">
            <div v-if="item.table === table">
              <p class="orderListPage__prodItem">{{ item.name }}-{{ item.count }}
                {{ item.count * item.price }}$</p>
            </div>
          </div>
          <p class="orderListPage__totalPrice">total Price {{ totalPrice }}$</p>
        </div>
        <div class="orderListPage__payBlock" v-if="showPayBlock">
          <CalculateInput @payOrder="paidOrder"/>
        </div>
      </div>

    </div>
  </base-wrapper>
</template>


<script setup>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {computed, defineAsyncComponent, ref} from 'vue'

//IMPORT COMPONENTS
import BaseWrapper from "@/base/BaseWrapper.vue";
import CalculateInput from "@/components/CalculateInput.vue";
const PrintOrder = defineAsyncComponent(() =>
    import('@/components/PrintOrder.vue')
)
//VARIABLES
const showPayBlock = ref(false)
const showPayCard = ref(false)
const router = useRouter()
const store = useStore();
const orderPaid = ref(false);
const printOrder = ref(false);
const loginId = store.getters.getLoginId;
const table = store.getters.getTable
let productsList = JSON.parse(localStorage.getItem(loginId))
let products;
const waiter = JSON.parse(localStorage.getItem('name'))




//CASHIER AND MANAGER CAN SEE OLL ORDERS
if (loginId.includes('cashier')) {
  showPayBlock.value = true;
  const getProducts = JSON.parse(localStorage.getItem('tables'))
  for (let obj of getProducts) {
    if (obj.table === table) {
      productsList = JSON.parse(localStorage.getItem(obj.id))
    }
  }
}else if(loginId.includes('manager')) {
  showPayCard.value = true;
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

//GET TOTAL PRICE
const totalPrice = computed(() => {
  let price = 0;
  for(let item of products) {
    price += item.count * +item.price
  }
  return price;
});


//EMIT PAID VALUE AND ADD PRINTING COMPONENT WITH ANIMATION
function paidOrder (paid) {
  printOrder.value = true
  orderPaid.value = paid
  setTimeout(() => {
    printOrder.value = false
    router.push('/cashier/' + waiter.id)
  }, 3000)
}


//EDIT ORDER LIST
function editList() {
  const result = products.filter(item => item.table === table)
  store.commit('updateProducts', result)
  router.push('/order')
}

function payForOrder() {
  showPayBlock.value = true
}

//DELETE ORDER
function delOrder() {
  let worker = JSON.parse(localStorage.getItem('tables'))
  let filtered;
  let filteredTabs;
  for (let item of worker) {
    if (item.table === table) {
      const prods = JSON.parse(localStorage.getItem(item.id))
      filtered = prods.filter(subArray =>
          subArray.some(obj => obj.table !== table)
      );
      filteredTabs = worker.filter(obj => obj.table !== table);
      store.commit('updateTables', filteredTabs)
      localStorage.setItem(item.id, JSON.stringify(filtered))
      localStorage.setItem('tables', JSON.stringify(filteredTabs))
    }
    router.push('/manager/' + loginId)
  }
}


</script>
<style scoped lang="scss" src="@/styles/orderListPage.scss">
</style>