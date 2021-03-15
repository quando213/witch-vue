<template>
  <a-select :value="value"
            @change="onChangeValue"
            :allow-clear="true"
            style="width: 100%;"
            :placeholder="placeholder">
    <a-select-option :key="option.value" v-for="option in enumToOptions(enumObj)" :value="option.value">
      {{ $t(`${enumObj.constructor.name}.${option.label}`) }}
    </a-select-option>
  </a-select>
</template>

<script>

import {CommonMixin} from "@/services/mixins";

export default {
  name: "EnumSelector",
  mixins: [CommonMixin],
  props: {
    value: Number,
    enumObj: Object,
    placeholder: String,
  },
  methods: {
    onChangeValue(val) {
      this.$emit('input', val);
    }
  },
}
</script>

<style scoped>

</style>