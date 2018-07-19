import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2d4b55d4 = () => import('..\\pages\\myclasses\\index.vue' /* webpackChunkName: "pages_myclasses_index" */).then(m => m.default || m)
const _2f945664 = () => import('..\\pages\\entry.vue' /* webpackChunkName: "pages_entry" */).then(m => m.default || m)
const _783bf807 = () => import('..\\pages\\entry\\register.vue' /* webpackChunkName: "pages_entry_register" */).then(m => m.default || m)
const _1aedaf8d = () => import('..\\pages\\entry\\find-pwd.vue' /* webpackChunkName: "pages_entry_find-pwd" */).then(m => m.default || m)
const _32232e96 = () => import('..\\pages\\entry\\login.vue' /* webpackChunkName: "pages_entry_login" */).then(m => m.default || m)
const _303122af = () => import('..\\pages\\profile\\_id.vue' /* webpackChunkName: "pages_profile__id" */).then(m => m.default || m)
const _611bc2ba = () => import('..\\pages\\profile\\_id\\_type.vue' /* webpackChunkName: "pages_profile__id__type" */).then(m => m.default || m)
const _6e8fcd05 = () => import('..\\pages\\index\\_type.vue' /* webpackChunkName: "pages_index__type" */).then(m => m.default || m)
const _146026e2 = () => import('..\\pages\\inbox\\_user.vue' /* webpackChunkName: "pages_inbox__user" */).then(m => m.default || m)
const _e36ef77a = () => import('..\\pages\\comment-details\\_type.vue' /* webpackChunkName: "pages_comment-details__type" */).then(m => m.default || m)
const _7ef2b604 = () => import('..\\pages\\myclasses\\_id.vue' /* webpackChunkName: "pages_myclasses__id" */).then(m => m.default || m)
const _029c3f64 = () => import('..\\pages\\posts\\_type.vue' /* webpackChunkName: "pages_posts__type" */).then(m => m.default || m)
const _7f7fce76 = () => import('..\\pages\\index_1.vue' /* webpackChunkName: "pages_index_1" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/myclasses",
			component: _2d4b55d4,
			name: "myclasses"
		},
		{
			path: "/entry",
			component: _2f945664,
			name: "entry",
			children: [
				{
					path: "register",
					component: _783bf807,
					name: "entry-register"
				},
				{
					path: "find-pwd",
					component: _1aedaf8d,
					name: "entry-find-pwd"
				},
				{
					path: "login",
					component: _32232e96,
					name: "entry-login"
				}
			]
		},
		{
			path: "/profile/:id?",
			component: _303122af,
			name: "profile-id",
			children: [
				{
					path: ":type?",
					component: _611bc2ba,
					name: "profile-id-type"
				}
			]
		},
		{
			path: "/index/:type?",
			component: _6e8fcd05,
			name: "index-type"
		},
		{
			path: "/inbox/:user?",
			component: _146026e2,
			name: "inbox-user"
		},
		{
			path: "/comment-details/:type?",
			component: _e36ef77a,
			name: "comment-details-type"
		},
		{
			path: "/myclasses/:id?",
			component: _7ef2b604,
			name: "myclasses-id"
		},
		{
			path: "/posts/:type?",
			component: _029c3f64,
			name: "posts-type"
		},
		{
			path: "/index:1",
			component: _7f7fce76,
			name: "index1"
		}
    ],
    
    
    fallback: false
  })
}
