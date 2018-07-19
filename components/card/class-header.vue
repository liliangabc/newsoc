<template>
<div class="com-card-class-header">
  <h3 class="class-name">{{item.className}}</h3>
  <p class="class-code">{{item.classCode}}</p>
  <h4 class="course-name">{{item.courseCollegeName}}</h4>
</div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-class-header {
  text-align: center;
  padding: 20px 12px;
  color: rgba(255, 255, 255, .8);
  background-color: $themeBlueColor;
  background: linear-gradient(135deg, #83aee5, $themeBlueColor);
  border-radius: 4px;
  border: 1px solid $boxBorderColor;
  border-bottom: none;
  .class-name {
    font-size: 20px;
    font-weight: bold;
  }
  .class-code, .course-name {
    font-size: 13px;
  }
  .class-code {
    margin: 6px 0;
  }
}
</style>