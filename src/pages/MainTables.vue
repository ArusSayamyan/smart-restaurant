<template>
  <div class="tables">
      <h1 class="tables__title">Select a table</h1>
      <div class="tables__tableWrapper">
        <div class="tables__content" v-for="table in tables" :key="table.table" @click="emitEvent(table.table)" :class="{'tables__selected': table.selected}">
          <img src="../assets/table.png" alt="" class="tables__img">
          <p class="tables__number">{{ table.table }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
// import {ref} from 'vue';
import {defineEmits} from 'vue';
const tables = [
  {
    table: 1,
    selected: false
  },
  {
    table: 2,
    selected: false
  },
  {
    table: 3,
    selected: false
  },
  {
    table: 4,
    selected: false
  },
  {
    table: 5,
    selected: false
  },
  {
    table: 6,
    selected: false
  },
  {
    table: 7,
    selected: false
  }
]
const emit = defineEmits(['myEvent'])
const tablesList = JSON.parse(localStorage.getItem('tables'))

for(let tab of tables) {
  if(tablesList && tablesList.includes(tab.table)) {
    tab.selected = true;
  }
}

const emitEvent = (table)=> {
  emit('myEvent', table)
}

</script>

<style scoped lang="scss" src="../styles/mainTables.scss"></style>