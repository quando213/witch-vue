<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="22" :md="20" :lg="16" :xl="14">
      <a-skeleton active v-if="loading"/>
      <ValidationObserver v-else ref="form">
        <a-row :gutter="8">
          <a-col :xs="24" :md="12">
            <a-form-item label="Tên sản phẩm">
              <ValidationProvider name="Tên sản phẩm" rules="required|min:6" v-slot="{ errors }">
                <a-input v-model="form.name" placeholder="Nhập tên sản phẩm"/>
                <span v-if="errors.length">{{ errors[0] }}</span>
              </ValidationProvider>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item label="Giá sản phẩm">
              <ValidationProvider name="Giá sản phẩm" rules="required|min_value:0" v-slot="{ errors }">
                <a-input-number v-model="form.price" placeholder="Nhập giá sản phẩm" style="width: 100%;"/>
                <span v-if="errors.length">{{ errors[0] }}</span>
              </ValidationProvider>
            </a-form-item>
          </a-col>
          <a-col :xs="24">
            <a-form-item label="Mô tả sản phẩm">
              <ValidationProvider name="Mô tả sản phẩm" rules="required" v-slot="{ errors }">
                <a-textarea v-model="form.description" placeholder="Nhập mô tả sản phẩm" :rows="4"/>
                <span v-if="errors.length">{{ errors[0] }}</span>
              </ValidationProvider>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item label="Danh mục">
              <ValidationProvider name="Danh mục" rules="required" v-slot="{ errors }">
                <CategorySelector v-model="form.category_id" />
                <span v-if="errors.length">{{ errors[0] }}</span>
              </ValidationProvider>
            </a-form-item>
          </a-col>
          <a-col v-if="id" :xs="24" :md="12">
            <a-form-item label="Trạng thái">
              <ValidationProvider name="Trạng thái" v-slot="{ errors }">
                <EnumSelector v-model="form.status"
                              :enum-obj="CommonStatus"/>
                <span v-if="errors.length">{{ errors[0] }}</span>
              </ValidationProvider>
            </a-form-item>
          </a-col>
          <a-col :xs="24">
            <a-form-item label="Ảnh">
              <ValidationProvider name="Ảnh" rules="required" v-slot="{ errors }">
                <ImageUpload v-model="form.images"
                             folder="products"
                             :limit="5"/>
                <span v-if="errors.length">{{ errors[0] }}</span>
              </ValidationProvider>
            </a-form-item>
          </a-col>
        </a-row>
        <ProductOption v-if="!id"
                       :category-id="form.category_id"
                       v-model="form.options"
        />
      </ValidationObserver>
      <a-row :gutter="[8, 8]" type="flex">
        <a-col flex="auto">
          <a-button type="primary" icon="save" block @click="onSubmit">
            Lưu
          </a-button>
        </a-col>
        <a-col v-if="id" flex="1 2">
          <a-button icon="setting" block style="color: red;" @click="showModal">
            Quản lý tuỳ chọn
          </a-button>
          <a-modal v-model="visible"
                   :dialog-style="{ top: '20px' }"
                   title="Quản lý tuỳ chọn"
                   width="800px"
                   :footer="null"
          >
            <OptionTable :category-id="form.category_id"/>
          </a-modal>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import {store, detail, save} from "@/modules/products/service";
import {CommonMixin} from "@/services/mixins";
import EnumSelector from "@/components/selectors/EnumSelector";
import ImageUpload from "@/components/ImageUpload";
import {assignValuesToForm} from "@/services";
import ProductOption from "@/modules/products/Form/ProductOption";
import CategorySelector from "@/components/selectors/CategorySelector";
import OptionTable from "@/modules/products/Form/Option";

export default {
  components: {OptionTable, CategorySelector, ProductOption, EnumSelector, ImageUpload},
  mixins: [CommonMixin],
  data() {
    return {
      id: undefined,
      form: {
        name: '',
        price: undefined,
        description: '',
        category_id: undefined,
        status: undefined,
        thumbnail: '',
        images: [],
        options: [],
      },
      loading: true,
      visible: false,
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const formData = {
          ...this.form,
          images: this.form.images.length ? this.form.images.join(',') : undefined,
          thumbnail: this.form.images ? this.form.images[0] : undefined,
        }
        if (this.id) {
          await save(formData, this.id);
          this.$message.success('Sửa sản phẩm thành công');
        } else {
          await store(formData);
          this.$message.success('Thêm sản phẩm thành công');
        }
        await this.$router.push({name: 'productList'});
      } catch (e) {
        this.$message.error(e.response.data.message);
      }
    },
    showModal() {
      this.visible = true;
    }
  },
  async created() {
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      try {
        const {data} = await detail(this.id);
        this.form = assignValuesToForm(this.form, {
          ...data.data,
          images: data.data.images.split(','),
        });
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    } else {
      this.loading = false;
    }
  },
};
</script>

<style scoped>

</style>