<template>
<el-dialog custom-class="com-gmap-dialog" width="600px" :visible.sync="isVisible" @open="handleOpen">
  <div class="map-container" ref="map-container"></div>
</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isVisible: false,
      apiUrl: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA2YrPzRPhXw9lxS8rUS47FUXTJm9HVKHI',
      address: ''
    }
  },
  methods: {
    // 打开对话框 通过父组件调用
    onOpen(address) {
      this.isVisible = true
      this.address = address
    },
    // 加载谷歌地图API
    loadAPI() {
      return new Promise((resolve, reject) => {
        if (typeof google != 'undefined' && google.maps) return resolve()
        const script = document.createElement('script')
        script.onload = resolve
        script.onerror = reject
        script.src = this.apiUrl
        script.async = script.defer = true
        document.body.appendChild(script)
      })
    },
    // 创建地图
    createMap() {
      let initAddr = { lat: 40.71206, lng: -73.9977798 }
      return new google.maps.Map(this.$refs['map-container'], {
        zoom: 13,
        center: initAddr,
        scrollwheel: false,
        // scaleControl:false,
        // draggable: false,
        navigationControl: false
      })
    },
    // 获取目标位置
    getCurLocation() {
      let geocoder = new google.maps.Geocoder()
      let map = this.createMap()
      geocoder.geocode({
        address: this.address
      }, (results, status) => {
        if (status == 'OK') {
          let result = results[0]
          let position = result.geometry.location
          map.setCenter(position)
          let marker = new google.maps.Marker({ map, position })
          let infowindow = new google.maps.InfoWindow({
            content: result.formatted_address + ' ' + this.address
          })
          marker.addListener('click', function () {
            infowindow.open(map, marker)
          })
          infowindow.open(map, marker)
        } else {
          this.$alert(`Geocode was not successful for the following reason: ${status}`, 'Error')
        }
      })
    },
    // 对话框打开事件处理
    handleOpen() {
      this.loadAPI().then(() => {
        this.getCurLocation()
      }).catch(err => this.$alert('Network Error.', 'Error'))
    }
  }
}
</script>
<style lang="scss">
.com-gmap-dialog.el-dialog {
  .map-container {
    height: 400px;
  }
}
</style>