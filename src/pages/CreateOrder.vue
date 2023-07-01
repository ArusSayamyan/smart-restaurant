<template>
  <base-wrapper>
    <div class="createOrder">
      <div class="createOrder__block">
        <div class="createOrder__categories">
          <MainTables @myEvent="getTableNumber"/>
          <div class="createOrder__selectedDesc">
            <div class="createOrder__box">
              <div class="createOrder__freeBox"></div>
              <span class="createOrder__tableStatus">Free Tables</span>
            </div>
            <div class="createOrder__box">
              <div class="createOrder__selectedBox"></div>
              <span class="createOrder__tableStatus">Selected Tables</span>
            </div>
          </div>
        </div>
        <CalculateInput :tabNumber="tabNumber"></CalculateInput>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>

//IMPORT COMPONENTS
import BaseWrapper from "@/base/BaseWrapper.vue";
import MainTables from "@/pages/MainTables.vue";
import CalculateInput from '@/components/CalculateInput.vue'

//VARIABLES
const tabNumber = ref();
import {ref} from 'vue';

//GET TABLE NUMBER
function getTableNumber(tableNum) {
  tabNumber.value = tableNum
}

</script>

<style scoped lang="scss" src="../styles/createOrder.scss">
</style>