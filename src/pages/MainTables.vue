<template>
  <div class="tables">
    <h1 class="tables__title" v-if="waiters.id.includes('waiter')">Select a table</h1>
    <div class="tables__tableWrapper">
      <div class="tables__content" v-for="table in tables" :key="table.table"
           @click="!table.selected ? emitEvent(table.table) : allLists(table.table)"
           :class="{'tables__selected': table.selected, 'tables__selected--disabled': table.disabled}">
        <img src="../assets/table.png" alt="" class="tables__img">
        <img src="../assets/payedOrder.svg" alt="" class="tables__printed" v-if="table.isPrinted">
        <p class="tables__number">{{ table.table }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

//IMPORT VUE COMPONENTS
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import {defineEmits} from 'vue';

//VARIABLES
const store = useStore()
const router = useRouter();


const tables = [
  {
    table: 1,
    selected: false,
    disabled: false,
    isPrinted: false
  },
  {
    table: 2,
    selected: false,
    disabled: false,
    isPrinted: false

  },
  {
    table: 3,
    selected: false,
    disabled: false,
    isPrinted: false


  },
  {
    table: 4,
    selected: false,
    disabled: false,
    isPrinted: false


  },
  {
    table: 5,
    selected: false,
    disabled: false,
    isPrinted: false


  },
  {
    table: 6,
    selected: false,
    disabled: false,
    isPrinted: false


  },
  {
    table: 7,
    selected: false,
    disabled: false,
    isPrinted: false


  }
]
const waiters = JSON.parse(localStorage.getItem('name'))
const emit = defineEmits(['myEvent'])
let tablesList = [];
let result;



if (localStorage.getItem('tables')) {
  tablesList = JSON.parse(localStorage.getItem('tables'))
  for (let tab of tables) {
    for (let selTable of tablesList) {
      if (tablesList && selTable.table === tab.table) {
        tab.selected = true;
      }
      if (selTable.table === tab.table && selTable.isPrinted) {
        tab.isPrinted = true;
      }
    }
  }

}


//MAKE TABLE DISABLED
const emitEvent = (table) => {
  emit('myEvent', table)
  store.commit('selectTable', table)


}

function allLists(table) {
  store.commit('selectTable', table)
  for (let tab of tables) {
    if (waiters.statue === 'cashier' && tab.selected && tab.isPrinted && tab.table === table) {
      router.push('/orderList/' + waiters.id)
      return;
    }
    else if(waiters.statue !== 'cashier' && tab.selected && tab.table === table) {
      router.push('/orderList/' + waiters.id)
      return;
    }
    else {
      const getProducts = JSON.parse(localStorage.getItem('tables'))
      for (let obj of getProducts) {
        if (obj.table === table) {
          result = JSON.parse(localStorage.getItem(obj.id))
        }
      }
      if(result) {
        let arr = result.filter(subArray =>
            subArray.some(obj => obj.table === table)
        );
        for (let i = 0; i < arr.length; i++) {
          store.commit('updateProducts', arr[arr.length - 1])
        }
      }
      router.push('/order')
    }

  }
}


  for (let obj of tables) {
    for (let tab of tablesList) {
      if (obj.selected && tab.id !== waiters.id && obj.table === tab.table) {
        obj.disabled = true
      }
      if (waiters.statue !== 'waiter') {
        obj.disabled = false
      }
    }

    if (localStorage.getItem(waiters.id)) {
      const prods = JSON.parse(localStorage.getItem(waiters.id))
      for (let prod of prods) {
        for (let item of prod) {
          if (item.table === obj.table) {
            obj.disabled = false
          }
        }
      }
    }
  }


</script>

<style scoped lang="scss" src="../styles/mainTables.scss"></style>