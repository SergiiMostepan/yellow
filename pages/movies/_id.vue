<template>
  <div class="movie">
    <div class="wr movie__wr" v-if="movie">
      <h1 class="movie__title" v-html="movie.name"></h1>
      <div class="movie__top">
        <div class="movie__top__left">
          <img :src="movie.image" :alt="movie.name" />
        </div>
        <div class="movie__top__right" v-html="movie.additional"></div>
      </div>
      <div class="movie__description" v-html="movie.description"></div>
      <button class="movie__btn" @click="showModal = true">Book a ticket</button>
      <Modal v-if="showModal" @close="showModal = false" :movie="movie"/>
    </div>
  </div>
</template>

<script>
import { api } from '../../api'
import { mapGetters } from 'vuex'
  export default {
    components: {
      Modal: () => import('../../components/movies/Modal.vue')
    },
    data () {
      return {
        movie: {},
        showModal: false
      }
    },
    async fetch() {
      this.movie = this.getMovieById(this.$route.params.id)
      if (!this.movie) {
        const { data } = await this.$axios({
          method: "get",
          url: api.movies.fetchMovie({id: this.$route.params.id}),
        })
      this.movie = data.data[0]
      }
    },
    computed: {
      ...mapGetters('movies', ['getMovieById']),
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.movie {
  &__wr {
    padding: 40px 10px;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    @media screen and (max-width: $desctop-m) {
      padding: 40px 20px;
    }
  }
  &__title {
    color: #grey;
    font-size: 48px;
    margin-bottom: 30px;
  }
  &__top {
    display: flex;
    @media screen and (max-width: $mobile-l) {
      flex-direction: column;
    }
    &__left {
      margin-right: 30px;
    }
    &__right {
      &::v-deep {
        li {
          display: flex;
          @media screen and (max-width: $mobile-l) {
            flex-direction: column;
          }
          p {
            &:first-child {
              margin-right: 10px;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  &__description {
    border-top: 1px solid grey;
    padding: 10px 0;
  }
  &__btn {
    cursor: pointer;
  }
}
</style>