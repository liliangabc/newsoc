<template>
<div class="com-member-list page-member-trade-list">
  <com-top-tabs replace></com-top-tabs>
  <div class="clearfix titlebar">
    <span class="title">我的商标列表:</span>
    <router-link class="button link" to="/member/trade-edit">注册我的商标</router-link>
  </div>
  <div class="clearfix filterbar">
    <select v-model="filterAttrs.registerKind" @change="getList()">
      <option value="">所有类型</option>
      <option v-for="item in kinds" :key="item.value" :value="item.value">{{item.label}}</option>
    </select>
    <div class="searchbox">
      <input type="text" placeholder="请输入申请人或商标名称" v-model="tempKey" @keyup.enter="onSearch">
      <button class="button" @click="onSearch">搜索</button>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>商标名称</th>
        <th>商标状态</th>
        <th>金额</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.status}}</td>
        <td>{{item.money}}</td>
        <td class="opera">
          <router-link class="link" :to="`/member/trade-detail?id=${item.id}`">查看详情</router-link>
          <span class="fgline">|</span>
          <router-link v-if="item.payStatus !== 1" class="link" :to="`/member/pay-order?id=${item.id}&product_no=${item.outTradeNo}`">付款</router-link>
          <span v-else>已支付</span>
        </td>
      </tr>
    </tbody>
  </table>
  <com-pager :pageSize="pageSize" :total="total" :currentPage="currentPage" @current-change="getList"></com-pager>
  <com-loading v-if="loading" style="background: transparent"></com-loading>
</div>
</template>
<script>
import ComTopTabs from '~/components/member/top-tabs'
export default {
  asyncData({ route, store }) {
    return store.dispatch('get-trade-orderList', {
      page: 1, limit: 10
    }).then(data => {
      let { list, totalCount } = data.page
      return { list, total: totalCount }
    }).catch(err => ({ errmsg: err.message }))
  },
  components: { ComTopTabs },
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      list: [],
      loading: false,
      filterAttrs: {
        registerKind: '',
        key: ''
      },
      kinds: [
        { label: '自然人', value: encodeURIComponent('自然人') },
        { label: '个体工商户', value: encodeURIComponent('个体工商户') },
        { label: '公司或其它组织', value: encodeURIComponent('公司或其它组织') },
      ],
      tempKey: ''
    }
  },
  methods: {
    getList(page = 1) {
      this.loading = true
      this.$store.dispatch('get-trade-orderList', {
        page,
        limit: this.pageSize,
        ...this.filterAttrs
      }).then(data => {
        this.loading = false
        this.list = data.page.list
        this.total = data.page.totalCount
      }).catch(err => {
        this.loading = false
        alert(err.message)
      })
    },
    onSearch() {
      this.filterAttrs.key = encodeURIComponent(this.tempKey)
      this.getList()
    }
  }
}
</script>
<style lang="scss" src="~/components/member/style.scss"></style>