<template>
  <div class="dashboard-container">
    <div class="dashboard-box">
      <div class="dashboard-text">用户名: <span ref="wheel">{{ name }}</span></div>

      <el-calendar v-model="dataValue"/>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      infoMsg: '',
      dataValue: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  mounted() {
    console.log('进入首页')
    this.$refs.wheel.style = `color: #67c23a`
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background-image: url("../../assets/img/bg_0.jpg");
    background-repeat: repeat-x;
  }
  &-box{
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
