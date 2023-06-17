<template>
  <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      class="mySwiper"
  >
    <swiper-slide v-for="order in orders" :key="order">
      <div class="orderList" >
        <p>Table N{{ order.tableNumber }}</p>
        <div>
          <ul class="orderList__productsList" v-if="order.selectedAppetizer">
            <li class="orderList__product" v-for="obj in order.selectedAppetizer" :key="obj"> {{ obj.name }} - {{ obj.price }}$</li>
          </ul>
          <ul class="orderList__productsList" v-if="order.selectedBeverage">
            <li class="orderList__product" v-for="obj in order.selectedBeverage" :key="obj"> {{ obj.name }} - {{ obj.price }}$</li>
          </ul>
          <ul class="orderList__productsList" v-if="order.selectedBurger">
            <li class="orderList__product" v-for="obj in order.selectedBurger" :key="obj"> {{ obj.name }} - {{ obj.price }}$</li>
          </ul>
          <ul class="orderList__productsList" v-if="order.selectedDessert">
            <li class="orderList__product" v-for="obj in order.selectedDessert" :key="obj"> {{ obj.name }} - {{ obj.price }}$</li>
          </ul>
          <p class="orderList__productsList">total price</p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-cards';

// import required modules
import {EffectCards} from 'swiper';
// let keys = [];
let orders = JSON.parse(localStorage.getItem('order'));
const modules = [EffectCards]
// orders.forEach(item => {
//   const keys = Object.keys(item)
//   keys.forEach(key => {
//     if(Array.isArray(item[key])) {
//       item[key].forEach(price => {
//         console.log(totalPrice.value += price.price)
//       })
//     }
//
//   })
// })
</script>

<style scoped lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper {
  width: 240px;
  height: 320px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.swiper-slide{
  background-color: #ffffff;
  border: 1px solid #000000;
}

.orderList {
  color: #000000;

  &__productsList {
    list-style: none;
    padding: 0;
  }
}

</style>