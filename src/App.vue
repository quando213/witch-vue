<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
main {
  padding: 24px;
  background: #fff;
  min-height: 360px;
}

.ant-layout-content {
  margin: 24px 16px 0;
}
</style>
