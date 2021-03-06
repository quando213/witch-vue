<template>
  <a-layout-header>
    <router-link to="/" id="logo">
      <img src="../assets/logo-witch.png" alt="Logo Witch">
      <span>Witch Admin</span>
    </router-link>
  </a-layout-header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="less">
.ant-layout-header {
  background: white;
  padding: 0;
}

#logo img {
  max-height: 32px;
  margin: 0 16px;
}

#logo span {
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
