<template>
  <base-wrapper>
    <div class="managerPage">
      <div class="managerPage__checks">
        <MainTables/>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
import BaseWrapper from "@/base/BaseWrapper.vue";
import MainTables from "@/pages/MainTables.vue";

</script>
<style scoped lang="scss">
.managerPage {

  &__checks {
    display: flex;
  }
}
</style>