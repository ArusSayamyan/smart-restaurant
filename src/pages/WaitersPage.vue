<template>
  <div class="waitersPage">
    <div class="waitersPage__header">
      <p class="waitersPage__date">{{ date }}</p>
      <p class="waitersPage__date">{{ object.statue }}  {{ object.name }}</p>
    </div>
    <base-wrapper>
      <!--    <teleport to="body"> <print-order v-if="printing"></print-order></teleport>-->
      <div class="waitersPage__main">
        <div class="waitersPage__orders">
          <router-link to="/createOrder" class="waitersPage__createOrder">
            <span class="waitersPage__text">Create order</span>
          </router-link>
          <div class="waitersPage__createOrder">
            <p class="waitersPage__text">change order</p>
          </div>
          <div class="waitersPage__exit" @click="exit">
            <img src="../assets/exit.svg" alt="" class="waitersPage__exitImg">
          </div>
        </div>
        <!--      <div class="waitersPage__mainContent">-->
        <!--        <TableList/>-->
        <!--        <div class="waitersPage__formWrapper">-->
        <!--          <form action="" class="waitersPage__form" @submit.prevent="setData">-->
        <!--            <input type="number" class="waitersPage__tableNumInput" placeholder="Table number" v-model="tableNumber">-->
        <!--            <div class="card flex justify-content-center">-->
        <!--              <MultiSelect v-model="selectedBurger" :options="burger" filter :optionLabel="optionGroupLabel"-->
        <!--                           placeholder="Select Burger"-->
        <!--                           :maxSelectedLabels="3" class="w-full md:w-20rem" @change="getPrice($event)"/>-->
        <!--            </div>-->
        <!--            <div class="card flex justify-content-center">-->
        <!--              <MultiSelect v-model="selectedDessert" :options="desserts" filter :optionLabel="optionGroupLabel"-->
        <!--                           placeholder="Select Dessert"-->
        <!--                           :maxSelectedLabels="3" class="w-full md:w-20rem"  @change="getPrice($event)"/>-->
        <!--            </div>-->
        <!--            <div class="card flex justify-content-center">-->
        <!--              <MultiSelect v-model="selectedBeverage" :options="beverages" filter :optionLabel="optionGroupLabel"-->
        <!--                           placeholder="Select Beverages"-->
        <!--                           :maxSelectedLabels="3" class="w-full md:w-20rem"  @change="getPrice($event)"/>-->
        <!--            </div>-->
        <!--            <div class="card flex justify-content-center">-->
        <!--              <MultiSelect v-model="selectedAppetizer" :options="appetizer" filter :optionLabel="optionGroupLabel"-->
        <!--                           placeholder="Select Appetizer"-->
        <!--                           :maxSelectedLabels="3" class="w-full md:w-20rem"  @change="getPrice($event)"/>-->
        <!--            </div>-->
        <!--            <button class="waitersPage__saveOrderBtn">Save order</button>-->
        <!--            <p class="waitersPage__totalPrice">{{ totalPrice }}$</p>-->
        <!--          </form>-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
    </base-wrapper>
  </div>
</template>

<script setup>
// import BaseWrapper from "@/base/BaseWrapper.vue";
// import MultiSelect from 'primevue/multiselect';
// import TableList from '@/components/TablesList';
//
import {computed} from "vue";
// import {defineAsyncComponent} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const object = JSON.parse(localStorage.getItem('name'))
console.dir(object)
//
// const PrintOrder = defineAsyncComponent(() =>
//     import('@/components/PrintOrder.vue')
// )

//FUNCTION EXIT

function exit() {
  router.push('/')
}

const date = computed(()=> {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate();

// Get time
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
})

// const selectedBurger = ref();
// const selectedDessert = ref();
// const selectedBeverage = ref();
// const selectedAppetizer = ref();
// const tableNumber = ref();
// const printing = ref(false);
// const totalPrice = ref(0);
// let dataArr = JSON.parse(localStorage.getItem("order")) || [];

// const burger = ref([
//   {name: 'Egg burger', code: 'NY', price: 3},
//   {name: 'Beef burger', code: 'RM', price: 5},
//   {name: 'Cheese burger', code: 'LDN', price: 6},
//   {name: 'Creamy mushroom', code: 'IST', price: 7},
//   {name: 'Spicy chicken', code: 'PRS', price: 6},
//   {name: 'Barbeque chicken', code: 'PRS', price: 9}
// ]);
//
// const desserts = ref([
//   {name: 'Melon ice cream', code: 'NY', price: 4},
//   {name: 'Apple pie', code: 'RM', price: 4},
//   {name: 'Red velvet cake', code: 'LDN', price: 4},
//   {name: 'Fruit salad', code: 'IST', price: 7}
// ]);
//
// const beverages = ref([
//   {name: 'Lemonade', code: 'NY', price: 3},
//   {name: 'Soft drink', code: 'RM', price: 5},
//   {name: 'Lemon tea', code: 'LDN', price: 6},
//   {name: 'Milk shake', code: 'IST', price: 7},
//   {name: 'Orange juice', code: 'IST', price: 6},
//   {name: 'Apple juice', code: 'IST', price: 9},
//   {name: 'Berry frappe', code: 'IST', price: 12}
// ]);
//
// const appetizer = ref([
//   {name: 'French fries', code: 'NY', price: 4},
//   {name: 'Nugget', code: 'RM', price: 4},
//   {name: 'Sausage', code: 'LDN', price: 4},
//   {name: 'Chicken wings', code: 'IST', price: 7}
// ]);
//
// const optionGroupLabel = (group) => {
//   return group.name + ' - ' + group.price + '$';
// };
//
//
// //set data to localStorage
// function setData() {
//   //show printing modal
//   printing.value = true;
//
//   //set data to the localStorage
//   let info = {
//     tableNumber: tableNumber.value,
//     selectedBurger: selectedBurger.value,
//     selectedDessert: selectedDessert.value,
//     selectedAppetizer: selectedAppetizer.value,
//     selectedBeverage: selectedBeverage.value,
//     status: true
//   }
//   dataArr.push(info);
//   localStorage.setItem('order', JSON.stringify(dataArr));
//
//   //clear input values after submiting
//   tableNumber.value = ''
//   selectedBurger.value = ''
//   selectedDessert.value = ''
//   selectedAppetizer.value = ''
//   selectedBeverage.value = ''
//
//   //hide printing modal
//   setTimeout(() => {
//     printing.value = false
//   }, 4000)
// }
//
// function getPrice(event) {
//   const initialVal = event.value.reduce(
//       (accumulator, currentValue) => accumulator + currentValue.price,
//       totalPrice.value
//   );
//
//   totalPrice.value = initialVal;
//
// }
</script>

<style scoped lang="scss" src="../styles/waiters.scss"></style>