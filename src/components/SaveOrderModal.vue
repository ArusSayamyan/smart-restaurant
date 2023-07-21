<template>
  <div>
    <PrintOrder v-if="printOrder"></PrintOrder>
    <div class="saveOrderModal" :id="props.id" v-if="props.showModal || props.showCancelModal">
      <div class="saveOrderModal__content">
        <p class="saveOrderModal__desc" v-if="!orderIsEmpty">{{ props.content }}</p>
        <p class="saveOrderModal__desc" v-else>Order is empty</p>
        <div class="saveOrderModal__btns">
          <button class="saveOrderModal__enter" v-if="!orderIsEmpty" @click="saveOrder">Ok</button>
          <button class="saveOrderModal__cancel" @click="cancelOrder">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

//IMPORT VUE COMPONENTS
import {defineProps, defineEmits, defineAsyncComponent, ref, computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from "vue-router";

//VARIABLES
const router = useRouter()
const store = useStore();
const table = store.getters.getTable;
const printOrder = ref(false)
const orderIsEmpty = ref(false)
const tables = store.getters.getSelectedTables;

//GET SELECTED ITEM FROM STORE WITH GETTER
const selectedItems = computed(() => {
  return store.getters.getSelectedProducts;
})


//GET LOGIN ID
const loginId = store.getters.getLoginId;


const PrintOrder = defineAsyncComponent(() =>
    import('@/components/PrintOrder.vue')
)
const props = defineProps({
  content: {type: String, required: true},
  id: {type: String, required: true},
  showModal: {type: Boolean},
  showCancelModal: {type: Boolean},
})

const emit = defineEmits(['myEvent'])


//FUNCTION OF SAVING ORDER
function saveOrder() {
  if (props.id === 'save' && selectedItems.value.length > 0) {
    orderIsEmpty.value = false
    emit('myEvent', false)
    //SHOW PRINTING ANIMATION
    printOrder.value = true


    //ADD ITEMS TO LOCALSTORAGE
    let dataArr = JSON.parse(localStorage.getItem(loginId)) || [];
    if (window.history.state.back === '/orderList/' + loginId) {
      let filteredArray;
      for (let item of selectedItems.value) {
        filteredArray = dataArr.filter(subArray =>
            subArray.some(obj => obj.table !== item.table)
        );
        item.table = table
      }
      filteredArray.push(selectedItems.value);
      localStorage.setItem(loginId, JSON.stringify(filteredArray))
      if (loginId.includes('manager')) {
        const worker = JSON.parse(localStorage.getItem('tables'))
        for (let item of worker) {
          if (item.table === table) {
            dataArr = JSON.parse(localStorage.getItem(item.id))
            dataArr.push(selectedItems.value);
            localStorage.setItem(item.id, JSON.stringify(dataArr))
          }

        }
      }
    } else {
      dataArr.push(selectedItems.value);
      localStorage.setItem(loginId, JSON.stringify(dataArr))
    }


    //ADD TABLE NUMBERS TO LOCALSTORAGE

    let tableArr = JSON.parse(localStorage.getItem('tables')) || [];
    tableArr.push(...tables);
    localStorage.setItem('tables', JSON.stringify(tableArr))

    //HIDE PRINTING ANIMATION AFTER 3 SECONDS

    setTimeout(() => {
      printOrder.value = false
      if (loginId.includes('manager')) {
        router.push('/manager/' + loginId)
      } else {
        router.push('/waiter/' + loginId + '/createOrder')
      }
      store.commit('updateProducts', [])
    }, 3000)

    //ADD PRODUCTS WITH MIN-COUNT TO LOCALSTORAGE

    let products = JSON.parse(localStorage.getItem('allProducts'))
    for (let prod of selectedItems.value) {
      products = [
        prod,
        ...products.filter(element => element.id !== prod.id),

      ]
      store.commit('updateProductList', products)
      store.commit('updateProducts', [])
      localStorage.setItem('allProducts', JSON.stringify(products))

    }
  } else if (props.id === 'cancel') {
    emit('myEvent', false)
  }else {
    orderIsEmpty.value = true
  }
}


function cancelOrder() {
  emit('myEvent', false)
  orderIsEmpty.value = false
}

</script>

<style scoped lang="scss" src="../styles/saveOrderModal.scss">
</style>