<template>
  <base-wrapper>
    <nav class="nav">
      <div class="nav__logoWrapper">
        <img src="../assets/logo.png" alt="restaurantLogo" class="nav__logo">
        <span class="nav__restaurantName">Smart Restaurant</span>
      </div>
    </nav>
  </base-wrapper>
</template>

<script setup>

</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  &__logo {
    margin-right: 15px;
    width: 50px;
  }

  &__logoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__restaurantName {
    color: #fff;
    font-weight: 700;
    font-size: 30px;
  }
}
</style>