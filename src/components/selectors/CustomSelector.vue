<template>
  <a-select :value="value"
            @change="onChangeValue"
            :allow-clear="true"
            style="width: 100%;"
            :placeholder="placeholder"
  >
    <a-select-option :key="option.id" v-for="option in options" :value="option.id">
      {{ option.name }}
    </a-select-option>
  </a-select>
</template>

<script>

export default {
  name: "CustomSelector",
  props: {
    value: Number,
    options: Array,
    placeholder: String,
    validation: Array,
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