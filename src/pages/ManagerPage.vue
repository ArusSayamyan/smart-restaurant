<template>
  <base-wrapper>
    <div class="managerPage">
      <div class="managerPage__checks">
        <MainTables @myEvent="getTableNumber"/>
      </div>
      <CalculateInput :tabNumber="tabNumber" />
    </div>
  </base-wrapper>
</template>

<script setup>
import {ref} from 'vue';
import MainTables from "@/pages/MainTables.vue";
import CalculateInput from "@/components/CalculateInput.vue";


const tabNumber = ref();
function getTableNumber(tableNum) {
  tabNumber.value = tableNum
}
</script>
<style scoped lang="scss">
.managerPage {
  padding-top: 155px;
  display: flex;
  justify-content: space-between;

  &__checks {
    display: flex;
  }
}
</style>