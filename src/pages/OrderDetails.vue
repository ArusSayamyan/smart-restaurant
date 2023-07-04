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
                    <OrderList v-model="products" listStyle="height:auto" dataKey="id" v-model:selection="selection"
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
                  <AccordionTab header="Desserts">
                    <OrderList v-model="desserts" listStyle="height:auto" dataKey="id" v-model:selection="selection"
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
                    <OrderList v-model="appetizer" listStyle="height:auto" dataKey="id" v-model:selection="selection"
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
                    <OrderList v-model="beverages" listStyle="height:auto" dataKey="id" v-model:selection="selection"
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

//IMPORT IMAGES
import eggBurger from '@/assets/eggBurger.png';
import beef from '@/assets/beef.png';
import cheese from '@/assets/cheese.png';
import creamy from '@/assets/creamy.png';
import chicken from '@/assets/chicken.png';
import barbeque from '@/assets/barbeque.png';
import melon from '@/assets/melon.png';
import apple from '@/assets/apple.png';
import velvet from '@/assets/velvet.png';
import fruit from '@/assets/fruit.png';
import fries from '@/assets/fries.png';
import nugget from '@/assets/nugget.png';
import sausage from '@/assets/sausage.png';
import chickenWings from '@/assets/chickenWings.png';
import lemonade from '@/assets/lemonade.png';
import softDrink from '@/assets/softDrink.png';
import lemonTea from '@/assets/lemonTea.png';
import milkShake from '@/assets/milkShake.png';
import orangeJuice from '@/assets/orangeJuice.png';
import appleJuice from '@/assets/appleJuice.png';
import berryFrappe from '@/assets/berryFrappe.png';

//VARIABLES
const store = useStore();
const showModal = ref(false)
const showCancelModal = ref(false)
const selection = ref()
// const selectedItems =
const selectedTable = store.getters.getSelectedTables;
const selectedItems = computed(() => {
  return store.getters.getSelectedProducts;
});
const object = JSON.parse(localStorage.getItem('name'))
const fromEditPage = window.history.state.back === '/orderList/' + object.id
const deletedProds = ref([]);
// const router = useRouter()


// LIST OF PRODUCTS
const products = ref([
  {
    name: 'Egg burger',
    price: '55',
    img: eggBurger,
    count: 0,
    table: ''
  },
  {
    name: 'Beef burger',
    price: '60',
    img: beef,
    count: 0,
    table: ''
  },
  {
    name: 'Cheese burger',
    price: '20',
    img: cheese,
    count: 0,
    table: ''
  },
  {
    name: 'Creamy mushroom',
    price: '55',
    img: creamy,
    count: 0,
    table: ''

  },
  {
    name: 'Spicy chicken',
    price: '60',
    img: chicken,
    count: 0,
    table: ''
  },
  {
    name: 'Barbeque chicken',
    price: '20',
    img: barbeque,
    count: 0,
    table: ''
  }
]);
const desserts = ref([
  {
    name: 'Melon ice cream',
    price: '55',
    img: melon,
    count: 0,
    table: ''
  },
  {
    name: 'Apple pie',
    price: '60',
    img: apple,
    count: 0,
    table: ''
  },
  {
    name: 'Red velvet cake',
    price: '20',
    img: velvet,
    count: 0,
    table: ''
  },
  {
    name: 'Fruit salad',
    price: '55',
    img: fruit,
    count: 0,
    table: ''

  }
]);
const appetizer = ref([
  {
    name: 'French fries',
    price: '55',
    img: fries,
    count: 0,
    table: ''
  },
  {
    name: 'Nugget',
    price: '60',
    img: nugget,
    count: 0,
    table: ''
  },
  {
    name: 'Sausage',
    price: '20',
    img: sausage,
    count: 0,
    table: ''
  },
  {
    name: 'Chicken wings',
    price: '55',
    img: chickenWings,
    count: 0,
    table: ''
  }
]);
const beverages = ref([
  {
    name: 'Lemonade',
    price: '55',
    img: lemonade,
    count: 0,
    table: ''
  },
  {
    name: 'Soft drink',
    price: '60',
    img: softDrink,
    count: 0,
    table: ''
  },
  {
    name: 'Lemon tea',
    price: '20',
    img: lemonTea,
    count: 0,
    table: ''
  },
  {
    name: 'Milk shake',
    price: '55',
    img: milkShake,
    count: 0,
    table: ''
  },
  {
    name: 'Orange juice',
    price: '55',
    img: orangeJuice,
    count: 0,
    table: ''
  },
  {
    name: 'Apple juice',
    price: '55',
    img: appleJuice,
    count: 0,
    table: ''
  },
  {
    name: 'Berry frappe',
    price: '55',
    img: berryFrappe,
    count: 0,
    table: ''
  }
]);


//get selected items from store with getter


//ADD NEW ITEM OF SELECTED PRODUCTS

function selected() {
  const loginId = JSON.parse(localStorage.getItem('name'))
  // const table = store.getters.getTable
  for (let item of selectedItems.value) {
    for (let sel of selection.value) {
      for (let i = 0; i < selectedTable.length; i++) {
        item.table = selectedTable[selectedTable.length - 1].table
      }
      if ('name' in item && item.name === sel.name) {
        item.count++
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