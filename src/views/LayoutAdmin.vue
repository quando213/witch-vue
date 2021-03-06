<template>
  <div>
    <a-layout>
      <Sidebar/>
      <a-layout>
        <Header/>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <Footer />
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default {
  name: "LayoutAdmin",
  components: {
    Header,
    Footer,
    Sidebar
  }
}
</script>

<style scoped>

</style>