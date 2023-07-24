<template>
  <base-wrapper>
    <PrintOrder v-if="printOrder" :minPrice="minPrice" printId="paid"></PrintOrder>
    <div class="orderListPage">
      <ReasonDialog :showModal="showReasonModal"  @update:showModal="updateDialogVisible"></ReasonDialog>
      <transition-group name="p-message" tag="div" v-if="orderDeleted">
        <Message severity="success" key="message1"> Order successfully deleted</Message>
      </transition-group>
      <transition-group name="p-message" tag="div" v-if="errorText">
        <Message severity="error" key="message1"> little money</Message>
      </transition-group>
      <h1>Order list page</h1>
      <div class="orderListPage__wrapper">
        <div class="orderListPage__checkList">
          <img src="../assets/pencil.svg" alt="" class="orderListPage__editList" @click="editList" v-if="!loginId.includes('cashier')">
          <img src="../assets/pay.svg" alt="" class="orderListPage__editList orderListPage__editList--payCard"
               v-if="showPayCard" @click="payForOrder">
          <img src="../assets/trash.svg" alt="" class="orderListPage__editList orderListPage__editList--delCard"
               v-if="showPayCard" @click="delOrder">
          <img src="../assets/payedOrder.svg" alt="" class="orderListPage__editList" v-else-if="orderPaid">
          <div class="orderListPage__list" v-for="item in products" :key="item">
            <div v-if="item.table === table">
              <p class="orderListPage__prodItem">{{ item.name }}-{{ item.count }}
                {{ item.count * item.price }}$</p>
            </div>
          </div>
          <p class="orderListPage__totalPrice">total Price {{ totalPrice }}$</p>
          <p class="orderListPage__totalPrice">Table {{ table }}</p>
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

//IMPORT COMPONENTS FROM PRIME-VUE
import Message from "primevue/message";

//IMPORT COMPONENTS
import BaseWrapper from "@/base/BaseWrapper.vue";
import CalculateInput from "@/components/CalculateInput.vue";
import ReasonDialog from "@/components/ReasonDialog.vue";

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
const orderDeleted = ref(false);
const showReasonModal = ref(false);
const errorText = ref(false);
const minPrice = ref(null);
const loginId = store.getters.getLoginId;
const table = store.getters.getTable
let productsList
let products;
const waiter = JSON.parse(localStorage.getItem('name'))

if(JSON.parse(localStorage.getItem(loginId))) {
  productsList = JSON.parse(localStorage.getItem(loginId));
}

//CASHIER AND MANAGER CAN SEE OLL ORDERS
if (loginId.includes('cashier')) {
  showPayBlock.value = true;
  const getProducts = JSON.parse(localStorage.getItem('tables'))
  for (let obj of getProducts) {
    if (obj.table === table) {
      productsList = JSON.parse(localStorage.getItem(obj.id))
    }
  }
} else if (loginId.includes('manager')) {
  showPayCard.value = true;
  const getProducts = JSON.parse(localStorage.getItem('tables'))
  for (let obj of getProducts) {
    if (obj.table === table) {
      productsList = JSON.parse(localStorage.getItem(obj.id))
    }
  }
}


//UPDATE  ORDER LIST
if(productsList) {
  let arr = productsList.filter(subArray =>
      subArray.some(obj => obj.table === table)
  );
  for (let i = 0; i < arr.length; i++) {
    products = arr[arr.length - 1]
  }
}

//GET TOTAL PRICE
const totalPrice = computed(() => {
  let price = 0;
  for (let item of products) {
    price += item.count * +item.price
  }
  return price;
});

//EMIT PAID VALUE AND ADD PRINTING COMPONENT WITH ANIMATION
function paidOrder(paid, price) {
  const userPrice = parseInt(price.match(/\d+/)[0]);
  if(userPrice > totalPrice.value) {
    printOrder.value = true
    minPrice.value = userPrice - totalPrice.value
    setTimeout(() => {
      printOrder.value = false
      router.push('/' + waiter.statue + '/' + waiter.id)
    }, 3000)
  } else if(userPrice === totalPrice.value) {
    printOrder.value = true
    setTimeout(() => {
      printOrder.value = false
      router.push('/' + waiter.statue + '/' + waiter.id)
    }, 3000)
  } else {
    errorText.value = true
    orderPaid.value = false
    printOrder.value = false
  }
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

//SHOW MODAL FOR DELETING ORDER
function delOrder() {
  showReasonModal.value = true;
}

function updateDialogVisible(newValue) {
  showReasonModal.value = newValue;
}
</script>

<style scoped lang="scss" src="@/styles/orderListPage.scss"></style>