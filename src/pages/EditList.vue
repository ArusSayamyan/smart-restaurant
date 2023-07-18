<template>
  <base-wrapper>
    <div class="card p-fluid editList">
      <DataTable v-model:filters="filters" filterDisplay="menu" v-model:editingRows="editingRows" :value="local"
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
            <InputText v-model="data[field]" mode="currency" currency="USD" locale="en-US"/>
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
import {FilterMatchMode, FilterOperator} from 'primevue/api';

//IMPORT SVG FILES
import {svgs} from '../assets/_svgs'

//IMPORT VUE COMPONENTS
import {ref, onMounted, computed} from 'vue';
import {useStore} from "vuex";
const store = useStore();


//IMPORT IMAGE OF PRODUCTS
import BaseWrapper from "@/base/BaseWrapper.vue";


//VARIABLES
const products = ref();
const local = ref();
const editingRows = ref([]);
const svg = ref(svgs)
const prod = computed(() => {
  return store.getters.getProductList
});

local.value = JSON.parse(localStorage.getItem('allProducts'))

const onRowEditSave = (event) => {
  let {newData, index} = event;
  products.value[index] = newData;
  local.value[index] = newData;
  localStorage.setItem('allProducts', JSON.stringify(local.value))
  local.value = JSON.parse(localStorage.getItem('allProducts'))
  store.commit('updateProductList', products.value)
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

onMounted(() => {
  products.value = prod.value;
});

</script>

<style lang="scss" scoped src="@/styles/editList.scss"></style>