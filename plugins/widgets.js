import Vue from 'vue'
import ComLoading from '~/components/common/loading'
import ComPager from '~/components/common/pager'
import ComDialog from '~/components/common/dialog'

Vue.component('com-pager', ComPager)
Vue.component('com-loading', ComLoading)
Vue.component('com-dialog', ComDialog)
Vue.mixin({
  mounted() {
    if (this.errmsg) {
      alert(this.errmsg)
    }
  }
})