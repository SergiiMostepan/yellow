<template>
  <div class="default">
    <Header />
    <nuxt />
    <client-only>
      <Spinner v-if="isLoading" />
    </client-only>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    components: {
      Header: () => import("@/components/parts/Header"),
      Spinner: () => import("@/components/Spinner")
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.general.isLoading
      })
    }
  }
</script>

<style lang="scss" scoped>
.default {
  background-image: url('https://kinokrad.co/templates/ntpl/images/bg-xmas.jpg');
  min-height: 100vh;
  background-position: top;
  background-repeat: no-repeat;
  background-color: #000;
  position: relative;
}
</style>