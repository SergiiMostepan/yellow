import { api } from '@/api'
export default {
  state: () =>({ 
    movies: [],
    searchedMovies: []
  }),
  actions: {
    async getAllMovies({ commit }) {
      try {
        const { data } = await this.$axios({
          method: "get",
          url: api.movies.fetchAllMovies(),
        })
        commit('SET_ALL_MOVIES', data.data)
      } catch (err) {
        console.log(err.message)
      }
    },
    setSearchedMovies({ commit }, data) {
      commit('SET_SEARCHED_MOVIES', data)
    }
  },
  getters: {
    getMovieById: state => id => {
      return state.movies.find(item => item.id === +id)
    },
  },
  mutations: {
    SET_ALL_MOVIES (state, data) {
      state.movies = data
    },
    SET_SEARCHED_MOVIES (state, data) {
      state.searchedMovies = data
    }
  }
};