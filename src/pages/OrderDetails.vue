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
              <td v-if="object.id.includes('manager') && fromEditPage && sel.count > 1"
                  class="orderDetails__changeCount"
                  @click="changeCount(sel.count, sel.id)">-
              </td>
              <td colspan="2" v-if="object.id.includes('manager') && fromEditPage && selectedItems.length > 1"
                  class="orderDetails__delItem"
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
                    <OrderList v-model="burgers" listStyle="height:auto" dataKey="id"
                               v-model:selection="selection"
                               @selection-change="OrderListSelectionChangeEvent(...selection)"
                    >
                      <template> List of Products</template>
                      <template #item="item">
                        <div class="flex flex-wrap p-2 align-items-center gap-3"
                             :class="{'orderDetails__disabled': +item.item.minCount <= 0}">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="item.item.img"
                               :alt="item.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ item.item.name }}</span>
                          </div>
                          <span class="font-bold text-900 orderDetails__minCount" v-if="+item.item.minCount >= 0">{{
                              +item.item.minCount
                            }}</span>
                          <span class="font-bold text-900">$ {{ item.item.price }}</span>
                        </div>
                      </template>
                    </OrderList>
                  </AccordionTab>
                  <AccordionTab header="Desserts">
                    <OrderList v-model="dessert" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                               @selection-change="OrderListSelectionChangeEvent(...selection)">
                      <template> List of Products</template>
                      <template #item="item">
                        <div class="flex flex-wrap p-2 align-items-center gap-3"
                             :class="{'orderDetails__disabled': +item.item.minCount <= 0}">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="item.item.img"
                               :alt="item.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ item.item.name }}</span>
                          </div>
                          <span class="font-bold text-900 orderDetails__minCount" v-if="+item.item.minCount >= 0">{{
                              +item.item.minCount
                            }}</span>
                          <span class="font-bold text-900">$ {{ item.item.price }}</span>
                        </div>
                      </template>
                    </OrderList>
                  </AccordionTab>
                  <AccordionTab header="Appetizer">
                    <OrderList v-model="appetizers" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                               @selection-change="OrderListSelectionChangeEvent(...selection)">
                      <template> List of Products</template>
                      <template #item="item">
                        <div class="flex flex-wrap p-2 align-items-center gap-3"
                             :class="{'orderDetails__disabled': +item.item.minCount <= 0}">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="item.item.img"
                               :alt="item.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ item.item.name }}</span>
                          </div>
                          <span class="font-bold text-900 orderDetails__minCount" v-if="+item.item.minCount >= 0">{{
                              +item.item.minCount
                            }}</span>
                          <span class="font-bold text-900">$ {{ item.item.price }}</span>
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
                               @selection-change="OrderListSelectionChangeEvent(...selection)">
                      <template> List of Products</template>
                      <template #item="item">
                        <div class="flex flex-wrap p-2 align-items-center gap-3"
                             :class="{'orderDetails__disabled': +item.item.minCount <= 0}">
                          <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="item.item.img"
                               :alt="item.item.name"/>
                          <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ item.item.name }}</span>
                          </div>
                          <span class="font-bold text-900 orderDetails__minCount" v-if="+item.item.minCount >= 0">{{
                              +item.item.minCount
                            }}</span>
                          <span class="font-bold text-900">$ {{ item.item.price }}</span>
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
const all = computed(() => {
  return JSON.parse(localStorage.getItem('allProducts'))
});
const showModal = ref(false)
const showCancelModal = ref(false)
const selection = ref()
// const changedCount = ref()
const selectedTable = computed(() => {
  return store.getters.getTable
});

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
  return all.value.filter(item => item.category === 'burger')
});

const dessert = computed(() => {
  return all.value.filter(item => item.category === 'dessert')
});

const appetizers = computed(() => {
  return all.value.filter(item => item.category === 'appetizer')
});

const beverage = computed(() => {
  return all.value.filter(item => item.category === 'beverages')
});
const object = JSON.parse(localStorage.getItem('name'))
const fromEditPage = window.history.state.back === '/orderList/' + object.id
const deletedProds = ref([]);

//TOTAL PRICE
const doubleCount = computed(() => {
  const flattened = selectedItems.value.reduce((acc, curr) => acc.concat(curr), []);
  return flattened.reduce((acc, curr) => acc + (curr.count * curr.price), 0);
});


// GET DATE
const date = computed(() => {
  const today = new Date();
  const year = today.getFullYear();

  //MONTHS ARE ZERO BASED SO ADD 1
  const month = today.getMonth() + 1;
  const day = today.getDate();

//GET TIME
  const hours = today.getHours();
  const minutes = today.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
})

//DELETE ORDER ITEM

//TODO
function delOrderItem(table, prodName) {
  deletedProds.value = selectedItems.value.filter(item => item.name !== prodName)
  const deletedItems = selectedItems.value.filter(item => item.name === prodName)
  for (let item of all.value) {
    for (let obj of deletedItems) {
      if (item.name === prodName && item.minCount >= 0) {
        item.minCount += obj.count
      }
    }
    const idx = mainProducts.value.findIndex(elem => elem.id === item.id)
    mainProducts.value[idx] = item
  }
  localStorage.setItem('allProducts', JSON.stringify(mainProducts.value))
  store.commit('updateProductList', mainProducts.value)
  store.commit('updateProducts', deletedProds.value)

}

//CHANGE COUNT OF SELECTED PRODUCT

function changeCount(count, id) {
  const changedItem = selectedItems.value.find(item => item.id === id)
  changedItem.count--
  changedItem.minCount++
  console.log(changedItem)
}


//ADD NEW ITEM OF SELECTED PRODUCTS

function OrderListSelectionChangeEvent(selected) {
  selected.table = selectedTable.value
  if (+selected.minCount === 0) {
    return
  }
  store.commit('updateSelectedProducts', selected)
}
</script>

<style scoped lang="scss" src="../styles/orderDetails.scss"></style>