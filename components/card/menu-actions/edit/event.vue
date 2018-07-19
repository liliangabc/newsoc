<template>
<div class="com-event-edit">
  <el-form label-position="right" label-width="200px" :model="formData" onsubmit="return false;">
    <!-- 标题 -->
    <el-form-item label="Title">
      <el-input v-model.trim="formData.title"></el-input>
    </el-form-item>
    <!-- 描述 -->
    <el-form-item label="Description">
      <com-editor ref="com-editor" height="130" :isRichText="true"></com-editor>
    </el-form-item>
    <!-- 类别-->
    <el-form-item label="Category">
      <el-select v-model="formData.categoryCode" @change="onCategoryChange">
        <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <!-- 时间 -->
    <el-form-item label="When">
      <el-date-picker type="datetime" placeholder="Select date time" format="MM/dd/yyyy HH:mm A"
        :picker-options="whenDateOptions" v-model="date.eventTime" @change="onWhenTimeChange"></el-date-picker>
    </el-form-item>
    <!-- 截至报名时间 -->
    <el-form-item label="Registration Deadline">
      <el-date-picker type="datetime" placeholder="Select date time" format="MM/dd/yyyy HH:mm A"
        :picker-options="endDateOptions" v-model="date.attendTime" @change="onAttendTimeChange"></el-date-picker>
    </el-form-item>
    <!-- 地点 -->
    <el-form-item label="Where">
      <el-input v-model.trim="formData.eventAddress"></el-input>
    </el-form-item>
    <!-- 最大参与人数 -->
    <el-form-item label="Attendance Maximum">
      <el-input-number v-model="formData.attendCount" controls-position="right" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item>
      <!-- 是否匿名发布 -->
      <el-checkbox v-model="formData.anonymous" true-label="1" false-label="0">Post as anonymously</el-checkbox><br>
      <!-- 是否仅在我的学校展示 -->
      <el-checkbox v-model="formData.onlyMine" true-label="1" false-label="0">Only visible for my college</el-checkbox>
    </el-form-item>
    <el-form-item class="form-submit-wrapper">
      <el-button type="primary" size="small" :disabled="disabled" @click="onSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { editMixin, dateMixin } from './utils'
import ComEditor from '~/components/common/editor'
// 表单初始数据
const formData = {
  title: '',
  categoryCode: '',
  categoryName: '',
  attendCount: '',
  anonymous: '0',
  onlyMine: '0',
  eventTime: '',
  attendTime: '',
  eventAddress: ''
}
export default {
  mixins: [editMixin, dateMixin],
  components: { ComEditor },
  data() {
    return { formData: Object.assign({}, formData) }
  },
  methods: {
    // 提交表单
    onSubmit() {
      let { dispatch } = this.$store, comEditor = this.$refs['com-editor']
      if (comEditor.isEmpty()) return this.$alert('Description cannot be empty!', 'alert', { type: 'error' })
      this.$emit('submiting')
      comEditor.upload().then(([picUrls]) => {
        let content = comEditor.getHTML()
        let data = Object.assign(this.formData, { picUrls, content, isPublish: '1', id: this.detail.id })
        dispatch('post', { api: 'student_publish_events', data }).then(data => {
          this.$emit('submited', { status: 'ok', message: data.info })
        }).catch(err => this.$emit('submited', { message: err.message }))
      }).catch(err => this.$emit('submited', { message: err.message }))
    },
    // 观察详情改变
    watchDetail(val) {
      if (val && Object.keys(val).length) {
        Object.keys(this.formData).forEach(key => this.formData[key] = val[key])
        this.$refs['com-editor'].setInitContent(val.content, val.picUrls)
        this.date.eventTime = val.eventTime ? new Date(val.eventTime) : ''
        this.date.attendTime = val.attendTime ? new Date(val.attendTime) : ''
      } else {
        this.formData = Object.assign({}, formData)
      }
    }
  }
}
</script>