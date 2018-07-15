<template>
<div class="com-member-edit page-member-trade-edit">
  <com-top-tabs></com-top-tabs>
  <div class="form-container">
    <com-form-item label="申请人信息:">
      <button class="btn-add" @click="addApplicantDialog = true">新增商标申请人信息</button>
      <div class="list applicant-list">
        <button class="button" :class="{info: item.name !== formData.register}" v-for="item in applicantList" :key="item.id" @click="onSelectApplicant(item)">{{item.name}}</button>
      </div>
    </com-form-item>
    <com-form-item label="注册类型:">
      <div class="list">
        <button class="button" :class="{info: item.id !== curKind.id}" v-for="item in kinds" :key="item.id" @click="onSelectKind(item)">{{item.name}}</button>
      </div>
      <div class="help">{{curKind.describe}}</div>
    </com-form-item>
    <com-form-item label="商标信息:">
      <div class="inline-form">
        <div class="clearfix inline-form-item">
          <span class="label">商标名称:</span>
          <div class="content">
            <input type="text" class="name" v-model.trim="formData.name">
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">商标图样（选填）:</span>
          <div class="content">
            <div class="uploader">
              <div class="image" :style="{backgroundImage: `url(${image.blob})`}"></div>
              <input type="file" ref="img-uploader" accept="image/gif,image/jpeg,image/jpg,image/png" @change="onFileChange">
              <button class="btn-upload" @click="onSelectFile">上传商标图样文件</button>
              <p class="hint">（图样文件应小于2M，JPEG。请您注意，彩色图样上报后，商标色彩即为固定不变。否则，请上传黑白颜色图样）</p>
            </div>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">选择行业类别:</span>
          <div class="content">
            <select class="trade" v-model="curTrade" @change="onTradeSelectChange">
              <option value="">选择行业</option>
              <option v-for="item in tradeList" :key="item.id" :value="item">{{item.name}}</option>
            </select>
            <a class="link" target="__blank" href="/category-reference/trade">查看行业分类参考</a>
          </div>
        </div>
        <template v-if="tradeClassList.list.length">
          <div class="clearfix inline-form-item trade-class-select">
            <span class="label">选择核心类别:</span>
            <div class="content">
              <div class="list">
                <button class="button" :class="{info: !item.isSelected}" v-for="item in tradeClassList.list_core" :key="item.id" @click="onSelectClass(item)">第{{item.code}}类 {{item.name}}</button>
              </div>
            </div>
          </div>
          <div class="clearfix inline-form-item trade-class-select">
            <span class="label">选择通用类别:</span>
            <div class="content">
              <div class="list">
                <button class="button" :class="{info: !item.isSelected}" v-for="item in tradeClassList.list_general" :key="item.id" @click="onSelectClass(item)">第{{item.code}}类 {{item.name}}</button>
              </div>
            </div>
          </div>
          <div class="clearfix inline-form-item">
            <span class="label">自定义类别:</span>
            <div class="content">
              <div class="add-category">
                <button class="btn-add-to" @click="onOpenCustomClassSelectDialog">添加</button>
                <span class="hint">（您可以自行添加需要保护的类别）</span>
              </div>
              <div class="list">
                <button class="button" v-for="item in selectedCustomClasses" :key="item.classId" title="点击删除该类别" @click="deleteCustomClassItem(item)">
                  第{{item.code}}类 {{item.className}}
                  <i class="icon-delete">&times;</i>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </com-form-item>
    <com-form-item>
      <p class="total-amount">
        <span class="label">总费用: </span>
        <strong>{{totalMoney}}</strong>元
      </p>
    </com-form-item>
    <div class="submit-wrapper">
      <button class="btn-submit" @click="onSubmit">保存并付款</button>
    </div>
  </div>
  <!-- 添加申请人对话框 -->
  <com-dialog dialog-class="add-applicant-dialog" :visible.sync="addApplicantDialog">
    <div slot="body">
      <com-form-item label="申请人类型">
        <div class="radio-group">
          <p class="radio-block">
            <input type="radio" id="kindRadio1" name="kind" value="公司或其他组织" v-model="newApplicant.kind">
            <label for="kindRadio1">公司或其他组织</label>
          </p>
          <p class="radio-block">
            <input type="radio" id="kindRadio2" name="kind" value="个体工商户" v-model="newApplicant.kind">
            <label for="kindRadio2">个体工商户</label>
          </p>
          <p class="radio-block">
            <input type="radio" id="kindRadio3" name="kind" value="自然人" v-model="newApplicant.kind">
            <label for="kindRadio3">自然人</label>
          </p>
        </div>
      </com-form-item>
      <com-form-item label="申请人名称" box-class="inputbox">
        <input type="text" class="input" v-model.trim="newApplicant.name">
      </com-form-item>
      <com-form-item label="联系电话" box-class="inputbox">
        <input type="number" class="input" v-model.trim="newApplicant.mobile">
      </com-form-item>
    </div>
    <button slot="actions" class="button info" @click="addApplicantDialog = false">取消</button>
    <button slot="actions" class="button" :disabled="addApplicantDialogSubmitDisabled" @click="onAddApplicant">确定</button>
  </com-dialog>
  <!-- 自定义类别选择对话框 -->
  <com-dialog title="请选择类别" dialog-class="add-custom-class-dialog" :visible.sync="customClassSelectDialog">
    <ul slot="body" class="clearfix class-list">
      <li v-for="item in customClassList" :key="item.id">
        <button class="button" :class="{info: !item.isSelected}" @click="onSelectCustomClass(item)">第{{item.code}}类 {{item.name}}</button>
      </li>
    </ul>
    <button slot="actions" class="button" @click="onAddCustomClass">确定</button>
  </com-dialog>
  <com-loading fullscreen v-if="loading"></com-loading>
</div>
</template>
<script>
import ComTopTabs from '~/components/member/top-tabs'
import ComFormItem from '~/components/member/form-item'
import { validPicFile } from '~/plugins'
export default {
  components: { ComTopTabs, ComFormItem },
  data() {
    return {
      formData: { tradeClassList: [] },
      loading: false,

      addApplicantDialog: false,
      applicantList: [],
      newApplicant: {},

      kinds: [],
      curKind: {},

      image: {},

      tradeList: [],
      tradeClassList: {
        list: [],
        list_core: [],
        list_general: []
      },
      curTrade: '',

      customClassSelectDialog: false,
      tempSelectedCustomClasses: [],
      selectedCustomClasses: []
    }
  },
  computed: {
    addApplicantDialogSubmitDisabled() {
      let { kind, mobile, name } = this.newApplicant
      return !(kind && mobile && name)
    },
    totalMoney() {
      let classLen = this.formData.tradeClassList.length || 1
      let customClassLen = this.selectedCustomClasses.length
      return this.curKind.money * (classLen + customClassLen)
    },
    customClassList() {
      let result = []
      let { list, list_core, list_general } = this.tradeClassList
      let listLen = list.length
      let listCoreLen = list_core.length
      let listGeneralLen = list_general.length
      const inArr = (item, arr) => {
        for (let i = 0, len = arr.length; i < len; i++) {
          let curItem = arr[i]
          if (item.id === curItem.id) {
            return true
          }
        }
        return false
      }
      for (let i = 0; i < listLen; i++) {
        let listItem = list[i]
        if (!(inArr(listItem, list_core) || inArr(listItem, list_general))) {
          result.push(listItem)
        }
      }
      
      return result
    }
  },
  methods: {
    // 选择文件
    onSelectFile() {
      this.$refs['img-uploader'].click()
    },
    // 选择文件改变事件
    onFileChange(event) {
      let file = event.target.files[0]
      if (!file) return
      let validResult = validPicFile({ file, maxSize: 2048 })
      if (!validResult.ok) return alert(validResult.msg)
      this.image = { file, blob: window.URL.createObjectURL(file) }
    },
    // 获取申请人列表
    getApplicantList() {
      return this.$store.dispatch('get-applicant-list').then(data => {
        this.applicantList = data.list
        if (data.list.length) {
          this.onSelectApplicant(data.list[0])
        }
      }).catch(err => alert(err.message))
    },
    // 添加申请人
    onAddApplicant() {
      if (this.addApplicantDialogSubmitDisabled) return
      this.addApplicantDialog = false
      this.loading = true
      return this.$store.dispatch('save-applicant', this.newApplicant).then(data => {
        this.loading = false
        this.getApplicantList()
      }).catch(err => {
        this.loading = false
        alert(err.message)
      })
    },
    // 选择申请人
    onSelectApplicant(item) {
      this.$set(this.formData, 'register', item.name)
      this.$set(this.formData, 'registerKind', item.kind)
      this.$set(this.formData, 'mobile', item.mobile)
    },
    // 获取注册类型
    getKinds() {
      return this.$store.dispatch('getKinds').then(data => {
        this.kinds = data.list
        this.curKind = data.list[0]
        this.$set(this.formData, 'kind', this.curKind.name)
        this.$set(this.formData, 'kindId', this.curKind.id)
      }).catch(err => alert(err.message))
    },
    // 选择注册类型
    onSelectKind(item) {
      this.$set(this.formData, 'kind', item.name)
      this.$set(this.formData, 'kindId', item.id)
      this.curKind = item
    },
    // 获取行业类别
    getTradeList() {
      return this.$store.dispatch('get-category-reference', { type: 'trade' }).then(data => {
        this.tradeList = data.list
      }).catch(err => alert(err.message))
    },
    // 行业选择改变
    onTradeSelectChange() {
      this.$set(this.formData, 'tradeId', this.curTrade.id)
      this.$set(this.formData, 'tradeName', this.curTrade.name)
      this.getClassByTrade()
    },
    // 通过行业获取类别
    getClassByTrade() {
      if (!this.curTrade) {
        this.tradeClassList = {
          list: [],
          list_core: [],
          list_general: []
        }
        this.formData.tradeClassList = []
        return
      }
      return this.$store.dispatch('getClassByTrade', { id: this.curTrade.id }).then(data => {
        this.tradeClassList = data
        this.formData.tradeClassList = []
        this.selectedCustomClasses = []
      }).catch(err => alert(err.message))
    },
    // 选择类别
    onSelectClass(item) {
      const list = this.formData.tradeClassList
      let selectedIndex = this.inSelectedClass(item)
      let { isSelected } = item
      if (isSelected) {
        list.splice(selectedIndex, 1)
      } else {
        list.push({ className: item.name, classId: item.id })
      }
      this.$set(item, 'isSelected', !isSelected)
    },
    // 是否在选择的类别中
    inSelectedClass(item) {
      const list = this.formData.tradeClassList
      for (let i = 0, len = list.length; i < len; i++) {
        let _ = list[i]
        if (item.id === _.classId && item.name === _.className) {
          return i
        }
      }
      return false
    },
    // 添加自定义类别
    onAddCustomClass() {
      this.customClassSelectDialog = false
      let arr = []
      this.tempSelectedCustomClasses.forEach(_ => arr.push(_))
      this.selectedCustomClasses = arr
    },
    // 选择自定义类别
    onSelectCustomClass(item) {
      let list = this.tempSelectedCustomClasses
      let curItem = list.find(_ => _.classId === item.id && _.className === item.name)
      if (curItem) {
        this.$set(item, 'isSelected', false)
        list.splice(list.indexOf(curItem), 1)
      } else {
        this.$set(item, 'isSelected', true)
        list.push({ classId: item.id, className: item.name, code: item.code })
      }
    },
    // 删除自定义类别item
    deleteCustomClassItem(item) {
      let index = this.selectedCustomClasses.indexOf(item)
      this.selectedCustomClasses.splice(index, 1)
      let searchItem = this.tradeClassList.list.find(_ => {
        return item.classId === _.id && item.className === _.name
      })
      if (searchItem) {
        this.$set(searchItem, 'isSelected', false)
      }
    },
    // 打开自定义类别选择对话框
    onOpenCustomClassSelectDialog() {
      this.customClassSelectDialog = true
      let arr = []
      this.selectedCustomClasses.forEach(_ => arr.push(_))
      this.tempSelectedCustomClasses = arr
      this.tradeClassList.list.forEach(classItem => {
        let searchItem = this.tempSelectedCustomClasses.find(_ => {
          return classItem.id === _.classId && classItem.name === _.className
        })
        this.$set(classItem, 'isSelected', !!searchItem)
      })
    },
    // 提交表单
    onSubmit() {
      let { dispatch } = this.$store
      let { file } = this.image
      let validResult = this.validateFormData()
      if (!validResult.ok) return alert(validResult.msg)
      let yes = confirm('确认保存并付款吗？')
      if (!yes) return
      this.loading = true
      dispatch('upload', { file }).then(_ => {
        this.formData.images = _
        let postData = {}
        for (let key in this.formData) postData[key] = this.formData[key]
        postData.tradeClassList = this.formData.tradeClassList.concat(this.selectedCustomClasses)
        dispatch('registerTrade', postData).then(data => {
          this.loading = false
          let { outTradeNo, id } = data.data
          this.$router.push(`/member/pay-order?id=${id}&product_no=${outTradeNo}`)
        }).catch(this.onError)
      }).catch(this.onError)
    },
    // 错误处理
    onError(err) {
      this.loading = false
      alert(err.message)
    },
    // 验证表单数据
    validateFormData() {
      let { register, name, tradeName, tradeClassList } = this.formData
      if (!register) {
        return { ok: false, msg: '请选择注册人' }
      } else if (!name) {
        return { ok: false, msg: '请输入商品名称' }
      } else if (!tradeName) {
        return { ok: false, msg: '请选择行业' }
      } else if (!tradeClassList.length) {
        return { ok: false, msg: '核心和通用类别需至少选择一个' }
      }
      return { ok: true }
    }
  },
  mounted() {
    this.getApplicantList()
    this.getKinds()
    this.getTradeList()
  }
}
</script>
<style lang="scss" src="~/components/member/edit.scss"></style>