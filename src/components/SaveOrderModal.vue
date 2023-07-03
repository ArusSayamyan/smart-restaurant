<template>
  <div>
    <PrintOrder v-if="printOrder"></PrintOrder>
    <div class="saveOrderModal" :id="props.id" v-if="props.showModal || props.showCancelModal">
      <div class="saveOrderModal__content">
        <p class="saveOrderModal__desc">{{ props.content }}</p>
        <div class="saveOrderModal__btns">
          <button class="saveOrderModal__enter" @click="saveOrder">Ok</button>
          <button class="saveOrderModal__cancel" @click="canselOrder">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, defineAsyncComponent, ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from "vue-router";

const router = useRouter()
const store = useStore();


const printOrder = ref(false)

//get selected items from store with getter
const selectedItems = store.getters.getSelectedProducts;
const table = store.getters.getTable;


//get loginId of waiter
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
const tables = store.getters.getSelectedTables;


//FUNCTION OF SAVING ORDER
function saveOrder() {
  if (props.id === 'save') {
    emit('myEvent', false)

    //SHOW PRINTING ANIMATION
    printOrder.value = true


    //add items to localStorage
    let dataArr = JSON.parse(localStorage.getItem(loginId)) || [];
    if (window.history.state.back === '/orderList/' + loginId) {
      let filteredArray;
      for (let item of selectedItems) {
        filteredArray = dataArr.filter(subArray =>
            subArray.some(obj => obj.table !== item.table)
        );
        item.table = table
      }
      filteredArray.push(selectedItems);
      localStorage.setItem(loginId, JSON.stringify(filteredArray))
      if (loginId.includes('manager')) {
        const worker = JSON.parse(localStorage.getItem('tables'))
        for (let item of worker) {
          if (item.table === table) {
            dataArr = JSON.parse(localStorage.getItem(item.id))
            dataArr.push(selectedItems);
            localStorage.setItem(item.id, JSON.stringify(dataArr))
          }

        }
      }
    } else {
      dataArr.push(selectedItems);
      localStorage.setItem(loginId, JSON.stringify(dataArr))
    }


    //add table numbers to localStorage


    let tableArr = JSON.parse(localStorage.getItem('tables')) || [];
    tableArr.push(...tables);
    localStorage.setItem('tables', JSON.stringify(tableArr))

    //HIDE PRINTING ANIMATION AFTER 3 SECONDS
    setTimeout(() => {
      printOrder.value = false
      router.push('/waiter/' + loginId + '/createOrder')
    }, 3000)
  } else if (props.id === 'cancel') {
    emit('myEvent', false)
  }
}

function canselOrder() {
  emit('myEvent', false)
}

</script>

<style scoped lang="scss" src="../styles/saveOrderModal.scss">
</style>