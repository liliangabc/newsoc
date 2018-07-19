<template>
<div class="com-card-moment-pubbar">
  <textarea placeholder="What is on your mind?" v-model.trim="content"></textarea>
  <ul class="clearfix pic-list" v-if="pics.length">
    <li v-for="(pic, index) in pics" :key="pic.blob" :style="{backgroundImage: `url(${pic.blob})`}">
      <a class="btn-delete" @click="onDeleteItem(index)">&times;</a>
    </li>
  </ul>
  <div class="toolbar">
    <a class="icon-btn btn-comera" @click="onComeraClick"></a>
    <span class="spring"></span>
    <button class="btn-submit" :disabled="disabled" @click="onSubmit">Post</button>
  </div>
  <input type="file" ref="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple @change="onFileChange">
</div>
</template>
<script>
export default {
  data() {
    return { content: '', pics: [] }
  },
  computed: {
    disabled() {
      return !this.content
    }
  },
  methods: {
    onComeraClick() {
      this.$refs.file.click()
    },
    onFileChange(event) {
      let { files } = event.target
      for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i]
        if (file.type.indexOf('image')) {
          this.$notify({
            type: 'warning',
            title: 'warning',
            dangerouslyUseHTMLString: true,
            message: `File <b style="color:#000;">${file.name}</b> is not image and have been filtered`
          })
        } else {
          if (!this.pics.find(pic => pic.file.name == file.name)) {
            this.pics.push({ blob: window.URL.createObjectURL(file), file })
          }
        }
      }
    },
    onDeleteItem(index) {
      this.pics.splice(index, 1)
    },
    onSubmit() {
      const { dispatch } = this.$store
      const arr = this.pics.map(item => dispatch('upload', { file: item.file }))
      let loading = this.$loading()
      Promise.all(arr).then(values => dispatch('post', {
          api: 'publish_student_moments',
          data: { content: this.content, picUrls: values.join(',') }
        }).then(data => {
          loading.close()
          this.$message({ type: 'success', message: data.info })
          this.pics = []
          this.content = ''
          dispatch('home/getList', { route: this.$route })
        }).catch(err => {
          loading.close()
          this.$message.error(err.message)
        })
      ).catch(err => {
        loading.close()
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-moment-pubbar {
  border: 1px solid $boxBorderColor;
  margin-bottom: 36px;
  textarea {
    display: block;
    width: 100%;
    height: 95px;
    resize: none;
    font-size: 17px;
    padding: 16px 20px;
    color: #909090;
    &::placeholder {
      color: $themeBorderGreyColor;
    }
  }
  input[type=file] {
    display: none;
  }
  .toolbar {
    height: 44px;
    background-color: #eee;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .icon-btn {
      width: 40px;
      height: 40px;
      background: no-repeat center center/16px;
      &.btn-comera {
        background-image: url(~/assets/img/posts/Camera-icon.png);
      }
    }
    .spring {
      flex: 1;
    }
    .btn-submit {
      width: 72px;
      height: 25px;
      background-color: $themeBlueColor;
      color: #fff;
      font-size: 12px;
      border-radius: 2px;
      &[disabled] {
        opacity: .38;
        cursor: not-allowed;
      }
    }
  }
  .pic-list {
    background-color: #f6f6f6;
    padding: 10px 20px 0;
    li {
      width: 90px;
      height: 90px;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
      background: no-repeat center center;
      background-size: cover;
      .btn-delete {
        width: 20px;
        height: 20px;
        text-align: center;
        font-size: 18px;
        line-height: 1;
        color: #fff;
        background-color: #ffa73f;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>