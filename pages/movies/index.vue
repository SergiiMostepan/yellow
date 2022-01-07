<template>
  <main class="movies">
    <div class="wr movies__wr">
      <MovieList :movies="movies" />
    </div>
  </main>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'movies',
    components: {
      MovieList: () => import("@/components//movies/MovieList"),
    },
    async fetch () {
      if (!this.movies.length) {
        this.setLoading(true)
        await this.getAllMovies()
        this.setLoading(false)
      }
    },
    computed: {
      ...mapState({
        movies: (state) => state.movies.movies
      })
    },
    methods: {
      ...mapActions('movies', ["getAllMovies"]),
      ...mapActions('general', ["setLoading"])
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.movies {
  &__wr {
    padding: 40px 0;
    @media screen and (max-width: $desctop-m) {
      padding: 40px 20px;
    }
  }
}
</style>