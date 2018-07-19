import { dateUtil } from '~/plugins'
// 编辑模态对话框混合
export const editMixin = {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    detail(newVal) { this.watchDetail(newVal) }
  },
  methods: {
    // 类别选择改变
    onCategoryChange(value) {
      let category = this.categories.find(item => item.code == value)
      if (category) this.formData.categoryName = category.name
    }
  }
}

// 编辑模态对话框日期时间混合
export const dateMixin = {
  data() {
    return {
      date: { eventTime: '', attendTime: '' }
    }
  },
  computed: {
    // 是否禁用提交按钮
    disabled() {
      return Object.values(this.formData).some(val => val === '' || val === undefined)
    },
    // 活动日期选项 | 必须大于当前时间
    whenDateOptions() {
      return {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }
    },
    // 截至报名日期选项 | 必须大于当前时间且小于活动时间
    endDateOptions() {
      return {
        disabledDate: time => {
          return time > new Date(this.date.eventTime) || time.getTime() < Date.now()
        }
      }
    }
  },
  methods: {
    // 活动时间改变 | 清空截至报名时间 转化为非JS标准时间格式给表单数据活动时间
    onWhenTimeChange(val) {
      this.formData.eventTime = val ? dateUtil.toPostsTime(val) : ''
    },
    // 报名截至时间改变 | 转化为非JS标准时间格式给表单数据活动报名截至时间
    onAttendTimeChange(val) {
      this.formData.attendTime = val ? dateUtil.toPostsTime(val) : ''
    }
  }
}