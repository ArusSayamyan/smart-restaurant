<template>
  <base-wrapper>
    <PrintOrder v-if="printOrder"></PrintOrder>
    <div class="orderListPage">
      <div class="orderListPage__reasonsModal" v-if="showReasonModal">
        <div class="card flex justify-content-center">
          <Dialog v-model:visible="showReasonModal" maximizable modal header="Reasons for rejection" :style="{ width: '50vw' }">
            <div class="card flex justify-content-center">
              <form @submit="onSubmit" class="flex flex-column gap-2">
                <div class="flex flex-wrap gap-3">
                  <div class="flex align-items-center">
                    <RadioButton v-model="value" inputId="ingredient1" name="pizza2" value="Rotten, acidic, or abnormal smell. Including the unpleasant smells of meats" />
                    <label for="ingredient1" class="ml-2">Rotten, acidic, or abnormal smell. Including the unpleasant smells of meats</label>
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton v-model="value" inputId="ingredient2" name="pizza2" value="Unpleasant Odor or Appearance" />
                    <label for="ingredient2" class="ml-2">Unpleasant Odor or Appearance</label>
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton v-model="value" inputId="ingredient3" name="pizza2" value="Incorrect Order" />
                    <label for="ingredient3" class="ml-2">Incorrect Order</label>
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton v-model="value" inputId="ingredient4" name="pizza2" value="Personal Taste Preferences" />
                    <label for="ingredient4" class="ml-2">Personal Taste Preferences</label>
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton v-model="value" inputId="ingredient4" name="pizza2" value="Portion Size" />
                    <label for="ingredient4" class="ml-2">Portion Size</label>
                  </div>
                </div>
                <div class="orderListPage__switch">
                  <span>add count</span>
                  <InputSwitch v-model="checked" />
                </div>
                <p id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</p>
                <Button type="submit" label="Submit" />
              </form>
            </div>
          </Dialog>
        </div>
      </div>
      <transition-group name="p-message" tag="div" v-if="orderDeleted">
        <Message severity="success">Success Message Content</Message>
      </transition-group>
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

//IMPORT COMPONENTS FROM PRIME-VUE
import Message from "primevue/message";
import InputSwitch from 'primevue/inputswitch';
import Dialog from 'primevue/dialog';
import RadioButton from 'primevue/radiobutton';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import Button from 'primevue/button';

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
const orderDeleted = ref(false);
const showReasonModal = ref(false);
const loginId = store.getters.getLoginId;
const table = store.getters.getTable
let productsList = JSON.parse(localStorage.getItem(loginId))
let products;
const waiter = JSON.parse(localStorage.getItem('name'))
const checked = ref(false);
const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField('value', validateField);
const toast = useToast();


//DELETE ORDER
const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 });
    resetForm();
  }
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
    orderDeleted.value = true
    showReasonModal.value = false
    setTimeout(()=> {
      orderDeleted.value = false
      router.push('/manager/' + loginId)
    }, 3000)
  }
});


function validateField(value) {
  if (!value) {
    return 'Value is required.';
  }

  return true;
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

//SHOW MODAL FOR DELETING ORDER
function delOrder() {
  showReasonModal.value = true;
}


</script>
<style scoped lang="scss" src="@/styles/orderListPage.scss">
</style>