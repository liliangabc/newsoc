<template>
<el-dialog custom-class="com-editor-attach-dialog" title="Attachment" width="480px" :close-on-click-modal="false" :visible.sync="visible">
  <el-upload drag multiple ref="uploader" action="" :auto-upload="false">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">Drag files here, or <em>click upload</em></div>
  </el-upload>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="small" @click="emitUploadFiles">OK</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  data() {
    return { visible: false }
  },
  methods: {
    // 对话框是否可见
    setVisible(visible = false) {
      this.visible = visible
    },
    // 发射要上传的文件列表到父组件
    emitUploadFiles() {
      this.visible = false
      this.$emit('update-files', this.$refs.uploader.uploadFiles)
    },
    // 清除所有文件
    clearFiles() {
      const { uploader } = this.$refs
      if (uploader) this.$refs.uploader.uploadFiles = []
    }
  }
}
</script>
<style lang="scss">
.com-editor-attach-dialog {
  .el-upload {
    display: block;
    .el-upload-dragger {
      width: 100%;
    }
  }
  .el-dialog__footer {
    .el-button {
      min-width: 66px;
    }
  }
}
</style>