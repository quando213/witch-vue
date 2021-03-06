<template>
  <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
  >
    <div style="margin: 16px;">
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1">
            View info
          </a-menu-item>
          <a-menu-item key="2">
            Đăng xuất
          </a-menu-item>
        </a-menu>
        <a-button icon="user" ghost>
          <span>manager@witch.vn</span>
        </a-button>
      </a-dropdown>
    </div>
    <a-menu
        theme="dark"
        mode="inline"
        :default-open-keys="['products', 'users', 'orders']"
    >
      <a-menu-item key="dashboard">
        <a-icon type="dashboard" />
        <span>Dashboard</span>
      </a-menu-item>
      <a-sub-menu key="products">
        <span slot="title"><a-icon type="skin" /><span>Sản phẩm</span></span>
        <a-menu-item key="products-list">
          Danh sách sản phẩm
        </a-menu-item>
        <a-menu-item key="products-create">
          Thêm sản phẩm
        </a-menu-item>
        <a-menu-item key="products-attributes">
          Quản lý thuộc tính
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="users">
        <span slot="title"><a-icon type="appstore" /><span>Quản lý user</span></span>
        <a-menu-item key="users-list">
          <router-link :to="{name: 'userList'}">
            Danh sách user
          </router-link>
        </a-menu-item>
        <a-menu-item key="users-create">
          <router-link :to="{name: 'userForm'}"></router-link>
          Thêm user
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="orders">
        <span slot="title"><a-icon type="appstore" /><span>Quản lý đơn hàng</span></span>
        <a-menu-item key="orders-waiting">
          Đang chờ
        </a-menu-item>
        <a-menu-item key="orders-processing">
          Đang xử lí
        </a-menu-item>
        <a-menu-item key="orders-shipping">
          Đang vận chuyển
        </a-menu-item>
        <a-menu-item key="orders-done">
          Hoàn thành
        </a-menu-item>
        <a-menu-item key="orders-rejected">
          Đã huỷ
        </a-menu-item>
        <a-menu-item key="orders-list">
          Đơn hàng
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style scoped lang="less">

</style>
