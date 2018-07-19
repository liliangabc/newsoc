<template>
<div class="com-meetup-edit">
  <el-form label-position="right" label-width="200px" :model="formData">
    <!-- 图片 -->
    <el-form-item label="Add Image">
      <a href="javascript:;" class="btn-selectimage" @click="onSelectImage"></a>
      <input type="file" ref="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple @change="onFileChange">
      <ul class="pic-list">
        <li v-for="(pic, index) in pics" :key="pic.blob" :style="{backgroundImage: `url(${pic.blob})`}">
          <el-button type="warning" icon="el-icon-close" circle @click="onDeletePicItem(index)"></el-button>
        </li>
      </ul>
    </el-form-item>
    <!-- 标题 -->
    <el-form-item label="Title">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <!-- 描述 -->
    <el-form-item label="Description">
      <el-input type="textarea" rows="7" v-model="formData.content"></el-input>
    </el-form-item>
    <!-- 对方年龄区间 -->
    <el-form-item label="His/Her Age">
      <el-select v-model="formData.age">
        <el-option v-for="age in ages" :key="age" :value="age"></el-option>
      </el-select>
    </el-form-item>
    <!-- 对方性别 | 男 女 其他 -->
    <el-form-item label="Gender">
      <el-select v-model="formData.gender">
        <el-option v-for="gender in genders" :key="gender" :value="gender"></el-option>
      </el-select>
    </el-form-item>
    <!-- 约会类别 | 看电影 喝咖啡 购物等-->
    <el-form-item label="Category">
      <el-select v-model="formData.categoryCode" @change="onCategoryChange">
        <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <!-- 谁买单 | AA制 我买单 你买单-->
    <el-form-item label="Cost">
      <el-select v-model="formData.cost">
        <el-option v-for="cost in costs" :key="cost" :value="cost"></el-option>
      </el-select>
    </el-form-item>
    <!-- 交通方式 | 你来接我 我自己打车等 -->
    <el-form-item label="Transportation">
      <el-select v-model="formData.transportation">
        <el-option v-for="transportation in transportations" :key="transportation" :value="transportation"></el-option>
      </el-select>
    </el-form-item>
    <!-- 约会时间 -->
    <el-form-item label="When">
      <el-date-picker type="datetime" placeholder="Select date time" format="MM/dd/yyyy HH:mm A"
        :picker-options="whenDateOptions" v-model="date.eventTime" @change="onWhenTimeChange"></el-date-picker>
    </el-form-item>
    <!-- 截至报名时间 -->
    <el-form-item label="Registration Deadline">
      <el-date-picker type="datetime" placeholder="Select date time" format="MM/dd/yyyy HH:mm A"
        :picker-options="endDateOptions" v-model="date.attendTime" @change="onAttendTimeChange"></el-date-picker>
    </el-form-item>
    <!-- 约会地点 | 在哪约会 -->
    <el-form-item label="Where">
      <el-input v-model.trim="formData.eventAddress"></el-input>
    </el-form-item>
    <!-- 最大参与人数 -->
    <el-form-item label="Attendance Maximum">
      <el-input-number v-model="formData.attendCount" controls-position="right" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item>
      <!-- 可否带一个朋友过来 | 俗称电灯泡 -->
      <el-checkbox v-model="formData.allowFriend" true-label="1" false-label="0">Okay to bring friends</el-checkbox><br>
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
// 数组常量定义
const ages = ['Under 21', '21-25', '25+', 'Unlimited']
const genders = ['Lady', 'Gentleman', 'Other']
const costs = ['Split', 'My treat', 'Your treat']
const transportations = ['Offer a ride', 'Meet at the place', 'Pick me up']
// 表单初始数据
const formData = {
  title: '',
  content: '',
  age: '',
  gender: '',
  categoryCode: '',
  categoryName: '',
  cost: '',
  transportation: '',
  attendCount: '',
  allowFriend: '0',
  anonymous: '0',
  onlyMine: '0',
  eventTime: '',
  attendTime: '',
  eventAddress: ''
}
export default {
  mixins: [editMixin, dateMixin],
  data() {
    return {
      formData: Object.assign({}, formData),
      pics: [], ages, genders, costs, transportations
    }
  },
  methods: {
    // 打开文件对话框
    onSelectImage() {
      this.$refs.file.click()
    },
    // 文件改变
    onFileChange(event) {
      let { files } = event.target
      for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i]
        if (file.type.indexOf('image') == 0) {
          if (!this.pics.find(pic => pic.file.name == file.name)) {
            this.pics.push({ blob: window.URL.createObjectURL(file), file })
          }
        }
      }
    },
    // 删除一张图片
    onDeletePicItem(index) {
      this.pics.splice(index, 1)
    },
    // 提交表单
    onSubmit() {
      let { dispatch } = this.$store
      let promises = this.pics.map(pic => dispatch('upload', { file: pic.file }))
      this.$emit('submiting')
      Promise.all(promises).then(urls => {
        let data = Object.assign(this.formData, { isPublish: '1', id: this.detail.id, picUrls: urls.join(',') })
        dispatch('post', { api: 'publishOrUpdate_meetingup', data }).then(data => {
          this.$emit('submited', { status: 'ok', message: data.info })
        }).catch(err => this.$emit('submited', { message: err.message }))
      }).catch(err => this.$emit('submited', { message: err.message }))
    },
    // 观察详情改变
    watchDetail(val) {
      if (val && Object.keys(val).length) {
        Object.keys(this.formData).forEach(key => this.formData[key] = val[key])
        this.pics = val.picUrls ? val.picUrls.split(',').map(url => ({ blob: url, file: url })) : []
        this.date.eventTime = val.eventTime ? new Date(val.eventTime) : ''
        this.date.attendTime = val.attendTime ? new Date(val.attendTime) : ''
      } else {
        this.formData = Object.assign({}, formData)
        this.pics = []
      }
    }
  }
}
</script>