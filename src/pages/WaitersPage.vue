<template>
  <div class="waitersPage">
    <div class="waitersPage__header">
      <p class="waitersPage__date">{{ date }}</p>
      <p class="waitersPage__date">{{ object.statue }}  {{ object.name }}</p>
    </div>
    <base-wrapper>
      <div class="waitersPage__main">
        <div class="waitersPage__orders">
          <router-link :to="object.id + '/createOrder'" class="waitersPage__createOrder">
            <span class="waitersPage__text">Create order</span>
          </router-link>
          <div class="waitersPage__createOrder">
            <p class="waitersPage__text">change order</p>
          </div>
          <div class="waitersPage__exit" @click="exit">
            <img src="../assets/exit.svg" alt="" class="waitersPage__exitImg">
          </div>
        </div>
      </div>
    </base-wrapper>
  </div>
</template>

<script setup>
//
import {computed} from "vue";
// import {defineAsyncComponent} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const object = JSON.parse(localStorage.getItem('name'))

//FUNCTION EXIT

function exit() {
  router.push('/')
}

const date = computed(()=> {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate();

  if(month < 10) {
    month = '0' + month
  }

// Get time
  const hours = today.getHours();
  let minutes = today.getMinutes();
  // if(minutes < 10) {
  //   minutes = '0' + minutes
  // }

  return `${year}-${month}-${day} ${hours}:${minutes}`;
})

// const selectedBurger = ref();
// const selectedDessert = ref();
// const selectedBeverage = ref();
// const selectedAppetizer = ref();
// const tableNumber = ref();
// const printing = ref(false);
// const totalPrice = ref(0);
// let dataArr = JSON.parse(localStorage.getItem("order")) || [];

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