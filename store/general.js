export default {
    state: () =>({ 
      isLoading: false,
      genreOptions: [
        {
          value: '',
          label: ''
        },
        {
          value: 0,
          label: 'action'
        },
        {
          value: 1,
          label: 'adventures'
        },
        {
          value: 2,
          label: 'comedy'
        },
        {
          value: 3,
          label: 'drama'
        },
        {
          value: 4,
          label: 'horror'
        },
        {
          value: 5,
          label: 'westwrns'
        }
      ],
    }),
    actions: {
      setLoading({ commit }, data) {
        commit('SET_LOADING', data)
      }
    },
    mutations: {
      SET_LOADING (state, data) {
        state.isLoading = data
      },
    }
  };