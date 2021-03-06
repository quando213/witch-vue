<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="Email">
      <a-input v-model="form.email" placeholder="Nhập email" />
    </a-form-model-item>
    <a-form-model-item label="Mật khẩu">
      <a-input v-model="form.password" type="password" placeholder="Nhập mật khẩu" />
    </a-form-model-item>
    <a-form-model-item label="Họ và tên">
      <a-input v-model="form.name" placeholder="Nhập họ và tên" />
    </a-form-model-item>
    <a-form-model-item label="Ngày sinh">
      <a-date-picker
          v-model="form.dob"
          :disabled-date="(startValue) => startValue.valueOf() > new Date()"
          type="date"
          placeholder="Chọn ngày sinh"
          style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" icon="save" @click="store">
        Lưu
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from "@/modules/users/service";

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        email: '',
        password: '',
        dob: undefined,
      },
    };
  },
  methods: {
    async store() {
      try {
        console.log(this.form);
        // const {data} = await store(this.form);
        // console.log(data);
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>