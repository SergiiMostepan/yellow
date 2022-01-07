<template>
  <header class="header">
    <div class="wr header__wr">
      <div class="header__icon-wr">
        <nuxt-link to="/">
          <img src="https://wonder-day.com/wp-content/uploads/2020/10/wonder-day-among-us-21.png" alt="media icon" />
        </nuxt-link>
      </div>
      <nav class="header__menu">
        <nuxt-link class="header__menu-item" to='/'>Home</nuxt-link>
        <nuxt-link class="header__menu-item" to='/movies'>All movies</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  background-color: rgba(0, 0, 0, 0.9);
  &__wr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__icon-wr {
    width: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__menu {
  }
  &__menu-item {
    text-decoration: none;
    color: white;
    margin-right: 10px;
    &.nuxt-link-exact-active {
      color: red;
    }

  }
}
</style>