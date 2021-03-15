<template>
  <div id="attribute-table">
    <a-button type="primary" icon="plus" id="add-button" @click="createItem">
      Thêm màu
    </a-button>
    <a-skeleton active v-if="!this.data"/>
    <a-table :columns="columns"
             :data-source="data"
             rowKey="id"
             :pagination="false"
             :scroll="{x: true}"
             v-else
    >
      <span slot="code" slot-scope="code" :style="{color: code}">{{ code }}</span>
      <span slot="action" slot-scope="action, item">
        <a-button icon="edit" size="small" @click="updateItem(item)"></a-button>
        <a-divider type="vertical"/>
        <a-popconfirm
            :title="`Bạn chắc chắn muốn xoá màu ${item.name}?`"
            ok-text="OK"
            cancel-text="Huỷ"
            @confirm="deleteItem(item)"
        >
          <a-button icon="delete" size="small" type="danger"></a-button>
        </a-popconfirm>
      </span>
    </a-table>
    <a-modal v-model="visible"
             :title="this.title"
             ok-text="Lưu"
             @ok="onSubmit"
             :after-close="resetForm"
    >
      <a-skeleton active v-if="!this.data"/>
      <a-form-model :model="form"
                    ref="ruleForm"
                    layout="vertical"
                    v-else
                    :rules="rules"
      >
        <a-row :gutter="8">
          <a-col :span="24">
            <a-form-model-item label="Tên" prop="name">
              <a-input v-model="form.name" placeholder="Nhập tên màu"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Mã màu" prop="code">
              <a-input v-model="form.code" type="color" placeholder="Nhập mã màu"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Thứ tự">
              <a-input-number v-model="form.sort_number" style="width: 100%;" placeholder="Nhập thứ tự"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import {list, save, store, deleteOne} from "@/modules/products/Attributes/Color/service";
import {assignValuesToForm} from "@/services";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Tên màu',
    dataIndex: 'name',
  },
  {
    title: 'Mã màu',
    dataIndex: 'code',
    scopedSlots: {customRender: 'code'},
  },
  {
    title: 'Thứ tự',
    dataIndex: 'sort_number',
  },
  {
    title: 'Action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  data() {
    return {
      data: undefined,
      columns,
      visible: false,
      id: undefined,
      title: '',
      form: {
        name: '',
        code: '#000000',
        sort_number: undefined,
      },
      rules: {
        name: [
          {required: true, message: 'Vui lòng nhập tên', trigger: 'change'},
        ],
        code: [
          {required: true, message: 'Vui lòng nhập mã màu', trigger: 'change'},
        ],
      },
    };
  },
  async created() {
    try {
      const {data} = await list();
      this.data = data.data;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    createItem() {
      this.id = undefined;
      this.title = 'Thêm màu';
      this.visible = true;
    },
    updateItem(item) {
      this.id = item.id;
      this.form = assignValuesToForm(this.form, item);
      this.title = 'Chỉnh sửa màu';
      this.visible = true;
    },
    async deleteItem(item) {
      try {
        await deleteOne(item.id);
        this.data = this.data.filter(row => row.id !== item.id);
        this.$message.success('Xoá màu thành công');
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            if (this.id) {
              const {data} = await save(this.form, this.id);
              this.data = this.data.map(item => item.id === data.data.id ? data.data : item);
              this.$message.success('Sửa màu thành công');
            } else {
              const {data} = await store(this.form);
              this.data.push(data.data);
              this.$message.success('Thêm màu thành công');
            }
            this.visible = false;
          } catch (e) {
            this.$message.error(e.response.data.message);
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.form = {
        name: '',
        code: undefined,
        sort_number: undefined,
      };
    },
  },
}
</script>

<style scoped>
.ant-table td {
  white-space: nowrap;
}

#attribute-table {
  margin: 30px 0;
  text-align: right;
}

#add-button {
  margin-bottom: 10px;
}
</style>