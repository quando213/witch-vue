<template>
  <div style="background:#ECECEC; padding:30px">
    <a-card title="Đăng nhập" :bordered="false">
      <a-row type="flex" justify="center">
        <a-col :xs="24" :md="12" :lg="6">
          <a-form-model layout="vertical" :model="form" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item>
              <a-input v-model="form.email" placeholder="Email">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input v-model="form.password" type="password" placeholder="Mật khẩu">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                  type="primary"
                  html-type="submit"
                  block
                  :disabled="form.email === '' || form.password === ''"
              >
                Đăng nhập
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import {authenticate} from "@/modules/auth/service";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const {data} = await authenticate(this.form);
      if (data.status === 1) {
        localStorage.setItem('token', data.data.token);
        this.$router.push({name: 'home'});
      } else {
        this.$message.error(data.message);
      }
    },
  },
};
</script>