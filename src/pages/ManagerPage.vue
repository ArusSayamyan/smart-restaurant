<template>
  <base-wrapper>
    <div class="managerPage">
      <h1>
        Manager
      </h1>
      <div class="managerPage__checks">
        <TableList/>
        <order-list></order-list>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
import TableList from "@/components/TablesList.vue";
import BaseWrapper from "@/base/BaseWrapper.vue";

// let orders = JSON.parse(localStorage.getItem("order"))
</script>
<style scoped lang="scss">
.managerPage {

  &__checks {
    display: flex;
  }
}
</style>