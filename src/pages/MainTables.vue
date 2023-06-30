<template>
  <div class="tables">
    <h1 class="tables__title" v-if="waiters.id.includes('waiter')">Select a table</h1>
    <div class="tables__tableWrapper">
      <div class="tables__content" v-for="table in tables" :key="table.table"
           @click="!table.selected ? emitEvent(table.table) : allLists(table.table)"
           :class="{'tables__selected': table.selected, 'tables__selected--disabled': table.disabled}">
        <img src="../assets/table.png" alt="" class="tables__img">
        <p class="tables__number">{{ table.table }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter();

import {useStore} from "vuex";

const store = useStore()
import {defineEmits} from 'vue';

const tables = [
  {
    table: 1,
    selected: false,
    disabled: false
  },
  {
    table: 2,
    selected: false,
    disabled: false

  },
  {
    table: 3,
    selected: false,
    disabled: false

  },
  {
    table: 4,
    selected: false,
    disabled: false

  },
  {
    table: 5,
    selected: false,
    disabled: false

  },
  {
    table: 6,
    selected: false,
    disabled: false

  },
  {
    table: 7,
    selected: false,
    disabled: false

  }
]
const waiters = JSON.parse(localStorage.getItem('name'))
const emit = defineEmits(['myEvent'])
let tablesList = [];
if (localStorage.getItem('tables')) {
  tablesList = JSON.parse(localStorage.getItem('tables'))
  for (let tab of tables) {
    for (let selTable of tablesList) {
      if (tablesList && selTable.table === tab.table) {
        tab.selected = true;
      }
    }
  }

}



//make tables disables


const emitEvent = (table) => {
  emit('myEvent', table)
}

function allLists(table) {
  store.commit('selectTable', table)
  router.push('/orderList/' + waiters.id)
}

for(let obj of tables) {
  for(let tab of tablesList) {
    if(obj.selected && tab.id !== waiters.id && obj.table === tab.table) {
      obj.disabled = true
    }if(waiters.statue === 'cashier') {
      obj.disabled = false
    }
  }

 if (localStorage.getItem(waiters.id)) {
   const prods = JSON.parse(localStorage.getItem(waiters.id))
   for(let prod of prods) {
     for(let item of prod) {
       if(item.table === obj.table) {
         obj.disabled = false
       }
     }
   }
 }
}

</script>

<style scoped lang="scss" src="../styles/mainTables.scss"></style>