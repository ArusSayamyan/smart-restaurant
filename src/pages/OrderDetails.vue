<template>
  <base-wrapper>
    <div class="orderDetails">
      <div class="orderDetails__info">
        <div class="orderDetails__nav">
          <span>{{ object.statue }} {{ object.name }}</span>
          <span>{{ date }}</span>
        </div>
        <div class="orderDetails__check">
          <div class="orderDetails__header">
            <h1>check</h1>
            <span v-if="select.length > 0">total price is {{ doubleCount }}$</span>
          </div>
          <table v-if="select.length > 0">
            <tr v-for="sel in select" :key="sel.name">
              <td>{{ sel.name }}</td>
              <td>{{ sel.count }}</td>
              <td>{{ sel.count * +sel.price }}$</td>
            </tr>
          </table>
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
                </Accordion>
              </AccordionTab>
              <AccordionTab header="Bar">
                <OrderList v-model="products" listStyle="height:auto" dataKey="id" v-model:selection="selection"
                           @click="selected">
                  <template #header> List of Products</template>
                  <template #item="slotProps">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                      <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="slotProps.item.img"
                           :alt="slotProps.item.name"/>
                      <div class="flex-1 flex flex-column gap-2">
                        <span class="font-bold">{{ slotProps.item.name }}</span>
                        <div class="flex align-items-center gap-2">
                          <i class="pi pi-tag text-sm"></i>
                          <span>{{ slotProps.item.category }}</span>
                        </div>
                      </div>
                      <span class="font-bold text-900">$ {{ slotProps.item.price }}</span>
                    </div>
                  </template>
                </OrderList>
              </AccordionTab>
            </Accordion>
          </div>
        </div>

      </div>
    </div>
  </base-wrapper>
</template>

<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import OrderList from 'primevue/orderlist';
import img from '@/assets/logo.svg';


import {ref, computed} from 'vue';

const selection = ref()
const select = ref([])
const products = ref([
  {
    name: 'product1',
    price: '55',
    img: img,
    count: 0
  },
  {
    name: 'product2',
    price: '60',
    img: img,
    count: 0
  },
  {
    name: 'product3',
    price: '20',
    img: img,
    count: 0
  },
  {
    name: 'product4',
    price: '55',
    img: img,
    count: 0

  },
  {
    name: 'product5',
    price: '60',
    img: img,
    count: 0
  },
  {
    name: 'product6',
    price: '20',
    img: img,
    count: 0
  }
]);

const object = JSON.parse(localStorage.getItem('name'))

// ADD SELECTED PRODUCT TO LIST
function selected() {
  if (!select.value.includes(...selection.value)) {
    select.value.push(...selection.value)
    for (let item of selection.value) {
      item.count = 1
    }
  } else {
    for (let item of select.value) {
      for (let sel of selection.value) {
        if (item === sel) {
          item.count++
        }
      }

    }
  }}

  const doubleCount = computed(() => {
    return select.value.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.count * (+currentValue.price)),
        0
    );
  });

//date
  const date = computed(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();

// Get time
    const hours = today.getHours();
    const minutes = today.getMinutes();

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  })
</script>

<style scoped lang="scss">
.orderDetails {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100vh;

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    color: #ffffff;
    padding: 15px;
  }

  &__info {
    flex-basis: 50%;
    height: 100%;
    border: 1px solid #000;
    padding: 20px;
  }

  &__menu {
    flex-basis: 50%;
    background-color: #cccccc;
    height: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.w-4rem.shadow-2.flex-shrink-0.border-round {
  width: 40px !important;
}

.flex.flex-wrap.p-2.align-items-center.gap-3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

table {
  width: 100%;
}

table tr:last-child {
  background-color: #000000;
  color: #ffffff;
}


</style>