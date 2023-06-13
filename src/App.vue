<template>
  <div class="container">
    <TheNav/>
    <base-wrapper>
    <div class="container__signIn">
      <form action="" class="container__signInForm">
        <h3 class="container__formTitle">Sign In</h3>
        <input type="number" required class="container__pin" placeholder="your code">
        <button class="container__btn">Sign in</button>
      </form>
    </div>
    </base-wrapper>
  </div>
</template>

<script setup>
import TheNav from "@/layout/TheNav.vue";
</script>

<style lang="scss">

body {
  margin: 0;
  font-family: sans-serif;
}
.container {
  max-width: 1920px;
  width: 100%;
  background-image: url("./assets/background.png");
  background-size: cover;
  background-position: right;
  height: 100vh;
  margin: 0 auto;

  &__signIn {
    padding-top: 155px;
  }

  &__signInForm {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    box-shadow: #008000FF 0 2px 8px 0;
    display: flex;
    flex-direction: column;

    @media(max-width: 786px) {
      margin: 0 auto;
    }
  }

  &__formTitle {
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    color: #008000FF;
    margin-top: 0;
  }

  &__pin {
    border: none;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: rgba(14, 30, 37, 0.12) 0 2px 4px 0, rgba(14, 30, 37, 0.32) 0 2px 16px 0;
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__btn {
    max-width: 150px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    color: #ffffff;
    text-transform: uppercase;
    border-radius: 8px;
    background-color: #008000FF;
    margin: 0 auto;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: #ffffff;
      outline: 2px solid #008000FF;
      color: #008000FF;
    }
  }
}
</style>
