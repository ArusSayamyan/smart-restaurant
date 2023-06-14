<template>
  <base-wrapper>
    <div class="waitersPage">
      <h1 class="waitersPage__title">
        free tables in the restaurant
      </h1>
      <div class="waitersPage__mainContent">
        <div class="waitersPage__tablesContent">
          <div class="waitersPage__table">
            <p class="waitersPage__tableNum">N1</p>
            <img src="../assets/table.png" alt="" class="waitersPage__tableImg">
          </div>
          <div class="waitersPage__table">
            <p class="waitersPage__tableNum">N2</p>
            <img src="../assets/table.png" alt="" class="waitersPage__tableImg">
          </div>
          <div class="waitersPage__table">
            <p class="waitersPage__tableNum">N3</p>
            <img src="../assets/table.png" alt="" class="waitersPage__tableImg">
          </div>
          <div class="waitersPage__table">
            <p class="waitersPage__tableNum">N4</p>
            <img src="../assets/table.png" alt="" class="waitersPage__tableImg">
          </div>
          <div class="waitersPage__table">
            <p class="waitersPage__tableNum">N5</p>
            <img src="../assets/table.png" alt="" class="waitersPage__tableImg">
          </div>
        </div>
        <div class="waitersPage__formWrapper">
          <form action="" class="waitersPage__form">
            <input type="number" class="waitersPage__tableNumInput" placeholder="Table number">
            <div class="card flex justify-content-center">
              <MultiSelect v-model="selectedBurger" :options="burger" filter :optionLabel="optionGroupLabel" placeholder="Select Burger"
                           :maxSelectedLabels="3" class="w-full md:w-20rem" />
            </div>
            <div class="card flex justify-content-center">
              <MultiSelect v-model="selectedDessert" :options="desserts" filter :optionLabel="optionGroupLabel" placeholder="Select Dessert"
                           :maxSelectedLabels="3" class="w-full md:w-20rem" />
            </div>
            <div class="card flex justify-content-center">
              <MultiSelect v-model="selectedBeverrage" :options="beverrages" filter :optionLabel="optionGroupLabel" placeholder="Select Cities"
                           :maxSelectedLabels="3" class="w-full md:w-20rem" />
            </div>
            <button class="waitersPage__saveOrderBtn">Save order</button>
          </form>
        </div>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
import BaseWrapper from "@/base/BaseWrapper.vue";
import MultiSelect from 'primevue/multiselect';

import { ref } from "vue";

const selectedBurger = ref();
const selectedDessert = ref();
const selectedBeverrage = ref();
const burger = ref([
  { name: 'Egg burger', code: 'NY', price: 3 },
  { name: 'Beef burger', code: 'RM', price: 5 },
  { name: 'Cheese burger', code: 'LDN', price: 6 },
  { name: 'Creamy mushroom', code: 'IST', price: 7 },
  { name: 'Spicy chicken', code: 'PRS', price: 6 },
  { name: 'Barbeque chicken', code: 'PRS', price: 9 }
]);

const desserts = ref([
  { name: 'Melon ice cream', code: 'NY', price: 4 },
  { name: 'Apple pie', code: 'RM', price: 4 },
  { name: 'Red velvet cake', code: 'LDN', price: 4 },
  { name: 'Fruit salad', code: 'IST', price: 7 }
]);

const beverrages = ref([
  { name: 'Lemonade', code: 'NY', price: 3 },
  { name: 'Soft drink', code: 'RM', price: 5 },
  { name: 'Lemon tea', code: 'LDN', price: 6 },
  { name: 'Milk shake', code: 'IST', price: 7 },
  { name: 'Orange juice', code: 'IST', price: 6 },
  { name: 'Apple juice', code: 'IST', price: 9 },
  { name: 'Berry frappe', code: 'IST', price: 12 }
]);
const optionGroupLabel = (group) => {

  return group.name + ' - ' +  group.price + '$';

};

</script>

<style scoped lang="scss">
.waitersPage {
  width: 100%;

  &__title {
    font-size: 35px;
    text-align: center;
    font-weight: 700;
    color: green;
    text-transform: uppercase;
    margin-bottom: 55px;
  }

  &__mainContent {
    display: flex;
    justify-content: space-between;
  }

  &__tablesContent {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 25px 10px;
    width: 50%;

    @media(max-width: 750px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &__table {
    object-fit: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 40%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  &__tableImg {
    max-width: 100px;
    height: auto;
    width: 100%;
  }

  &__formWrapper {
    max-width: 350px;
    width: 100%;
  }

  &__form {
    width: 100%;
    padding: 25px;
    box-sizing: border-box;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    border-radius: 8px;
  }

  &__saveOrderBtn {
    max-width: 150px;
    width: 100%;
    padding: 10px 0;
    border: none;
    border-radius: 8px;
    margin: 0 auto;
    display: block;
    background: green;
    text-transform: uppercase;
    font-weight: 600;
    color: #fff;
    cursor: pointer;

    &:hover {
      background: #ffffff;
      outline: 2px solid green;
      color: green;
    }
  }

  &__tableNumInput {
    background: #ffffff;
    border: 1px solid #ced4da;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 6px;
    padding: 13px 13px;
    font-size: 16px;
    margin-bottom: 20px;
    width: 100%;
    outline: none;
  }
}

.p-component {
  width: 100%;
  margin-bottom: 20px;
}
</style>