<template>
  <base-wrapper>
    <div class="tables">
      <h1>Select a table</h1>
      <div class="tables__tableWrapper">
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">1</p>
        </div>
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">2</p>
        </div>
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">3</p>
        </div>
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">4</p>
        </div>
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">5</p>
        </div>
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">6</p>
        </div>
        <div class="tables__content">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">7</p>
        </div>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>

import BaseWrapper from "@/base/BaseWrapper.vue";
</script>

<style scoped lang="scss">
.tables {
  &__tableWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
  }

  &__content {
    max-width: 300px;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: cadetblue;
    cursor: pointer;
  }

  &__number {
    text-align: center;
    font-size: 28px;
    color: #ffffff;
    font-weight: 700;
  }

  &__img {
    width: 80px;
  }
}
</style>