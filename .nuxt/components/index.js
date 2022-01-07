export { default as Spinner } from '../../components/Spinner.vue'
export { default as HomeSearch } from '../../components/home/Search.vue'
export { default as MoviesModal } from '../../components/movies/Modal.vue'
export { default as MoviesMovieCard } from '../../components/movies/MovieCard.vue'
export { default as MoviesMovieList } from '../../components/movies/MovieList.vue'
export { default as PartsFooter } from '../../components/parts/Footer.vue'
export { default as PartsHeader } from '../../components/parts/Header.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
