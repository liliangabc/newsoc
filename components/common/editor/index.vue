<template>
<div class="com-editor" :class="{isGetFocus}">
  <div class="editor-wrapper" v-if="isRichText">
    <p class="placeholder" v-if="isShowHint">{{hint}}</p>
    <div class="editor" ref="editor" contenteditable :style="richTextStyle" v-html="defaultHtml" @click="onEditorClick" @focus="onEditorFocus" @blur="onEditorBlur" @input="onEditorInput"></div>
  </div>
  <textarea class="textedit" rows="1" v-else :placeholder="hint" :value="inputValue" @input="onTextInput"></textarea>
  <div class="toolbar">
    <div class="btn-group">
      <template v-if="isRichText">
        <button class="icon-btn btn-picture" @click="onBtnPictureClick"></button>
        <button class="icon-btn btn-attach" v-if="hasAttach" @click="onBtnAttachClick">
          <span class="badge" v-if="attachCount"></span>
        </button>
        <button class="icon-btn btn-bold" :class="{active: isBold}" @click="onBtnBoldClick"></button>
        <button class="icon-btn btn-italic" :class="{active: isItalic}" @click="onBtnItalicClick"></button>
        <button class="icon-btn btn-ol" :class="{active: isOList}" @click="onBtnOLClick"></button>
        <button class="icon-btn btn-ul" :class="{active: isUList}" @click="onBtnULClick"></button>
      </template>
      <span class="spring"></span>
      <slot name="submit"></slot>
    </div>
    <div class="overlay"></div>
  </div>
  <input type="file" ref="picFile" @change="onPicFileChange" accept="image/gif,image/jpeg,image/jpg,image/png">
  <com-attach-dialog ref="attach-dialog" @update-files="onUpdateFiles"></com-attach-dialog>
</div>
</template>
<script>
import { isParent } from './utils'
import ComAttachDialog from './attach'
export default {
  components: { ComAttachDialog },
  data() {
    return {
      inputValue: this.value,
      isBold: false,
      isItalic: false,
      isQuote: false,
      isUList: false,
      isOList: false,
      isShowHint: true,
      isGetFocus: false,
      pics: {},
      attachments: {}
    }
  },
  props: {
    // 是否是富文本
    isRichText: {
      type: Boolean,
      default: false
    },
    // 输入提示
    hint: {
      type: String,
      default: 'Content...'
    },
    height: {},
    // 默认html 用于帖子的编辑
    defaultHtml: String,
    value: {},
    hasAttach: Boolean
  },
  watch: {
    defaultHtml(val) { this.isShowHint = !val },
    value(newVal) { this.inputValue = newVal }
  },
  computed: {
    richTextStyle() {
      return this.isRichText && this.height ? { minHeight: parseInt(this.height) + 'px' } : {}
    },
    attachCount() {
      return Object.keys(this.attachments).length
    }
  },
  methods: {
    // 初始化编辑器
    init() {
      this.pics = {}
      this.attachments = {}
      this.isBold = this.isItalic = this.isQuote = this.isUList = this.isOList = this.isGetFocus = false
      this.$refs.editor.innerHTML = ''
      this.$refs['attach-dialog'].clearFiles()
    },
    // 文本域输入
    onTextInput(event) {
      this.$emit('input', event.target.value)
      this.updateTextHeight(event)
    },
    // 更新文本域高度
    updateTextHeight(event) {
      let textarea = event.target
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 2 + 'px'
    },
    // 编辑器单击
    onEditorClick(event) {
      let el = event.target
      const tags = [el.tagName.toLowerCase()], { editor } = this.$refs
      while (el != editor && el.parentElement) {
        let tagName = el.parentElement.tagName.toLowerCase()
        tags.indexOf(tagName) == -1 && tags.push(tagName)
        el = el.parentElement
      }
      this.isBold = tags.indexOf('b') != -1
      this.isItalic = tags.indexOf('i') != -1
      this.isUList = tags.indexOf('ul') != -1
      this.isOList = tags.indexOf('ol') != -1
    },
    // 编辑器得到焦点
    onEditorFocus() {
      this.isShowHint = false
    },
    // 编辑器失去焦点
    onEditorBlur() {
      let editorEl = this.$refs.editor
      let html = editorEl.innerHTML.trim()
      this.isShowHint = !html
    },
    // 编辑器输入
    onEditorInput(event) {
      
    },
    // 图片按钮单击
    onBtnPictureClick() {
      this.$refs.picFile.click()
    },
    // 图片文件对象改变
    onPicFileChange(event) {
      const { editor } = this.$refs
      let file = event.target.files[0]
      if (!file || file.type.indexOf('image')) return
      let src = window.URL.createObjectURL(file)
      document.execCommand('insertHTML', false, `<img src="${src}"><div><br></div>`)
      setTimeout(() => editor.scrollTop = editor.scrollHeight, 30)
      this.pics[src] = file
      editor.focus()
    },
    // 切换粗体按钮单击
    onBtnBoldClick() {
      this.isBold = !this.isBold
      document.execCommand('bold', false, null)
      this.$refs.editor.focus()
    },
    // 切换斜体按钮单击
    onBtnItalicClick() {
      this.isItalic = !this.isItalic
      document.execCommand('italic', false, null)
      this.$refs.editor.focus()
    },
    // 切换有序列表按钮单击
    onBtnOLClick() {
      this.isUList = false
      this.isOList = !this.isOList
      document.execCommand('insertOrderedList', false, null)
      this.$refs.editor.focus()
    },
    // 切换无序列表按钮单击
    onBtnULClick() {
      this.isOList = false
      this.isUList = !this.isUList
      document.execCommand('insertUnorderedList', false, null)
      this.$refs.editor.focus()
    },
    // body元素单击
    onBodyClick(event) {
      let el = event.target
      if (el.classList.contains('overlay')) return
      this.isGetFocus = isParent(this.$el, el)
    },
    // 获取编辑器中的图片
    getEditorImages() {
      const images = this.$refs.editor.querySelectorAll('img'), obj = {}
      for (let i = 0, len = images.length; i < len; i++) {
        let { src } = images[i]
        if (src in this.pics) obj[src] = this.pics[src]
      }
      return obj
    },
    // 替换编辑器中图片的url为远程url
    replaceEditorImagesUrl(urls) {
      const imgs = this.$refs.editor.querySelectorAll('img')
      urls.forEach((url, index) => {
        let img = imgs[index], { naturalWidth, naturalHeight } = img
        img.src = url
        img.width = naturalWidth
        img.height = naturalHeight
      })
      return urls.join(',')
    },
    // 上传图片
    uploadImages() {
      const { commit, dispatch } = this.$store
      const imageUrls = [], promises = [], images = this.getEditorImages()
      Object.values(images).forEach(val => 
        promises.push(dispatch('upload', { file: val }))
      )
      return Promise.all(promises).then(this.replaceEditorImagesUrl)
    },
    // 上传附件
    uploadAttachments() {
      const { commit, dispatch } = this.$store
      const fileUrls = [], promises = []
      Object.values(this.attachments).forEach(file => 
        promises.push(dispatch('upload', { file }))
      )
      return Promise.all(promises).then(_ => _.join(','))
    },
    // 上传
    upload() {
      return Promise.all([this.uploadImages(), this.uploadAttachments()])
    },
    // 编辑器是否为空
    isEmpty() {
      let { editor } = this.$refs
      let imgCount = editor.querySelectorAll('img').length
      let text = editor.innerText.trim()
      return !(imgCount || text)
    },
    // 获取编辑器HTML
    getHTML() {
      return this.$refs.editor.innerHTML
    },
    // 设置编辑器默认HTML内容
    setInitContent(html, picUrls) {
      picUrls.split(',').forEach(url => {
        let convertUrl = url
        if (convertUrl.endsWith('?imageslim')) {
          convertUrl = convertUrl.replace('?imageslim', '')
        }
        this.pics[convertUrl] = convertUrl
      })
      this.$refs.editor.innerHTML = html
      this.isShowHint = !html
    },
    // 附件按钮单击 | 打开上传附件对话框
    onBtnAttachClick() {
      this.$refs['attach-dialog'].setVisible(true)
    },
    // 更新附件列表
    onUpdateFiles(files) {
      this.attachments = {}
      files.forEach(_ => this.$set(this.attachments, _.name, _.raw || url))
    },
    // 设置编辑器焦点
    setFocus() {
      this.isGetFocus = true
      this.$refs.editor.focus()
    }
  },
  mounted() {
    this.isShowHint = !this.defaultHtml
    document.body.addEventListener('click', this.onBodyClick)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.onBodyClick)
  }
}
</script>
<style lang="scss" src="./style.scss"></style>