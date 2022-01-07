<template>
  <article class="card">
    <nuxt-link :to="`/movies/${data.id}`">
      <img class="card__img" :src="data.image" :alt="data.name" />
    </nuxt-link>
  </article>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        require: true,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.card {
  /* width: 24%;
  margin-bottom: 20px; */
  &__img {
    width: 100%;
    height: 100%;
    @media screen and (max-width: $desctop-m) {
      
    }
  }
}
</style>