<template>
  <div class="tableList">
    <div class="tableList__table" v-for="table in tables" :key="table">
      <p class="tableList__tableNum">N{{ table }}</p>
      <div v-for="status in dataArr" :key="status">
        <p class="tableList__tableStatus" v-if="status.status && status.tableNumber === table">Busy</p>
      </div>
      <img src="../assets/table.png" alt="" class="tableList__tableImg">
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const tables = reactive([1, 2, 3, 4, 5])
let dataArr = JSON.parse(localStorage.getItem("order"));

</script>

<style scoped lang="scss">
.tableList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 25px 10px;
  width: 50%;

  &__table {
    object-fit: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 40%;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    position: relative;
  }

  &__tableImg {
    max-width: 100px;
    height: auto;
    width: 100%;
  }

  &__tableStatus {
    position: absolute;
    top: 35px;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 30px;
    transform: rotate(20deg);
    left: 45px;
    color: red;
  }

  @media(max-width: 750px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}


</style>