<template>
  <section class="search">
    <input class="search__item" v-model="name"/>
    <select class="search__item" v-model="genre">
      <option v-for="option in genreOptions" :key="option.value" :value="option.value">{{option.label}}</option>
    </select>
    <button class="search__item" @click="search">Search</button>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { api } from '../../api/index'
  export default {
    data () {
      return {
        name: '',
        genre: ''
      }
    },
    computed: {
      ...mapState({
        genreOptions: state => state.general.genreOptions
      })
    },
    methods: {
      ...mapActions('movies', ["setSearchedMovies"]),
      ...mapActions('general', ["setLoading"]),
      async search () {
        try {
          this.setSearchedMovies([])
          if (!this.name && !this.genre && this.genre!==0) {
            this.$emit('message', 'no query parameters')
            return
          }

          this.$emit('message', '')
          this.setLoading(true)
          const {data} = await this.$axios({
            method: "get",
            url: api.movies.fetchMovie({name: this.name, genre: this.genre}),
          })
          if (!data.data.length) {
            this.$emit('message', 'not found')
          } else {
            this.setSearchedMovies(data.data)
          }
          this.setLoading(false)
        } catch (err) {
          console.log(err)
          this.setLoading(false)
          this.$emit('message', err.message)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.search {
  display: flex;
  @media screen and (max-width: $mobile-l) {
    flex-direction: column;
  }
  &__item {
    &:not(:last-child) {
      margin-right: 5px;
    }
    @media screen and (max-width: $mobile-l) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>