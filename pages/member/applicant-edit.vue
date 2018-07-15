<template>
<div class="com-member-edit page-member-applicant-edit">
  <com-top-tabs></com-top-tabs>
  <div class="form-container">
    <com-form-item label="基本信息:">
      <div class="inline-form">
        <div class="clearfix inline-form-item">
          <span class="label"><b class="required-tag">*</b>申请类型:</span>
          <div class="content">
            <select v-model="formData.kind">
              <option value="自然人">自然人</option>
              <option value="个体工商户">个体工商户</option>
              <option value="公司或其它组织">公司或其它组织</option>
            </select>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">书式类型:</span>
          <div class="content">
            <p class="text">中国大陆</p>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label"><b class="required-tag">*</b>申请人姓名:</span>
          <div class="content">
            <input type="text" v-model.trim="formData.name">
            <span class="inline-hint">个体工商户营业执照中的名称</span>
            <!-- 请输入申请人名称，应与能够证明其身份的有效证件保持一致 -->
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">身份证件文件名称:</span>
          <div class="content">
            <input type="text" v-model.trim="formData.idName">
            <span class="inline-hint">请输入身份证明文件名称</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">身份证明文件证号:</span>
          <div class="content">
            <input type="number" v-model.trim="formData.idNo">
            <span class="inline-hint">应能够证明申请人身份的有效证件的登记号</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">行政区别:</span>
          <div class="content">
            <select class="area" v-model="curArea.sheng" @change="getCities(curArea.sheng)">
              <option value="">请选择省份</option>
              <option v-for="item in areas.shengs" :key="item.code" :value="item.name">{{item.name}}</option>
            </select>
            <select class="area" v-model="curArea.city" @change="getXians(curArea.city)">
              <option value="">请选择城市</option>
              <option v-for="item in areas.cities" :key="item.code" :value="item.name">{{item.name}}</option>
            </select>
            <select class="area" v-model="curArea.xian" @change="setArea">
              <option value="">请选择区</option>
              <option v-for="item in areas.xians" :key="item.code" :value="item.name">{{item.name}}</option>
            </select>
            <span class="inline-hint">请输入行政区划,省,市,区/县三级</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">申请人地址:</span>
          <div class="content">
            <input type="text" v-model.trim="formData.address">
            <span class="inline-hint">请认真填写申请人详细地址，如：玉沙路1000号（无须填写省、市、区/县）</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">联系人:</span>
          <div class="content">
            <input type="text" v-model.trim="formData.contactor">
            <span class="inline-hint">请输入申请人信息（联系人）</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label"><b class="required-tag">*</b>联系电话:</span>
          <div class="content">
            <input type="number" v-model.trim="formData.mobile">
            <span class="inline-hint">请输入你的联系电话</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">邮政编码:</span>
          <div class="content">
            <input type="number" v-model.trim="formData.postCode">
            <span class="inline-hint">请输入申请人邮政编码</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">收件人:</span>
          <div class="content">
            <input type="text" v-model.trim="formData.receivePeaple">
            <span class="inline-hint">请输入收件人名称</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">收件人地址:</span>
          <div class="content">
            <input type="text" v-model.trim="formData.receiveAddress">
            <span class="inline-hint">请输入收件地址</span>
          </div>
        </div>
        <div class="clearfix inline-form-item">
          <span class="label">收件联系电话:</span>
          <div class="content">
            <input type="number" v-model.trim="formData.receiveMobile">
            <span class="inline-hint">请输入收件人电话</span>
          </div>
        </div>
      </div>
    </com-form-item>
    <com-form-item label="身份证明文件（中文）:" box-class="cert">
      <div class="float-item">
        <div class="image">
          <img v-if="idFile.blob" :src="idFile.blob">
        </div>
        <input type="file" ref="idFile" accept="image/gif,image/jpeg,image/jpg,image/png" @change="onIdFileChange">
        <button class="btn-upload" @click="onSelectFile('idFile')">上传证明文件</button>
        <p class="hint">*为了保证图片的保存，请将图片大小限制在2M(2048KB)内</p>
      </div>
      <div class="float-item demo">
        <img class="image" src="~/assets/img/sfz.jpg">
        <p class="hint">证明文件为身份证，本图片为上传图片范例；上传图片不能直接使用扫描件，须复印后身份证持证人手写签字后方可使用；请确保上传图片字迹清晰，无残缺、无破损。</p>
      </div>
    </com-form-item>
    <com-form-item label="主体资格证明文件:" box-class="cert">
      <div class="float-item">
        <div class="image">
          <img v-if="zhutiFile.blob" :src="zhutiFile.blob">
        </div>
        <input type="file" ref="zhutiFile" accept="image/gif,image/jpeg,image/jpg,image/png" @change="onZhutiFileChange">
        <button class="btn-upload" @click="onSelectFile('zhutiFile')">上传证明文件</button>
        <p class="hint">*为了保证图片的保存，请将图片大小限制在2M(2048KB)内</p>
      </div>
      <div class="float-item demo">
        <img class="image" src="~/assets/img/gtzz.jpg">
        <p class="hint">证明文件为个体工商户营业执照，本图片为上传图片范例；上传图片不能直接使用扫描件，须复印后个体经营者手写签字后方可使用；请确保上传图片字迹清晰，无残缺、无破损,且图片小于2M</p>
      </div>
    </com-form-item>
    <div class="submit-wrapper">
      <button class="btn-submit" @click="onSubmit">保存</button>
    </div>
  </div>
  <com-loading fullscreen v-if="loading"></com-loading>
</div>
</template>
<script>
import ComTopTabs from '~/components/member/top-tabs'
import ComFormItem from '~/components/member/form-item'
import { validPicFile, isPhone } from '~/plugins'
import { remoteAPIURL } from '~/server/config'
export default {
  components: { ComTopTabs, ComFormItem },
  data() {
    return {
      formData: {},
      idFile: {},
      zhutiFile: {},
      loading: false,
      areas: {
        shengs: [],
        cities: [],
        xians: []
      },
      curArea: {
        sheng: '',
        city: '',
        xian: ''
      }
    }
  },
  methods: {
    getInfo() {
      let { id } = this.$route.query
      return id ? this.$store.dispatch('get-applicant-info', id).then(data => {
        this.formData = data.concator
        let { idFiles, zhutiFiles } = data.concator
        this.idFile = idFiles ? { file: idFiles, blob: remoteAPIURL + '/imgs' + idFiles } : {}
        this.zhutiFile = zhutiFiles ? { file: zhutiFiles, blob: remoteAPIURL + '/imgs' + zhutiFiles } : {}
        let { xingzheng } = data.concator
        if (xingzheng) {
          let [sheng, city, xian] = xingzheng.split(' ')
          this.curArea = { sheng, city, xian }
        }
      }).catch(err => alert(err.message)) : Promise.resolve()
    },
    // 选择文件
    onSelectFile(ref) {
      this.$refs[ref].click()
    },
    // 身份证明文件改变
    onIdFileChange(event) {
      let file = event.target.files[0]
      if (!file) return
      let validResult = validPicFile({ file, maxSize: 2048 })
      if (!validResult.ok) return alert(validResult.msg)
      this.idFile = { file, blob: window.URL.createObjectURL(file)}
    },
    // 主体资格证明文件改变
    onZhutiFileChange(event) {
      let file = event.target.files[0]
      if (!file) return
      let validResult = validPicFile({ file, maxSize: 2048 })
      if (!validResult.ok) return alert(validResult.msg)
      this.zhutiFile = { file, blob: window.URL.createObjectURL(file)}
    },
    // 图片上传
    upload() {
      let { dispatch } = this.$store
      return Promise.all([
        dispatch('upload', { file: this.idFile.file }),
        dispatch('upload', { file: this.zhutiFile.file })
      ])
    },
    // 提交表单
    onSubmit() {
      let validResult = this.validateFormData()
      if (!validResult.ok) return alert(validResult.msg)
      this.loading = true
      this.upload().then(([idFiles, zhutiFiles]) => {
        this.formData.idFiles = idFiles
        this.formData.zhutiFiles = zhutiFiles
        this.$store.dispatch('save-applicant', this.formData).then(data => {
          this.loading = false
          this.$router.back()
        }).catch(err => {
          this.loading = false
          alert(err.message)
        })
      }).catch(err => {
        this.loading = false
        alert(err.message)
      })
    },
    // 验证表单数据
    validateFormData() {
      let { kind, name, mobile } = this.formData
      if (!kind) {
        return { ok: false, msg: '请选择申请类型' }
      } else if (!name) {
        return { ok: false, msg: '请输入申请人姓名' }
      } else if (!mobile) {
        return { ok: false, msg: '请输入你的联系电话' }
      }
      return { ok: true }
    },
    // 获取省
    getShengs() {
      return this.$store.dispatch('getAreas', {}).then(data => {
        this.areas.shengs = data.list
      })
    },
    // 获取市
    getCities(name) {
      this.areas.cities = []
      this.areas.xians = []
      this.curArea.city = this.curArea.xian = ''
      this.setArea()
      let item = this.areas.shengs.filter(_ => _.name == name)[0]
      return this.$store.dispatch('getAreas', { level: 2, sheng: item.sheng }).then(data => {
        this.areas.cities = data.list
      })
    },
    // 获取区
    getXians(name) {
      this.areas.xians = []
      this.curArea.xian = ''
      this.setArea()
      let item = this.areas.cities.filter(_ => _.name == name)[0]
      return this.$store.dispatch('getAreas', { level: 3, sheng: item.sheng, di: item.di }).then(data => {
        this.areas.xians = data.list
      })
    },
    // 设置行政区
    setArea() {
      let { sheng, city, xian } = this.curArea
      this.formData.xingzheng = [sheng, city, xian].filter(_ => _).join(' ')
    },
    // 获取初始省市区
    getAreas() {
      const { dispatch } = this.$store
      let { sheng, city, xian } = this.curArea
      if (sheng) {
        // 获取城市
        let itemSheng = this.areas.shengs.filter(_ => _.name == sheng)[0]
        dispatch('getAreas', { level: 2, sheng: itemSheng.sheng }).then(dataCities => {
          this.areas.cities = dataCities.list
        }).then(() => {
          if (city) {
            // 获取区县
            let itemCity = this.areas.cities.filter(_ => _.name == city)[0]
            dispatch('getAreas', { level: 3, sheng: itemCity.sheng, di: itemCity.di }).then(dataXians => {
              this.areas.xians = dataXians.list
            })
          }
        })
      }
    }
  },
  mounted() {
    this.getInfo().then(() => this.getShengs().then(() => this.getAreas()))
  }
}
</script>
<style lang="scss" src="~/components/member/edit.scss"></style>