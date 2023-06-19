<template>
  <div>
    <PrintOrder v-if="printOrder"></PrintOrder>


<div class="saveOrderModal" :id="props.id" v-if="props.showModal || props.showCancelModal">
  <div class="saveOrderModal__content">
    <p class="saveOrderModal__desc">{{props.content}}</p>
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
const printOrder = ref(false)

const PrintOrder = defineAsyncComponent(() =>
    import('@/components/PrintOrder.vue')
)
const props = defineProps({
  content: { type: String, required: true},
  id: { type: String, required: true},
  showModal: { type: Boolean},
  showCancelModal: { type: Boolean},
})

const emit = defineEmits(['myEvent'])


//FUNCTION OF SAVING ORDER
function saveOrder() {
  if(props.id === 'save') {
    console.log('save order')
    emit('myEvent', false)

    //SHOW PRINTING ANIMATION
    printOrder.value = true

    //HIDE PRINTING ANIMATION AFTER 3 SECONDS
    setTimeout(()=> {
      printOrder.value = false
    }, 3000)
  }else if(props.id === 'cancel') {
    emit('myEvent', false)
  }
}


function canselOrder() {
  emit('myEvent', false)
}
</script>

<style scoped lang="scss">
.saveOrderModal {
 position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
  max-width: 1320px;
  background: #00000052;


  &__content {
    background-color: #ffffff;
    border-radius: 15px;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px;
  }

  &__desc {
    text-align: center;
    font-size: 24px;
  }

  &__btns {
    display: flex;
    justify-content: space-evenly;
  }

  &__enter, &__cancel {
    border: none;
    max-width: 150px;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    background-color: darkgreen;
    color: #ffffff;
    text-transform: uppercase;
    margin: 0;
    cursor: pointer;
  }

  &__cancel {
    background-color: red;
  }
}

</style>