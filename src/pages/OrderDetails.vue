<template>
  <base-wrapper>
    <div class="orderDetails">
      <save-order :showModal="showModal" @myEvent="showModal = false" content="do you really want to save this order"
                  id="save"></save-order>
      <save-order :showCancelModal="showCancelModal" @myEvent="showCancelModal = false"
                  content="do you really want to cancel this order" id="cancel"></save-order>
      <div class="orderDetails__info">
        <div class="orderDetails__nav">
          <span>{{ object.statue }} {{ object.name }}</span>
          <span>{{ date }}</span>
        </div>
        <div class="orderDetails__check">
          <div class="orderDetails__header">
            <h1>Order list</h1>
            <span v-if="selectedItems.length > 0">total price is {{ doubleCount }}$</span>
          </div>
          <table v-if="selectedItems.length > 0">
            <tr v-for="sel in selectedItems" :key="sel">
              <td v-if="sel.name">{{ sel.name }}</td>
              <td v-if="sel.count">{{ sel.count }}</td>
              <td v-if="sel.price">{{ sel.count * +sel.price }}$</td>
              <td v-if="object.id.includes('manager') && fromEditPage" class="orderDetails__delItem"
                  @click="delOrderItem(sel.table, sel.name)">x
              </td>
            </tr>
          </table>
        </div>
        <div class="orderDetails__controlBtns">
          <button class="orderDetails__saveOrder"><img src="../assets/check.svg" alt="" class="orderDetails__iconSave"
                                                       @click="showModal = true"></button>
          <button class="orderDetails__delOrder"><img src="../assets/exit.svg" alt="" class="orderDetails__icon"
                                                      @click="showCancelModal = true"></button>
        </div>
      </div>
      <div class="orderDetails__menu">
        <div class="card xl:flex xl:justify-content-center">
          <div class="card">
            <Accordion>
              <AccordionTab header="Kitchen">
                <Accordion>
                  <AccordionTab header="burgers">
                    <OrderList v-model="burgers" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                               @click="selected">
                      <template> List of Products</template>
                      <template #item="item">
                        <div class="flex flex-wrap p-2 align-items-center gap-3"
                             :class="{'orderDetails__disabled':item.item.minCount <= 0}">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="item.item.img"
                               :alt="item.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ item.item.name }}</span>
                          </div>
                          <span class="font-bold text-900" v-if="+item.item.minCount >= 0">{{
                              item.item.minCount
                            }}</span>
                          <span class="font-bold text-900">$ {{ item.item.price }}</span>
                        </div>
                      </template>
                    </OrderList>
                  </AccordionTab>
                  <AccordionTab header="Desserts">
                    <OrderList v-model="dessert" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                               @click="selected">
                      <template> List of Products</template>
                      <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="slotProps.item.img"
                               :alt="slotProps.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ slotProps.item.name }}</span>
                          </div>
                          <span class="font-bold text-900">$ {{ slotProps.item.price }}</span>
                        </div>
                      </template>
                    </OrderList>
                  </AccordionTab>
                  <AccordionTab header="Appetizer">
                    <OrderList v-model="appetizers" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                               @click="selected">
                      <template> List of Products</template>
                      <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="slotProps.item.img"
                               :alt="slotProps.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ slotProps.item.name }}</span>
                          </div>
                          <span class="font-bold text-900">$ {{ slotProps.item.price }}</span>
                        </div>
                      </template>
                    </OrderList>
                  </AccordionTab>
                </Accordion>
              </AccordionTab>
              <AccordionTab header="Bar">
                <Accordion>
                  <AccordionTab header="Beverages">
                    <OrderList v-model="beverage" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                               @click="selected">
                      <template> List of Products</template>
                      <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="slotProps.item.img"
                               :alt="slotProps.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ slotProps.item.name }}</span>
                          </div>
                          <span class="font-bold text-900">$ {{ slotProps.item.price }}</span>
                        </div>
                      </template>
                    </OrderList>
                  </AccordionTab>
                </Accordion>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
// IMPORT COMPONENTS
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import OrderList from 'primevue/orderlist';
import {ref, computed} from 'vue';
import {useStore} from 'vuex';

//VARIABLES
const store = useStore();
const showModal = ref(false)
const showCancelModal = ref(false)
const selection = ref()
const selectedTable = store.getters.getSelectedTables;

//GET SELECTED PRODUCTS
const selectedItems = computed(() => {
  return store.getters.getSelectedProducts;
});

//GET ALL PRODUCTS LIST
const mainProducts = computed(() => {
  return store.getters.getProductList;
});


//FILTER PRODUCTS WITH CATEGORIES
const burgers = computed(() => {
  return mainProducts.value.filter(item => item.category === 'burger')
});

const dessert = computed(() => {
  return mainProducts.value.filter(item => item.category === 'dessert')
});

const appetizers = computed(() => {
  return mainProducts.value.filter(item => item.category === 'appetizer')
});

const beverage = computed(() => {
  return mainProducts.value.filter(item => item.category === 'beverages')
});
const object = JSON.parse(localStorage.getItem('name'))
const fromEditPage = window.history.state.back === '/orderList/' + object.id
const deletedProds = ref([]);

//ADD NEW ITEM OF SELECTED PRODUCTS

function selected() {
  const loginId = JSON.parse(localStorage.getItem('name'))
  for (let item of selectedItems.value) {
    for (let sel of selection.value) {
      for (let i = 0; i < selectedTable.length; i++) {
        item.table = selectedTable[selectedTable.length - 1].table
      }
      if ('name' in item && item.name === sel.name) {
        item.count++
        item.minCount--
        //
        // TODO
        if (item.minCount === 0) {
          console.log('empty')
        }
        return
      }
    }
  }

  if (!selectedItems.value.includes(...selection.value) || window.history.state.back === '/orderList/' + loginId.id) {
    store.commit('updateSelectedProducts', ...selection.value)
    for (let item of selection.value) {
      for (let i = 0; i < selectedTable.length; i++) {
        item.table = selectedTable[selectedTable.length - 1].table
      }
      item.count = 1
      item.minCount--
    }
  }
}

const doubleCount = computed(() => {
  const flattened = selectedItems.value.reduce((acc, curr) => acc.concat(curr), []);
  return flattened.reduce((acc, curr) => acc + (curr.count * curr.price), 0);
});


//DATE
const date = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const day = today.getDate();

// GET TIME
  const hours = today.getHours();
  const minutes = today.getMinutes();

  return `${year}-${month}-${day} ${hours}:${minutes}`;
})

//DELETE ORDER ITEM

function delOrderItem(table, prodName) {
  // const id = store.getters.getLoginId
  deletedProds.value = selectedItems.value.filter(item => item.name !== prodName)
  store.commit('updateProducts', deletedProds.value)
}

</script>

<style scoped lang="scss" src="../styles/orderDetails.scss">


</style>