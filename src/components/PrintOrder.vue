<template>
  <div class="printContent">
    <div class='container'>
      <div class='trey'>
        <div class='top'>
          <div class='paper1'></div>
        </div>
        <div class='bottom'>
          <div class='inner'></div>
        </div>
        <div class='grey-border'></div>
        <div class='pointer'></div>
        <div class='paper2'>
          <div class='e1'></div>
          <div class='e2'></div>
          <div class='e4'>
            <div class='e41'></div>
            <div class='text'>
              ORDER
            </div>
            <div class='e42'></div>
          </div>
          <div class='e5'>
            <div class='e51'></div>
            <div class='text' v-if="props.printId === 'save'" >
              SAVED
            </div>
            <div class='text' v-else-if="props.printId === 'print'">
              PRINTED
            </div>
            <div class='text' v-else>
              PAID
              <p style="font-size: 12px" v-if="props.minPrice > 0">Your change is {{ props.minPrice }}$</p>
            </div>
            <div class='e52'></div>
          </div>
          <div class='e3'></div>
          <div class='e6'></div>
        </div>
      </div>
      <div class='body'>
        <div class='top-perspective'>
          <div class='top'></div>
        </div>
        <div class='bottom'></div>
        <div class='buttons-container'>
          <div class='button1'></div>
          <div class='button2'></div>
        </div>
        <div class='button3'></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  minPrice: {type: Number, required: false},
  printId: {type: String, required: true},
})
</script>

<style scoped lang="scss" src="../styles/printOrder.scss">

</style>