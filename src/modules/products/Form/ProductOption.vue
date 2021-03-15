<template>
  <div>
    <ValidationObserver ref="formOption">
      <a-collapse v-model="activeKeys" :bordered="false">
        <template v-for="(op, i) in options">
          <a-collapse-panel :key="`${i}`"
                            :header="`Tuỳ chọn ${i + 1}`"
                            style="background: white;"
          >

            <a-row :gutter="8">
              <a-col :xs="24" :md="8">
                <a-form-item label="Chọn kích cỡ">
                  <ValidationProvider :vid="'size' + i" name="Kích cỡ" rules="required" v-slot="{ errors }">
                    <SizeSelector v-model="op.size_id" :category-id="categoryId" />
                    <span v-if="errors.length">{{ errors[0] }}</span>
                  </ValidationProvider>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="8">
                <a-form-item label="Chọn màu sắc">
                  <ValidationProvider :vid="'color' + i" name="Màu" rules="required" v-slot="{ errors }">
                    <ColorSelector v-model="op.color_id" />
                    <span v-if="errors.length">{{ errors[0] }}</span>
                  </ValidationProvider>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="8">
                <a-form-item label="Số lượng">
                  <ValidationProvider :vid="'quantity' + i" name="Số lượng" rules="required" v-slot="{ errors }">
                    <a-input-number
                        placeholder="Nhập số lượng sản phẩm"
                        style="width: 100%;"
                        v-model="op.quantity"
                    />
                    <span v-if="errors.length">{{ errors[0] }}</span>
                  </ValidationProvider>
                </a-form-item>
              </a-col>
            </a-row>
            <a-icon
                slot="extra"
                type="minus-circle-o"
                v-if="options.length > 1"
                class="dynamic-delete-button"
                @click="() => remove(i)"
            />
          </a-collapse-panel>
        </template>
      </a-collapse>
    </ValidationObserver>
    <a-form-item>
      <a-button style="margin: 20px 0 40px;" @click="add">
        <a-icon type="plus"/>
        Thêm tuỳ chọn
      </a-button>
    </a-form-item>
  </div>
</template>

<script>
import SizeSelector from "@/components/selectors/SizeSelector";
import ColorSelector from "@/components/selectors/ColorSelector";
const optionForm = {
  size_id: undefined,
  color_id: undefined,
  quantity: undefined,
}
export default {
  name: 'ProductOption',
  components: {ColorSelector, SizeSelector},
  props: {
    sizes: Array,
    colors: Array,
    categoryId: Number,
  },
  data() {
    return {
      options: [
          { ...optionForm },
      ],
      activeKeys: ['0']
    };
  },
  methods: {
    remove(i) {
      this.options.splice(i, 1);
    },
    add() {
      this.options.push({ ...optionForm });
      this.activeKeys.push(`${this.options.length - 1}`);
    },
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 16px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>