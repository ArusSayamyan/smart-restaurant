<template>
  <base-wrapper>
    <div class="card p-fluid editList">
      <DataTable v-model:filters="filters" filterDisplay="menu" v-model:editingRows="editingRows" :value="products"
                 editMode="row" dataKey="id"
                 @row-edit-save="onRowEditSave" :globalFilterFields="['name']" tableClass="editable-cells-table"
                 tableStyle="min-width: 50rem">
        <template #header>
                <span class="p-input-icon-left">
                  <span v-html='svg.search' class="editList__iconContainer"></span>
                    <InputText v-model="filters['global'].value" placeholder="Global Search"/>
                </span>
        </template>
        <Column field="name" header="Name" style="width: 20%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]"/>
          </template>
        </Column>
        <Column field="price" header="Price" style="width: 20%">
          <template #body="{ data, field }">
            {{ formatCurrency(data[field]) }}
          </template>
          <template #editor="{ data, field }">
            <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US"/>
          </template>
        </Column>
        <Column field="minCount" header="minCount" style="width: 20%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]"/>
          </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        <template #empty> No products found.</template>
      </DataTable>
    </div>
  </base-wrapper>
</template>

<script setup>
//IMPORT PRIME VUE COMPONENTS
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import {FilterMatchMode, FilterOperator} from 'primevue/api';

//IMPORT SVG FILES
import { svgs } from '../assets/_svgs'

import {ref, onMounted, computed} from 'vue';
import {useStore} from "vuex";
//IMPORT IMAGE OF PRODUCTS
import BaseWrapper from "@/base/BaseWrapper.vue";
const store = useStore();

//VARIABLES
const products = ref();
const editingRows = ref([]);
const prod = computed(() => {
  return store.getters.getProductList
});
const svg = ref(svgs)

onMounted(() => {
  products.value = prod.value;
});

const onRowEditSave = (event) => {
  let {newData, index} = event;
  products.value[index] = newData;
  console.log(newData)
  console.log(store.state.productList)
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
}
const filters = ref(
    {
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    }
);
</script>

<style lang="scss" scoped>
.editList {
  padding-top: 155px;

  &__iconContainer {
    position: absolute;
    top: 15px;
    left: 15px;
  }
}

::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}
.p-input-icon-left {
  position: relative;
}

.p-input-icon-left > .p-inputtext {
  width: unset;
}
</style>