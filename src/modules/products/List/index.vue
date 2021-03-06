<template>
  <div>List</div>
</template>

<script>
import {listProduct} from "@/modules/products/service";

export default {
  name: "ProductList",
  created() {
    this.list();
  },
  methods: {
    async list() {
      try {
        const { data } = await listProduct({});
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>