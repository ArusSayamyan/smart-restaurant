<template>
  <div class="tables">
      <h1 class="tables__title">Select a table</h1>
      <div class="tables__tableWrapper">
        <div class="tables__content" v-for="table in tables" :key="table" @click="emitEvent(table)">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">{{ table }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
// import {ref} from 'vue';
import {defineEmits} from 'vue';
const tables = [1, 2, 3, 4, 5, 6, 7]

const emit = defineEmits(['myEvent'])

const emitEvent = (table)=> {
  emit('myEvent', table)
}

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

  &__title {
    margin-top: 0;
  }

  &__content {
    max-width: 100px;
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
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    margin: 0;
  }

  &__img {
    width: 30px;
  }
}
</style>