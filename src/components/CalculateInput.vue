<template>
  <div class="calculateInputs">
    <div class="createOrder__info">
      <div class="createOrder__list">
        <p class="createOrder__desc" v-if="waiter.statue !== 'cashier' && !currentRout">Count of guests</p>
        <p class="createOrder__desc" v-else-if="currentRout || waiter.statue === 'cashier'">payment</p>
        <p class="createOrder__count" ref="countOfGuests" @click="setCount"></p>
      </div>
      <div class="createOrder__list" v-if="waiter.statue !== 'cashier' && !currentRout">
        <p class="createOrder__desc">Table</p>
        <p class="createOrder__count" ref="addCount">{{ props.tabNumber }}</p>
      </div>
    </div>
    <div class="createOrder__inputs">
      <div class="createOrder__number">
        <input type="number" class="createOrder__input" ref="count">
      </div>
      <div class="createOrder__content">
        <p class="createOrder__btn" @click="getNumber($event)">7</p>
        <p class="createOrder__btn" @click="getNumber($event)">8</p>
        <p class="createOrder__btn" @click="getNumber($event)">9</p>
        <p class="createOrder__btn" @click="getNumber($event)">4</p>
        <p class="createOrder__btn" @click="getNumber($event)">5</p>
        <p class="createOrder__btn" @click="getNumber($event)">6</p>
        <p class="createOrder__btn" @click="getNumber($event)">1</p>
        <p class="createOrder__btn" @click="getNumber($event)">2</p>
        <p class="createOrder__btn" @click="getNumber($event)">3</p>
        <p class="createOrder__btn" @click="getNumber($event)">0</p>
        <p class="createOrder__btn" @click="delNumber">del</p>
      </div>
      <button :disabled="disabled" v-if="waiter.statue !== 'cashier' && !currentRout" class="createOrder__create" @click="orderDetails">
        create new order
      </button>
      <div class="createOrder__control" v-if="waiter.statue !== 'waiter' && currentRout">
        <div class="createOrder__del"><img src="../assets/exit.svg" alt="" class="createOrder__icon"></div>
        <div class="createOrder__save" @click="emitEvent(true)"><img src="../assets/check.svg" alt="" class="createOrder__iconSave"></div>
      </div>
      <div class="createOrder__control" v-if="waiter.statue === 'manager' && !currentRout">
        <div class="createOrder__del"><router-link to="/stopList" class="createOrder__link">stop list</router-link></div>
        <div class="createOrder__save"><router-link to="/editList" class="createOrder__link">Edit list</router-link></div>
      </div>
    </div>
  </div>
</template>

<script setup>

//IMPORT VUE COMPONENTS
import {ref, defineProps, defineEmits, onUpdated} from 'vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex';

//VARIABLES
const store = useStore();
const router = useRouter()
const addCount = ref();
const countOfGuests = ref();
const tables = JSON.parse(localStorage.getItem('tables'))
const emit = defineEmits(['payOrder'])
const currentRout = router.currentRoute.value.path.includes('orderList')
const count = ref();
const disabled = ref(true);
const waiter = JSON.parse(localStorage.getItem('name'))

const props = defineProps({
  tabNumber: {type: Number, required: false},
})

//METHODS
function getNumber(event) {
  count.value.value = count.value.value + event.target.textContent
}

function setCount() {
  if (waiter.statue !== 'waiter' && currentRout) {
    countOfGuests.value.textContent = count.value.value + '$'
  } else {
    countOfGuests.value.textContent = count.value.value
  }
  count.value.value = ''
  if (store.getters.getTable && countOfGuests.value.textContent !== '') {
    disabled.value = false
  }
}


function orderDetails() {
  store.commit('updateSelectedTables', {
    id: waiter.id,
    table: props.tabNumber
  })
  router.push('/order')
}

//DELETE INPUT VALUES

function delNumber() {
  count.value.value = '';
}

//PAY FOR ORDER
const emitEvent = (paid) => {
  if (countOfGuests.value.textContent) {
    emit('payOrder', paid)
    countOfGuests.value.textContent = '';
    const table = store.getters.getTable

    //delete paid order from localStorage
    const changedTables = tables.filter(item => item.table !== table)
    localStorage.setItem('tables', JSON.stringify(changedTables))
    store.commit('updateTables', changedTables)

    //delete paid order products from localStorage
    let waiterId = '';
    for (let obj of tables) {
      if (table === obj.table) {
        waiterId = obj.id
        const productList = JSON.parse(localStorage.getItem(waiterId))
        const filteredProds = productList.filter(subArray =>
            subArray.some(obj => obj.table !== table)
        );
        localStorage.setItem(waiterId, JSON.stringify(filteredProds))
      }
    }
  }
}

onUpdated(() => {
  if(store.getters.getTable && countOfGuests.value.textContent) {
    disabled.value = false
  }
})

</script>


<style scoped lang="scss" src="../styles/createOrder.scss"></style>