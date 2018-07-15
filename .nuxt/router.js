import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _1185e5b4 = () => import('..\\pages\\trade-detail.vue' /* webpackChunkName: "pages_trade-detail" */).then(m => m.default || m)
const _f3829344 = () => import('..\\pages\\query.vue' /* webpackChunkName: "pages_query" */).then(m => m.default || m)
const _70f666c1 = () => import('..\\pages\\member\\wxbuy.vue' /* webpackChunkName: "pages_member_wxbuy" */).then(m => m.default || m)
const _7651b82e = () => import('..\\pages\\member\\applicant-edit.vue' /* webpackChunkName: "pages_member_applicant-edit" */).then(m => m.default || m)
const _94e20706 = () => import('..\\pages\\member\\applicant-list.vue' /* webpackChunkName: "pages_member_applicant-list" */).then(m => m.default || m)
const _03e734aa = () => import('..\\pages\\entry\\register.vue' /* webpackChunkName: "pages_entry_register" */).then(m => m.default || m)
const _58adf34a = () => import('..\\pages\\member\\trade-list.vue' /* webpackChunkName: "pages_member_trade-list" */).then(m => m.default || m)
const _6807c016 = () => import('..\\pages\\entry\\forget.vue' /* webpackChunkName: "pages_entry_forget" */).then(m => m.default || m)
const _1dc018a5 = () => import('..\\pages\\member\\pay-order.vue' /* webpackChunkName: "pages_member_pay-order" */).then(m => m.default || m)
const _78ef674e = () => import('..\\pages\\member\\trade-detail.vue' /* webpackChunkName: "pages_member_trade-detail" */).then(m => m.default || m)
const _3a1da472 = () => import('..\\pages\\member\\trade-edit.vue' /* webpackChunkName: "pages_member_trade-edit" */).then(m => m.default || m)
const _5a8d04de = () => import('..\\pages\\entry\\login.vue' /* webpackChunkName: "pages_entry_login" */).then(m => m.default || m)
const _3e6c37f3 = () => import('..\\pages\\category-reference\\_type.vue' /* webpackChunkName: "pages_category-reference__type" */).then(m => m.default || m)
const _7c609d30 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			path: "/trade-detail",
			component: _1185e5b4,
			name: "trade-detail"
		},
		{
			path: "/query",
			component: _f3829344,
			name: "query"
		},
		{
			path: "/member/wxbuy",
			component: _70f666c1,
			name: "member-wxbuy"
		},
		{
			path: "/member/applicant-edit",
			component: _7651b82e,
			name: "member-applicant-edit"
		},
		{
			path: "/member/applicant-list",
			component: _94e20706,
			name: "member-applicant-list"
		},
		{
			path: "/entry/register",
			component: _03e734aa,
			name: "entry-register"
		},
		{
			path: "/member/trade-list",
			component: _58adf34a,
			name: "member-trade-list"
		},
		{
			path: "/entry/forget",
			component: _6807c016,
			name: "entry-forget"
		},
		{
			path: "/member/pay-order",
			component: _1dc018a5,
			name: "member-pay-order"
		},
		{
			path: "/member/trade-detail",
			component: _78ef674e,
			name: "member-trade-detail"
		},
		{
			path: "/member/trade-edit",
			component: _3a1da472,
			name: "member-trade-edit"
		},
		{
			path: "/entry/login",
			component: _5a8d04de,
			name: "entry-login"
		},
		{
			path: "/category-reference/:type?",
			component: _3e6c37f3,
			name: "category-reference-type"
		},
		{
			path: "/",
			component: _7c609d30,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
