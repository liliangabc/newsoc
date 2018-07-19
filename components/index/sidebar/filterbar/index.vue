<template>
<div class="com-index-filterbar">
  <h3 class="title">sort by</h3>
  <div class="filter-wrapper">
    <!-- deals删选 -->
    <div class="deals-filter" v-if="hasDeals">
      <div class="wrapper">
        <span class="label">Circcus Deals</span>
        <el-checkbox true-label="1" false-label="0" v-model="flashDeals" @change="onDealChange"></el-checkbox>
      </div>
      <div class="wrapper">
        <span class="label">Daily Deals</span>
        <el-checkbox true-label="1" false-label="0" v-model="dailyDeals" @change="onDealChange"></el-checkbox>
      </div>
    </div>
    <!-- 下拉列表删选 -->
    <ul class="select-list">
      <li v-for="(item, index) in sorts" :key="index">
        <span class="label">{{item.label}}</span>
        <el-select placeholder="" no-data-text="No Data" collapse-tags v-model="postData[item.label]" @change="onSelectChange">
          <el-option v-for="option in item.list" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </li>
    </ul>
    <!-- 学校复选框列表删选 -->
    <div class="school-list" v-if="schools.length">
      <span class="label">school</span>
      <el-scrollbar tag="ul">
        <li>
          <span class="label">All School</span>
          <el-checkbox v-model="schoolSelectedAll" @change="onSchoolCheckedAllChange"></el-checkbox>
        </li>
        <li>
          <span class="label">Only show my school</span>
          <el-checkbox v-model="schoolSelectedOnlyMy" @change="onSchoolCheckedOnlyMyChange"></el-checkbox>
        </li>
        <el-checkbox-group v-model="selectedSchools" @change="onSchoolCheckedChange">
          <li v-for="item in schools" :key="item.value">
            <span class="label" :title="item.label">{{item.label}}</span>
            <el-checkbox :label="item.value"></el-checkbox>
          </li>
        </el-checkbox-group>
      </el-scrollbar>
    </div>
  </div>
</div>
</template>
<script>
import { createFilterSorts, hasDeals, getListByLabel, onPostDataChange, filterMixin } from './sort-data'
export default {
  mixins: [filterMixin],
  data() {
    return {
      sorts: createFilterSorts(this.$route),
      postData: {},
      flashDeals: '0',
      dailyDeals: '0',
      schools: [],
      schoolSelectedAll: false,
      schoolSelectedOnlyMy: false,
      selectedSchools: []
    }
  },
  computed: {
    hasDeals() {
      return hasDeals(this.$route)
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.onRouteChange(newVal, oldVal)
    }
  },
  methods: {
    // 获取学校
    getSchools() {
      return this.$store.dispatch('home/getSchools', { route: this.$route }).then(data => {
        this.schools = []
        data.forEach(item => this.schools.push({
          label: item.collegeName,
          value: item.collegeCode
        }))
      })
    },
    // 获取帖子类别
    getCategory() {
      let { type } = this.$route.params
      this.$store.dispatch('home/getCategory', type).then(data => {
        let arr = getListByLabel(this.sorts, 'category')
        data.forEach(item => arr.push({
          label: item.name,
          value: item.code
        }))
      })
    },
    // 选项列表改变
    onSelectChange() {
      onPostDataChange(this.postData, this)
    },
    // 交易类型改变
    onDealChange() {
      let { name, params } = this.$route, query = Object.assign({}, this.$route.query)
      query.dealType = `${this.flashDeals},${this.dailyDeals}`
      this.$router.replace({ name, params, query })
    },
    // 学校复选框选选择所有学校
    onSchoolCheckedAllChange(val) {
      let { name, params, query } = this.$route
      query = Object.assign({}, query)
      this.selectedSchools = []
      this.schoolSelectedOnlyMy = false
      val && this.schools.forEach(item => this.selectedSchools.push(item.value))
      if (val) {
        query.colleges = this.selectedSchools.join(',')
      } else {
        delete query.colleges
      }
      this.$router.replace({ name, params, query })
    },
    // 学校复选框仅选择我的学校
    onSchoolCheckedOnlyMyChange(val) {
      let { name, params, query } = this.$route
      query = Object.assign({}, query)
      this.selectedSchools = []
      this.schoolSelectedAll = false
      if (val) {
        let myCollegeCode= this.$store.state.userData.userInfo.collegeCode
        let school = this.schools.find(item => item.value == myCollegeCode)
        if (school) {
          this.selectedSchools = [school.value]
          query.colleges = school.value
        }
      } else {
        delete query.colleges
      }
      this.$router.replace({ name, params, query })
    },
    // 学校复选框选择改变
    onSchoolCheckedChange(val) {
      let { name, params, query } = this.$route
      query = Object.assign({}, query)
      let schoolCount = this.schools.length
      let selectedSchoolCount = this.selectedSchools.length
      let myCollegeCode= this.$store.state.userData.userInfo.collegeCode
      this.schoolSelectedAll = schoolCount == selectedSchoolCount
      this.schoolSelectedOnlyMy = selectedSchoolCount == 1 && this.selectedSchools[0] == myCollegeCode
      if (selectedSchoolCount) {
        query.colleges = this.selectedSchools.join(',')
      } else {
        delete query.colleges
      }
      this.$router.replace({ name, params, query })
    },
    // 路由改变
    onRouteChange(newVal, oldVal) {
      let diffType = newVal.params.type != oldVal.params.type
      let diffKW = newVal.query.keyWords != oldVal.query.keyWords
      this.sorts = createFilterSorts(newVal)
      this.getCategory()
      if (diffKW) this.postData = {}
      if (diffType || diffKW) this.getSchools()
    }
  },
  beforeMount() {
    this.getSchools().then(() => {
      let schoolCount = this.schools.length
      let selectedSchoolCount = this.selectedSchools.length
      let myCollegeCode= this.$store.state.userData.userInfo.collegeCode
      this.schoolSelectedAll = schoolCount == selectedSchoolCount
      this.schoolSelectedOnlyMy = selectedSchoolCount == 1 && this.selectedSchools[0] == myCollegeCode
    })
    this.getCategory()
  }
}
</script>
<style lang="scss" src="./style.scss"></style>