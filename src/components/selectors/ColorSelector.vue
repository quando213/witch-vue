<template>
  <a-select :value="value"
            @change="onChangeValue"
            :allow-clear="true"
            style="width: 100%;"
            placeholder="Chọn màu"
  >
    <a-select-option :key="option.id" v-for="option in options" :value="option.id">
      <span class="color-circle" :style="{backgroundColor: option.code, marginRight: '5px',}"></span>{{ option.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import {list} from "@/modules/products/Attributes/Color/service";

export default {
  name: "ColorSelector",
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

<style>
.color-circle {
  width: 15px;
  height: 15px;
  display: inline-block;
  border-radius: 50%;
}
</style>