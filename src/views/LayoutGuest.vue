<template>
  <div>
    <a-layout>
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

export default {
  name: "LayoutGuest",
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>