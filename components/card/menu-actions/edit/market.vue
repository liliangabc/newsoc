<template>
<div class="com-market-edit">
  <el-form label-position="right" label-width="120px" :model="formData">
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
      <el-input v-model.trim="formData.title"></el-input>
    </el-form-item>
    <!-- 描述 -->
    <el-form-item label="Description">
      <el-input type="textarea" rows="7" v-model.trim="formData.content"></el-input>
    </el-form-item>
    <!-- 新还是旧 -->
    <el-form-item label="Condition">
      <el-select v-model="formData.isNew">
        <el-option label="New" value="1"></el-option>
        <el-option label="Used" value="0"></el-option>
      </el-select>
    </el-form-item>
    <!-- 提供还是需要 -->
    <el-form-item label="Type">
      <el-select v-model="formData.offer">
        <el-option label="Offer" value="1"></el-option>
        <el-option label="Need" value="0"></el-option>
      </el-select>
    </el-form-item>
    <!-- 类别 -->
    <el-form-item label="Category">
      <el-select v-model="formData.categoryCode" @change="onCategoryChange">
        <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <!-- 价格 -->
    <el-form-item label="Price">
      <el-input-number v-model="formData.price" controls-position="right" :min="0"></el-input-number>
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
import { editMixin } from './utils'
const formData = {
  title: '',
  content: '',
  isNew: '',
  offer: '',
  categoryCode: '',
  categoryName: '',
  price: 0,
  anonymous: '0',
  onlyMine: '0'
}
export default {
  mixins: [editMixin],
  data() {
    return {
      formData: Object.assign({}, formData) ,
      pics: []
    }
  },
  computed: {
    disabled() {
      return Object.values(this.formData).some(val => val === '' || val === undefined) || !this.pics.length
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
        dispatch('post', { api: 'student_publish_markets', data }).then(data => {
          this.$emit('submited', { status: 'ok', message: data.info })
        }).catch(err => this.$emit('submited', { message: err.message }))
      }).catch(err => this.$emit('submited', { message: err.message }))
    },
    // 观察详情改变
    watchDetail(val) {
      if (val && Object.keys(val).length) {
        Object.keys(this.formData).forEach(key => this.formData[key] = val[key])
        this.pics = val.picUrls.split(',').map(url => ({ blob: url, file: url }))
      } else {
        this.formData = Object.assign({}, formData)
        this.pics = []
      }
    }
  }
}
</script>