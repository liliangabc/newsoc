<template>
<div class="page-profile-dynamic">
  <com-followers v-if="type == '6'" :list="listData.list"></com-followers>
  <template v-else>
    <com-profile-sidebar></com-profile-sidebar>
    <div class="wrapper">
      <com-card-list :listData="listData" :type="type"></com-card-list>
    </div>
  </template>
</div>
</template>
<script>
import ComProfileSidebar from '~/components/profile/sidebar'
import ComCardList from '~/components/card/list'
import ComFollowers from '~/components/profile/followers'
export default {
  asyncData({ route, store }) {
    return store.dispatch('profile/getDynamic', { route })
  },
  components: { ComProfileSidebar, ComCardList, ComFollowers },
  data() {
    return {
      listData: { page: 1, hasNext: false, list: [] }
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    fTab() {
      return this.$route.query.tab
    }
  },
  watch: {
    fTab(newVal) {
      if (newVal) this.getDynamic()
    }
  },
  methods: {
    getDynamic(action) {
      return this.$store.dispatch('profile/getDynamic', { route: this.$route, action }).then(data => {
        this.listData = data.listData
      }).catch(err => this.$message.error(err.message))
    }
  }
}
</script>
<style lang="scss">
.page-profile-dynamic {
  padding: 42px 42px 0;
  display: flex;
  > .wrapper {
    flex: 1;
    margin-left: 75px;
  }
}
</style>