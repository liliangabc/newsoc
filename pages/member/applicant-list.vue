<template>
<div class="com-member-list page-member-applicant-list">
  <com-top-tabs replace></com-top-tabs>
  <div class="clearfix titlebar">
    <span class="title">申请人信息</span>
    <router-link class="button link" to="/member/applicant-edit">添加商标申请人</router-link>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>申请人类型</th>
        <th>申请人名称</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>{{item.kind}}</td>
        <td>{{item.name}}</td>
        <td>
          <nuxt-link class="link" :to="`/member/applicant-edit?id=${item.id}`">完善信息</nuxt-link>
          <span class="fgline">|</span>
          <nuxt-link class="link" to="/member/trade-edit">注册商标</nuxt-link>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import ComTopTabs from '~/components/member/top-tabs'
export default {
  components: { ComTopTabs },
  asyncData({ route, store }) {
    return store.dispatch('get-applicant-list').then(data => {
      return { list: data.list }
    }).catch(err => ({ errmsg: err.message }))
  },
  data() {
    return { list: [] }
  }
}
</script>
<style lang="scss" src="~/components/member/style.scss"></style>