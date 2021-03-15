<template>
  <a-select :value="value"
            @change="onChangeValue"
            :allow-clear="true"
            style="width: 100%;"
            placeholder="Chọn danh mục"
  >
    <a-select-option :key="option.id" v-for="option in options" :value="option.id">
      {{ option.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import {list} from "@/modules/products/Attributes/Category/service";

export default {
  name: "CategorySelector",
  props: {
    value: Number,
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
    const {data} = await list();
    this.options = data.data;
  }
}
</script>