<template>
  <div class="stopList">
    <base-wrapper>
      <h1>Stop list</h1>
      <p v-if="stopList.length === 0">Stop list is empty</p>
      <div class="card" v-else>
        <DataTable :value="stopList" tableStyle="min-width: 50rem">
          <Column field="name" header="Name"></Column>
          <Column field="img" header="Product image">
            <template #body="slotProps">
              <img alt="image" :src="slotProps.data.img" class="stopList__prodImg"/>
            </template>
          </Column>
          <Column field="price" header="Price"></Column>
          <Column field="minCount" header="Count"></Column>
          <Column headerStyle="width: 10rem">
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <button type="button" clas="stopList__delFromStopList" @click="makeUnlimited(slotProps.data)">
                  <span v-html='svg.delete' class="stopList__iconContainer"></span>
                </button>
             </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </base-wrapper>
  </div>

</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

//IMPORT SVG FILES
import { svgs } from '../assets/_svgs'
import {computed, ref} from "vue";

//COMPUTED PROPERTIES
const prod = computed(()=> {
  return JSON.parse(localStorage.getItem(localStorageKey.value))
})


const stopList = computed(()=> {
  return products.value.filter(item => +item.minCount === 0)
})


//VARIABLES
const localStorageKey = ref('allProducts');
const products = ref(prod.value)
const svg = ref(svgs)

//CHANGE MIN-COUNT OF DELETED PRODUCT FROM 0 TO 'UNLIMITED'
function makeUnlimited(deletedObj) {
  const deletedProdIdx = products.value.findIndex(item=> item.id === deletedObj.id)
  deletedObj.minCount = 'unlimited'
  prod[deletedProdIdx] = deletedObj;
  localStorage.setItem(localStorageKey.value, JSON.stringify(prod.value))
}
</script>

<style scoped lang="scss">
.stopList {
  padding-top: 115px;

  &__prodImg {
    width: 60px;
  }

}

.flex.flex-wrap.gap-2 button {
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

</style>