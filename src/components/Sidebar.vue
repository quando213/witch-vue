<template>
  <a-layout-sider
      breakpoint="md"
      collapsed-width="0"
      width="300"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div style="margin: 16px;">
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1">
            View info
          </a-menu-item>
          <a-menu-item key="2" @click="logout">
            Đăng xuất
          </a-menu-item>
        </a-menu>
        <a-button v-show="email.length" icon="user" ghost>
          <span>{{ email }}</span>
        </a-button>
      </a-dropdown>
    </div>
    <a-menu
        theme="dark"
        mode="inline"
        :default-open-keys="this.menu.map(a => a.name)"
    >
      <template v-for="subMenu in this.menu">
        <a-menu-item :key="subMenu.name" v-if="subMenu.meta.singleItem">
          <a-icon :type="subMenu.meta.icon" />
          <span>{{ subMenu.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu :key="subMenu.name" v-else>
          <span slot="title"><a-icon :type="subMenu.meta.icon" /><span>{{ subMenu.meta.title }}</span></span>
          <a-menu-item :key="menuItem.name" v-for="menuItem in subMenu.children">
            <router-link :to="{name: menuItem.name}">
              {{ menuItem.meta.title }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>

import {logout} from "@/modules/auth/service";

export default {
  name: 'Sidebar',
  props: {
    email: String,
  },
  data() {
    return {
      menu: [],
    }
  },
  methods: {
    async logout() {
      const {data} = await logout();
      if (data.status === 1) {
        localStorage.removeItem('token');
        this.$router.push({name: 'Login'});
      } else {
        this.$message.error(data.message);
      }
    },
  },
  created() {
    this.$router.options.routes.forEach(subMenu => {
      if (subMenu.meta && !subMenu.meta.hidden) {
        if (subMenu.children && subMenu.children.length) {
          subMenu.children = subMenu.children.filter(item => !item.meta.hidden);
        }
        this.menu.push(subMenu);
      }
    })
  }
}
</script>

<style scoped lang="less">

</style>
