<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="categories">
        <router-link :to="{name: 'categories'}">
          <a-icon type="appstore" />Danh mục
        </router-link>
      </a-menu-item>
      <a-menu-item key="sizes">
        <router-link :to="{name: 'sizes'}">
          <a-icon type="column-height" />Kích cỡ
        </router-link>
      </a-menu-item>
      <a-menu-item key="colors">
        <router-link :to="{name: 'colors'}">
          <a-icon type="bg-colors" />Màu
        </router-link>
      </a-menu-item>
    </a-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "LayoutAttributes",
  data() {
    return {
      current: [this.$router.currentRoute.name],
    };
  },
}
</script>

<style scoped>

</style>