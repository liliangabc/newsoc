<template>
<div class="com-posts-menu-actions">
  <com-posts-share></com-posts-share>
  <com-posts-report></com-posts-report>
  <com-posts-invite></com-posts-invite>
  <com-posts-edit></com-posts-edit>
  <com-posts-gift></com-posts-gift>
  <com-market-exchange></com-market-exchange>
</div>
</template>
<script>
import ComPostsShare from './share'
import ComPostsReport from './report'
import ComPostsInvite from './invite'
import ComPostsEdit from './edit'
import ComPostsGift from './gift'
import ComMarketExchange from './exchange'
export default {
  components: {
    ComPostsShare, ComPostsReport, ComPostsInvite, ComPostsEdit, ComPostsGift, ComMarketExchange
  }
}
</script>