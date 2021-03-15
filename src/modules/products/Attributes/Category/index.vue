<template>
  <div id="attribute-table">
    <a-button type="primary" icon="plus" id="add-button" @click="createItem">
      Thêm danh mục
    </a-button>
    <a-skeleton active v-if="!this.data"/>
    <a-table :columns="columns"
             :data-source="data"
             rowKey="id"
             :pagination="false"
             :scroll="{x: true}"
             v-else
    >
      <span slot="image" slot-scope="image"><a-avatar icon="user" :src="image"/></span>
      <span slot="size_id" slot-scope="size_id, item"
            :style="{color: !!size_id ? 'green' : 'red'}">{{ !!size_id ? item.size.name : 'Không có' }}</span>
      <span slot="action" slot-scope="action, item">
        <a-button icon="edit" size="small" @click="updateItem(item)"></a-button>
        <a-divider type="vertical"/>
        <a-popconfirm
            :title="`Bạn chắc chắn muốn xoá danh mục ${item.name}?`"
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
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Tên" prop="name">
              <a-input v-model="form.name" placeholder="Nhập tên danh mục"/>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Danh mục cha" extra="Nếu tạo danh mục cha thì không chọn">
              <CategorySelector v-model="form.parent_id" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Nhóm kích cỡ">
              <SizeSelector v-model="form.size_id" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-model-item label="Thứ tự">
              <a-input-number v-model="form.sort_number" style="width: 100%;" placeholder="Nhập thứ tự"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="24">
            <a-form-model-item label="Icon">
              <ImageUpload v-model="form.icon"
                           folder="categories"
                           :limit="1"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import {list, save, store, deleteOne} from "@/modules/products/Attributes/Category/service";
import ImageUpload from "@/components/ImageUpload";
import {assignValuesToForm} from "@/services";
import SizeSelector from "@/components/selectors/SizeSelector";
import CategorySelector from "@/components/selectors/CategorySelector";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Ảnh',
    dataIndex: 'icon_url',
    align: 'center',
    scopedSlots: {customRender: 'image'},
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
  },
  {
    title: 'Nhóm kích cỡ',
    dataIndex: 'size_id',
    scopedSlots: {customRender: 'size_id'},
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
  components: {CategorySelector, SizeSelector, ImageUpload},
  data() {
    return {
      data: undefined,
      sizes: [],
      columns,
      visible: false,
      id: undefined,
      title: '',
      form: {
        name: '',
        parent_id: undefined,
        size_id: undefined,
        sort_number: undefined,
        icon: [],
      },
      rules: {
        name: [
          {required: true, message: 'Vui lòng nhập tên', trigger: 'change'},
        ],
      },
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    async updateData() {
      try {
        const {data} = await list();
        this.data = data.data;
      } catch (e) {
        console.log(e);
      }
    },
    createItem() {
      this.id = undefined;
      this.title = 'Thêm danh mục';
      this.visible = true;
    },
    updateItem(item) {
      this.id = item.id;
      this.form = assignValuesToForm(this.form, {
        ...item,
        parent_id: item.parent_id || undefined,
        size_id: item.size_id || undefined,
        icon: item.icon ? [item.icon] : undefined,
      });
      this.title = 'Chỉnh sửa danh mục';
      this.visible = true;
    },
    async deleteItem(item) {
      try {
        await deleteOne(item.id);
        this.$message.success('Xoá danh mục thành công');
        await this.updateData();
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            const formData = {
              ...this.form,
              icon: this.form.icon ? this.form.icon[0] : undefined,
            }
            if (this.id) {
              await save(formData, this.id);
              this.$message.success('Sửa danh mục thành công');
            } else {
              await store(formData);
              this.$message.success('Thêm danh mục thành công');
            }
            await this.updateData();
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
        parent_id: undefined,
        size_id: undefined,
        sort_number: undefined,
        icon: [],
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