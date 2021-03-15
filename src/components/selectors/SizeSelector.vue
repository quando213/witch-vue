<template>
  <a-select :value="value"
            @change="onChangeValue"
            :allow-clear="true"
            style="width: 100%;"
            placeholder="Chọn kích cỡ"
  >
    <a-select-option :key="option.id" v-for="option in options" :value="option.id">
      {{ option.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import {list, findByCategory} from "@/modules/products/Attributes/Size/service";

export default {
  name: "SizeSelector",
  props: {
    value: Number,
    categoryId: Number,
  },
  data() {
    return {
      options: [],
    }
  },
  methods: {
    onChangeValue(val) {
      this.$emit('input', val);
    }
  },
  async created() {
    if (this.categoryId) {
      const {data} = await findByCategory(this.categoryId);
      this.options = data.data;
    } else {
      const {data} = await list();
      this.options = data.data;
    }
  },
  watch: {
    categoryId: {
      async handler(val) {
        if (val) {
          const {data} = await findByCategory(this.categoryId);
          this.options = data.data;
        }
      }
    }
  }
}
</script>