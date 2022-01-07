<template>
  <div class="genre">
    <div class="wr genre__wr">
      <MovieList v-if="movies.length" class="home__list" :movies="movies" />
      <p class="genre__message" v-else-if="message">{{message}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { api } from '../../api/index'
  export default {
    components: {
      Search: () => import("@/components/home/Search"),
      MovieList: () => import("@/components/movies/MovieList"),
    },
    data () {
      return {
        message: ''
      }
    },
    computed: {
      genre () {
        return this.$route.params.slug
      },
      ...mapState({
        movies: (state) => state.movies.searchedMovies,
        genreOptions: (state) => state.general.genreOptions
      })
    },
    async created () {
      try {
        this.setSearchedMovies([])

        const genreId = this.genreOptions.find(item => item.label === this.genre || item.label.includes(this.genre))?.value
        if (!genreId) {
          this.message = 'not found'
          return
        }

        this.setLoading(true)
        const {data} = await this.$axios({
          method: "get",
          url: api.movies.fetchMovie({genre: genreId}),
        })
        if (!data.data.length) {
          this.message = 'not found'
        } else {
          this.setSearchedMovies(data.data)
        }
        this.setLoading(false)
      } catch (err) {
        console.log(err)
        this.setLoading(false)
        this.message =  err.message
      }
    },
    methods: {
      ...mapActions('movies', ["setSearchedMovies"]),
      ...mapActions('general', ["setLoading"]),
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.genre {
  &__wr {
    padding: 40px 0;
    @media screen and (max-width: $desctop-m) {
      padding: 40px 20px;
    }
  }
  &__message {
    text-align: center;
  }
}
</style>