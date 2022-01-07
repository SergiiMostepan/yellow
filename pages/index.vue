<template>
  <main class="home">
    <div class="wr home__wr">
      <h1>Search your movie</h1>
      <Search class="home__search" @message="(data) => {message = data}" />
      <MovieList v-if="movies.length" class="home__list" :movies="movies" />
      <p v-else-if="message">{{message}}</p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'IndexPage',
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
    ...mapState({
      movies: (state) => state.movies.searchedMovies
    })
  },
  beforeDestroy () {
    this.setSearchedMovies([])
  },
  methods: {
    ...mapActions('movies', ['setSearchedMovies'])
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.home {
  &__wr {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px 0;
    @media screen and (max-width: $desctop-m) {
      padding: 40px 20px;
    }
  }
  &__search {
    margin-bottom: 30px;
  }
  &__list {
    width: 100%;
  }
  h1 {
    margin-bottom: 20px;
    font-size: 48px;
    color: #fff;
  }
}
</style>
