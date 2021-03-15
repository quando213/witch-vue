<template>
  <div>
    <div style="margin-bottom: 10px;">
      <a-row :gutter="[8,8]">
      <a-col :xs="24" :md="8" :lg="6">
        <SizeSelector v-model="params.size_id"
                      :category-id="categoryId"
        />
      </a-col>
      <a-col :xs="24" :md="8" :lg="6">
        <ColorSelector v-model="params.color_id" />
      </a-col>
    </a-row>
    </div>
    <a-skeleton v-if="!data"></a-skeleton>
    <a-table :columns="columns"
             :data-source="data"
             rowKey="id"
             :pagination="false"
             v-else
             bordered>
      <template slot="size_id" slot-scope="val, record">
        <SizeSelector v-if="record.id === editingId"
                      v-model="editingTarget.size_id"
                      :category-id="categoryId"
        />
        <template v-else>
          {{ record.size.name }}
        </template>
      </template>
      <template slot="color_id" slot-scope="val, record">
        <ColorSelector v-if="record.id === editingId"
                       v-model="editingTarget.color_id"
        />
        <template v-else>
          <span class="color-circle" :style="{backgroundColor: record.color.code}"></span>
        </template>
      </template>
      <template slot="quantity" slot-scope="val, record">
        <a-input-number
            v-if="record.id === editingId"
            style="margin: -5px 0"
            v-model="editingTarget.quantity"
        />
        <template v-else>
          {{ val }}
        </template>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
        <span v-if="record.id === editingId">
          <a @click="() => save()">Lưu</a>
          <a-popconfirm title="Bạn có chắc chắn muốn huỷ chỉnh sửa?" @confirm="() => cancel()">
            <a>Huỷ</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a-button icon="edit" size="small" :disabled="!!editingId"
                    @click="() => edit(record.id)">Sửa</a-button>
            <a-divider type="vertical"/>
          <a-popconfirm
                :title="`Bạn chắc chắn muốn xoá?`"
                ok-text="OK"
                cancel-text="Huỷ"
                @confirm="deleteRow(record.id)"
          >
          <a-button icon="delete" size="small" type="danger" :disabled="!!(editingId)">Xoá</a-button>
        </a-popconfirm>
        </span>
        </div>
      </template>
    </a-table>
    <a-button style="margin: 20px 0 40px;" @click="add">
      <a-icon type="plus"/>
      Thêm tuỳ chọn
    </a-button>
  </div>
</template>

<script>
import {list, store, save, deleteOne} from "@/modules/products/Form/Option/service";
import SizeSelector from "@/components/selectors/SizeSelector";
import ColorSelector from "@/components/selectors/ColorSelector";
import {params} from "@/modules/products/Form/Option/params";

const columns = [
  {
    title: 'Kích cỡ',
    dataIndex: 'size_id',
    scopedSlots: {customRender: 'size_id'},
  },
  {
    title: 'Màu',
    dataIndex: 'color_id',
    scopedSlots: {customRender: 'color_id'},
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    scopedSlots: {customRender: 'quantity'},
  },
  {
    title: 'Thao tác',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
  },
];

export default {
  name: 'OptionTable',
  components: {ColorSelector, SizeSelector},
  props: {
    categoryId: Number,
  },
  data() {
    return {
      data: undefined,
      columns,
      editingId: undefined,
      editingTarget: undefined,
      productId: Number(this.$router.currentRoute.params.id),
      params: params,
    };
  },
  created() {
    this.list(params);
  },
  methods: {
    async list(params) {
      const {data} = await list({...params, product_id: this.productId});
      this.data = data.data;
    },
    edit(id) {
      this.editingId = id;
      this.editingTarget = {...this.data.filter(item => item.id === id)[0]};
    },
    async save() {
      try {
        if (this.editingId === -1) {
          const {data} = await store(this.editingTarget);
          this.data = this.data.map(item => item.id === this.editingId ? data.data : item);
        } else {
          const {data} = await save(this.editingTarget, this.editingId);
          this.data = this.data.map(item => item.id === this.editingId ? data.data : item);
        }
        this.editingId = undefined;
        this.editingTarget = undefined;
      } catch (e) {
        console.log(e);
      }
    },
    cancel() {
      if (this.editingId === -1) {
        this.data.slice(-1, 1);
      }
      this.editingId = undefined;
      this.editingTarget = undefined;
    },
    add() {
      this.editingTarget = {
        id: -1,
        product_id: this.productId,
        size_id: undefined,
        color_id: undefined,
        quantity: undefined,
      };
      this.editingId = -1;
      this.data.push(this.editingTarget);
    },
    async deleteRow(id) {
      try {
        await deleteOne(id);
        this.data = this.data.filter(item => item.id !== id);
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    params: {
      deep: true,
      handler: function (val) {
        this.list(val);
      }
    }
  },
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>