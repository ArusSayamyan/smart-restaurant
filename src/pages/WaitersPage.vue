<template>
  <div class="waitersPage">
    <div class="waitersPage__header">
      <p class="waitersPage__date">{{ date }}</p>
      <p class="waitersPage__date">{{ object.statue }}  {{ object.name }}</p>
    </div>
    <base-wrapper>
      <div class="waitersPage__main">
        <div class="waitersPage__orders">
          <router-link :to="object.id + '/createOrder'" class="waitersPage__createOrder">
            <span class="waitersPage__text">Create order</span>
          </router-link>
        </div>
      </div>
    </base-wrapper>
  </div>
</template>

<script setup>
import {computed} from "vue";
const object = JSON.parse(localStorage.getItem('name'))

//FUNCTION EXIT
const date = computed(()=> {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  const day = today.getDate();

  if(month < 10) {
    month = '0' + month
  }

//GET TIME
  const hours = today.getHours();
  let minutes = today.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
})
</script>

<style scoped lang="scss" src="../styles/waiters.scss"></style>