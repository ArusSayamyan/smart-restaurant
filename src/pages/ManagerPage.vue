<template>
  <base-wrapper>
    <div class="managerPage">
      <h1>
        Manager
      </h1>
      <div class="managerPage__checks">
        <order-list></order-list>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
import BaseWrapper from "@/base/BaseWrapper.vue";

</script>
<style scoped lang="scss">
.managerPage {

  &__checks {
    display: flex;
  }
}
</style>