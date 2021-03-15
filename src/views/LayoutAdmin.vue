<template>
  <div>
    <a-layout>
      <Sidebar :email="this.email"/>
      <a-layout id="main">
        <Header/>
<!--        <a-page-header-->
<!--            title="Title"-->
<!--            @back="() => $router.go(-1)"-->
<!--        />-->
        <a-layout-content>
          <router-view :key="$route.fullPath"></router-view>
        </a-layout-content>
        <Footer/>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import {getProfile} from "@/modules/auth/service";

export default {
  name: "LayoutAdmin",
  components: {
    Header,
    Footer,
    Sidebar
  },
  data() {
    return {
      email: ''
    }
  },
  async created() {
    try {
      const {data} = await getProfile();
      this.email = data.data.email;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>
main {
  padding: 24px;
  background: #fff;
  min-height: 360px;
}

.ant-layout-content {
  margin: 24px 16px 0;
}

@media screen and (min-width: 768px) {
  #main {
    margin-left: 300px;
  }
}
</style>