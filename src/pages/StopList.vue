<template>
  <div class="stopList">
    <base-wrapper>
      <h1>stop list</h1>
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
        </DataTable>
      </div>
    </base-wrapper>
  </div>

</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {computed} from "vue";
import {useStore} from "vuex";
const store = useStore();
const prod = computed(() => {
  return store.getters.getProductList
});

const stopList = prod.value.filter(item => +item.minCount === 0)

</script>
<style scoped lang="scss">
.stopList {
  padding-top: 115px;

  &__prodImg {
    width: 60px;
  }
}
</style>