<template>
<base-wrapper>
  <div class="cashierPage">
    <h1 class="cashierPage__title">Cashier</h1>
    <div class="cashierPage__wrapper">
      <div class="cashierPage__tables">
        <MainTables  @myEvent="getTableNumber"/>
      </div>
    </div>
  </div>
</base-wrapper>
</template>

<script setup>
//IMPORT COMPONENTS
import BaseWrapper from "@/base/BaseWrapper.vue";
import MainTables from "@/pages/MainTables.vue";
import {ref} from 'vue';
const tabNumber = ref();

function getTableNumber(tableNum) {
  tabNumber.value = tableNum
}

</script>

<style scoped lang="scss">
.cashierPage {
  padding-top: 90px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    column-gap: 55px;
  }

  &__tables {
    width: 100%;
  }
}
</style>