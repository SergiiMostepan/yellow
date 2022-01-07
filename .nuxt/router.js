import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2b35bf6d = () => interopDefault(import('../pages/genre/index.vue' /* webpackChunkName: "pages/genre/index" */))
const _7ff85c22 = () => interopDefault(import('../pages/movies/index.vue' /* webpackChunkName: "pages/movies/index" */))
const _297f1e25 = () => interopDefault(import('../pages/genre/_slug.vue' /* webpackChunkName: "pages/genre/_slug" */))
const _1ceb8417 = () => interopDefault(import('../pages/movies/_id.vue' /* webpackChunkName: "pages/movies/_id" */))
const _1aaadf8e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/genre",
    component: _2b35bf6d,
    name: "genre"
  }, {
    path: "/movies",
    component: _7ff85c22,
    name: "movies"
  }, {
    path: "/genre/:slug",
    component: _297f1e25,
    name: "genre-slug"
  }, {
    path: "/movies/:id",
    component: _1ceb8417,
    name: "movies-id"
  }, {
    path: "/",
    component: _1aaadf8e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
