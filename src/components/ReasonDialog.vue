<template>
  <div>
  <div class="orderListPage__reasonsModal" v-if="!orderDeleted">
    <div class="card flex justify-content-center">
      <Dialog  maximizable modal header="Reasons for rejection"
              :style="{ width: '50vw' }" :visible="props.showModal" @update:visible="$emit('update:showModal', $event)">
        <div class="card flex justify-content-center">
          <form @submit="onSubmit" class="flex flex-column gap-2">
            <div class="flex flex-wrap gap-3">
              <div class="flex align-items-center">
                <RadioButton @change="getInputId($event)" v-model="value" inputId="reason1" name="pizza2"
                             value="customer failure"/>
                <label for="reason1" class="ml-2">customer failure</label>
              </div>
              <div class="flex align-items-center">
                <RadioButton @change="getInputId($event)" v-model="value" inputId="reason2" name="pizza2"
                             value="Unpleasant Odor or Appearance"/>
                <label for="reason2" class="ml-2">treat</label>
              </div>
              <div class="flex align-items-center">
                <RadioButton @change="getInputId($event)" v-model="value" inputId="reason3" name="pizza2"
                             value="Incorrect Order"/>
                <label for="reason3" class="ml-2">Incorrect Order</label>
              </div>
            </div>
            <div class="orderListPage__submitBtn">
              <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
              <Button type="submit" label="Submit"/>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  </div>
    <transition-group name="p-message" tag="div" v-if="orderDeleted">
      <Message severity="success" key="message1"> Order successfully deleted</Message>
    </transition-group>
  </div>
</template>


<script setup>
import {useToast} from 'primevue/usetoast';
import {useField, useForm} from 'vee-validate';
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import {defineProps, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Message from "primevue/message";
const {handleSubmit, resetForm} = useForm();
const toast = useToast();
const allProducts = JSON.parse(localStorage.getItem('allProducts'))
const store = useStore();
const router = useRouter()
const table = store.getters.getTable
const orderDeleted = ref(false);
// const showResModal = ref(false);
const loginId = store.getters.getLoginId;
let productsList;
let products;

if(JSON.parse(localStorage.getItem(loginId))) {
  productsList = JSON.parse(localStorage.getItem(loginId));
}


const inputId = ref();

const {value, errorMessage} = useField('value', validateField);
function getInputId(event) {
  inputId.value = event.target.id
}

const props = defineProps({
  showModal: {type: Boolean, default: true, required: true},
})

//DELETE ORDER
const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    toast.add({severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000});
    resetForm();
  }
  let worker = JSON.parse(localStorage.getItem('tables'))
  let filtered;
  let filteredTabs;
  for (let item of worker) {
    if (item.table === table) {
      const prods = JSON.parse(localStorage.getItem(item.id))
      filtered = prods.filter(subArray =>
          subArray.some(obj => obj.table !== table)
      );
      if (inputId.value === 'reason3') {
        const delItems = products.filter(obj => obj.table === table);
        for (let item of delItems) {
          allProducts.forEach((product, index) => {
            if (product.id === item.id && product.minCount >= 0) {
              item.minCount = product.minCount + item.count
              item.count = 0;
              allProducts[index] = item;
              localStorage.setItem('allProducts', JSON.stringify(allProducts))
            }
          })
        }
      }

      filteredTabs = worker.filter(obj => obj.table !== table);
      store.commit('updateTables', filteredTabs)
      localStorage.setItem(item.id, JSON.stringify(filtered))
      localStorage.setItem('tables', JSON.stringify(filteredTabs))
    }
    orderDeleted.value = true
    setTimeout(() => {
      orderDeleted.value = false
      router.push('/manager/' + loginId)
      store.commit('updateProducts', [])
    }, 3000)
  }
});


function validateField(value) {
  if (!value) {
    return 'Value is required.';
  }

  return true;
}

if (loginId.includes('manager')) {
  const getProducts = JSON.parse(localStorage.getItem('tables'))
  for (let obj of getProducts) {
    if (obj.table === table) {
      productsList = JSON.parse(localStorage.getItem(obj.id))
    }
  }
}

if(productsList) {
  let arr = productsList.filter(subArray =>
      subArray.some(obj => obj.table === table)
  );
  for (let i = 0; i < arr.length; i++) {
    products = arr[arr.length - 1]
  }
}


</script>
<style scoped lang="scss" src="@/styles/orderListPage.scss"></style>