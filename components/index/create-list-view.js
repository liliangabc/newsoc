import ComCardList from '~/components/card/list'

export function CreateListView(type) {
  return {
    name: `com-${type}-list-view`,
    render(h) {
      let { listData } = this.$store.state.home
      return h(ComCardList, { props: { listData, type } })
    }
  }
}