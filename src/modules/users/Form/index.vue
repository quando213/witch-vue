<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="22" :md="20" :lg="16" :xl="14">
      <a-skeleton active v-if="this.loading"/>
      <a-form-model :model="form"
                    ref="ruleForm"
                    layout="vertical"
                    v-else
                    :rules="rules"
      >
        <a-row :gutter="8">
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Email" prop="email">
              <a-input v-model="form.email" placeholder="Nhập email"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Mật khẩu" prop="password">
              <a-input v-model="form.password" type="password" placeholder="Nhập mật khẩu"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Họ và tên">
              <a-input v-model="form.name" placeholder="Nhập họ và tên"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Ngày sinh">
              <a-date-picker
                  v-model="form.dob"
                  :disabled-date="(startValue) => startValue.valueOf() > new Date()"
                  type="date"
                  valueFormat="YYYY-MM-DD"
                  placeholder="Chọn ngày sinh"
                  style="width: 100%;"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :xs="24" :md="12" v-if="this.id">
            <a-form-model-item label="Trạng thái">
              <EnumSelector v-model="form.status"
                            :enum-obj="CommonStatus"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Ảnh đại diện">
              <ImageUpload v-model="form.avatar"
                           folder="avatars"
                           :limit="1"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item>
          <a-button type="primary" icon="save" block @click="onSubmit">
            Lưu
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-col>
  </a-row>
</template>

<script>
import {store, detail, save} from "@/modules/users/service";
import {CommonMixin} from "@/services/mixins";
import EnumSelector from "@/components/selectors/EnumSelector";
import ImageUpload from "@/components/ImageUpload";
import {assignValuesToForm} from "@/services";

export default {
  components: {EnumSelector, ImageUpload},
  mixins: [CommonMixin],
  data() {
    return {
      id: undefined,
      message: 'Thêm user thành công',
      form: {
        name: '',
        email: '',
        password: '',
        dob: undefined,
        status: undefined,
        avatar: [],
      },
      rules: {
        email: [
          {required: true, message: 'Vui lòng nhập email', trigger: 'change'},
          {type: 'email', message: 'Email không hợp lệ', trigger: 'change'},
        ],
        password: [
          {required: true, message: 'Vui lòng nhập email', trigger: 'change'},
          {min: 6, message: 'Mật khẩu cần dài tối thiểu 6 kí tự', trigger: 'change'}
        ],
      },
      loading: true,
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            const formData = {...this.form, avatar: this.form.avatar.length ? this.form.avatar[0] : undefined};
            if (this.id) {
              await save(formData, this.id);
            } else {
              await store(formData);
            }
            this.$message.success(this.message);
            await this.$router.push({name: 'userList'});
          } catch (e) {
            this.$message.error(e.response.data.message);
          }
        } else {
          return false;
        }
      });
    },
  },
  async created() {
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      this.message = 'Sửa user thành công';
      try {
        const {data} = await detail(this.id);
        this.form = assignValuesToForm(this.form, data.data);
        this.form.avatar = [this.form.avatar];
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    } else {
      this.loading = false;
    }
  }
};
</script>