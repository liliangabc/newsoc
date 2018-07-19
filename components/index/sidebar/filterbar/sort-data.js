import { isMarket, isEvent, isClass, isMeetup, isMoment, isUser } from '~/plugins'

// 是否包含关键字
function hasKW(route) {
  let { keyWords } = route.query
  return keyWords && keyWords.trim() 
}

// 获取列表通过标签
export function getListByLabel(arr, label) {
  let obj =  arr.find(item => item.label.toLowerCase().indexOf(label) != -1)
  return obj ? obj.list : []
}

// 创建商品删选类别
function createMarketSort(route) {
  return hasKW(route) ? [
    {
      label: 'sub-category',
      list: []
    },
    {
      label: 'sort',
      list: [
        { label: 'Price high to low', value: '0' },
        { label: 'Price low to high', value: '1' },
        { label: 'New arrival', value: '2' },
        { label: 'Most Related', value: '3' }
      ]
    },
    {
      label: 'offer/need',
      list: [
        { label: 'Offer/Need', value: '0' },
        { label: 'Need', value: '1' },
        { label: 'Offer', value: '2' }
      ]
    },
    {
      label: 'condition',
      list: [
        { label: 'New/Old', value: '0' },
        { label: 'Old', value: '1' },
        { label: 'New', value: '2' }
      ]
    }
  ] : [
    {
      label: 'category',
      list: []
    },
    {
      label: 'school',
      list: [
        { label: 'All colleges', value: '0' },
        { label: 'Only my college', value: '1' }      
      ]
    },
    {
      label: 'sort',
      list: [
        { label: 'Review Number', value: '0' },
        { label: 'Post Time', value: '1' },
        { label: 'Price Low to High', value: '2' },
        { label: 'Price High to Low', value: '3' }
      ]
    }
  ]
}

// 创建活动删选类别
function createEventSort(route) {
  return hasKW(route) ? [
    {
      label: 'sub-category',
      list: []
    },
    {
      label: 'sort',
      list: [
        { label: 'Popular first', value: '0' },
        { label: 'Event time', value: '1' },
        { label: 'Post time', value: '2' }
      ]
    }
  ] : [
    {
      label: 'category',
      list: []
    },
    {
      label: 'school',
      list: [
        { label: 'All colleges', value: '0' },
        { label: 'Only my college', value: '1' }
      ]
    },
    {
      label: 'sort',
      list: [
        { label: 'Event Time', value: '0' },
        { label: 'Attendees Number', value: '1' },
        { label: 'Review Number', value: '2' },
        { label: 'Upvote Number', value: '3' },
        { label: 'Post Time', value: '4' }
      ]
    }
  ]
}

// 创建问题删选类别
function createClassSort(route) {
  return hasKW(route) ? [
    {
      label: 'sort',
      list: [
        { label: 'New first', value: '0' },
        { label: 'Old first', value: '1' },
        { label: 'Popular first', value: '2' },
        { label: 'Reward high to low', value: '3' },
        { label: 'Reward low to high', value: '4' }
      ]
    }
  ] : []
}

// 创建约会删选类别
function createMeetupSort(route) {
  return hasKW(route) ? [
    {
      label: 'sub-category',
      list: []
    },
    {
      label: 'sort',
      list: [
        { label: 'Popular first', value: '0' },
        { label: 'Event time', value: '1' },
        { label: 'Post time', value: '2' }
      ]
    }
  ] : [
    {
      label: 'category',
      list: []
    },
    {
      label: 'school',
      list: [
        { label: 'All colleges', value: '0' },
        { label: 'Only my college', value: '1' }
      ]
    },
    {
      label: 'sort',
      list: [
        { label: 'MeetUp Time', value: '0' },
        { label: 'Review Number', value: '1' },
        { label: 'Post Time', value: '2' }
      ]
    }
  ]
}

// 创建用户删选类别
function createUserSort(route) {
  return hasKW(route) ? [
    {
      label: 'school',
      list: [
        { label: 'All colleges', value: '0' },
        { label: 'Only my college', value: '1' }
      ]
    }
  ] : []
}

// 根据类型创建删选条件
export function createFilterSorts(route) {
  let { type } = route.params
  if (isMarket(type)) {
    return createMarketSort(route)
  } else if (isEvent(type)) {
    return createEventSort(route)
  } else if (isClass(type)) {
    return createClassSort(route)
  } else if (isMeetup(type)) {
    return createMeetupSort(route)
  } else if (isUser(type)) {
    // return createUserSort(route)
    return []
  } else if (isMoment(type)) {
    return []
  }
}

// 是否包含deals
export function hasDeals(route) {
  return isMarket(route.params.type) && !hasKW(route)
}

// 是否子串 不分大小写
function isSubStr(substr, str) {
  return str.toLowerCase().indexOf(substr.toLowerCase()) != -1
}

// 提交数据改变处理
export function onPostDataChange(data, vm) {
  let { name, params } = vm.$route, kw = hasKW(vm.$route), query = kw ? { keyWords: kw } : {}
  for (let key in data) {
    let val = data[key], qkey
    if (isSubStr(key, 'sub-category')) {
      qkey = 'categoryCode'
    } else if (isSubStr(key, 'sort')) {
      qkey = 'sort'
    } else if (isSubStr(key, 'offer/need')) {
      qkey = 'offer'
    } else if (isSubStr(key, 'condition')) {
      qkey = 'condition'
    } else if (isSubStr(key, 'school')) {
      qkey = kw ? 'colleges' : 'onlyMine'
    }
    query[qkey] = val
  }
  vm.$router.replace({ name, params, query })
}

// 删选组件混合 通过路由查询参数初始化数据
export const filterMixin = {
  methods: {
    initData() {
      let { categoryCode, dealType, onlyMine, colleges, sort, offer, condition } = this.$route.query

      if (dealType) {
        let arr = dealType.trim().split(',').filter(item => item.trim())
        if (arr.length > 1) {
          this.flashDeals = arr[0]
          this.dailyDeals = arr[1]
        }
      }

      if (sort && sort.trim()) {
        this.postData.sort = sort.trim()
      }

      if (offer && offer.trim()) {
        this.postData['offer/need'] = offer.trim()
      }

      if (condition && condition.trim()) {
        this.postData.condition = condition.trim()
      }

      if (onlyMine && onlyMine.trim()) {
        this.postData.onlyMine = onlyMine.trim()
      }

      if (colleges && colleges.trim()) {
        this.selectedSchools = colleges.trim().split(',')
      }

      if (hasKW(this.$route)) {
        if (categoryCode && categoryCode.trim()) {
          this.postData['sub-category'] = categoryCode.trim()
        }
      } else {
        if (categoryCode && categoryCode.trim()) {
          this.postData.category = categoryCode.trim()
        }
      }
    }
  },
  mounted() {
    this.initData()
  }
}