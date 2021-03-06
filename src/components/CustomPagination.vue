<template>
  <a-pagination :current="meta.current_page"
                :page-size.sync="meta.limit"
                :total="meta.total"
                :show-total="total => `Tổng cộng ${total} bản ghi`"
                show-size-changer
                show-quick-jumper
                @change="onChangePage"
                @showSizeChange="onChangePage"/>
</template>

<script>
export default {
  name: "CustomPagination",
  model: {
    prop: 'meta',
    event: 'input',
  },
  props: {
    meta: Object,
  },
  methods: {
    onChangePage(page, limit) {
      this.$emit('change', {
        page,
        limit,
      });
    }
  }
}
</script>

<style scoped>
.ant-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>