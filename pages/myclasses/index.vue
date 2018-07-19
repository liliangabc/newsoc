<template>
<div>ceshi</div>
</template>
<script>
export default {
  asyncData({ route, store }) {
    return store.dispatch('myclasses/getList', {}).then(data => {
      let { pageNo, result, hasNext } = data.data
      return {
        listData: {
          page: +pageNo,
          hasNext: hasNext == '1',
          list: result
        }
      }
    })
  },
  data() {
    return {
      listData: { page: 1, hasNext: false, list: [] }
    }
  }
}
</script>
