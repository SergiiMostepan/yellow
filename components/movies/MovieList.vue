<template>
  <div class="movie-list">
    <MovieCard class="movie-list__card" v-for="item in movies" :key="item.name" :data="item" />
  </div>
</template>

<script>
  export default {
    props: {
      movies: {
        type: Array,
        require: true,
        default: () => []
      }
    },
    components: {
      MovieCard: () => import("./MovieCard.vue")
    },
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.movie-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  &__card {
    margin-right: 4px;
    width: 24%;
    margin-bottom: 20px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    @media screen and (max-width: $tablet) {
      width: 49%;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
    @media screen and (max-width: $mobile-l) {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>