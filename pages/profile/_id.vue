<template>
<div class="page-profile">
  <com-profile-header></com-profile-header>
  <com-profile-tabs>
    <nuxt-child/>
  </com-profile-tabs>
</div>
</template>
<script>
import ComProfileHeader from '~/components/profile/header'
import ComProfileTabs from '~/components/profile/tabs'
export default {
  validate({ params }) {
    return params.id
  },
  scrollToTop: true,
  asyncData({ route, store }) {
    return store.dispatch('profile/get', { route })
  },
  components: { ComProfileHeader, ComProfileTabs }
}
</script>