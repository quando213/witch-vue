<template>
  <div>
    <a-row id="filter" :gutter="[8,8]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-input v-model="params.search" placeholder="Tìm kiếm">
          <a-icon slot="prefix" type="search"/>
        </a-input>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <EnumSelector v-model="params.status"
                      :enum-obj="CommonStatus"
                      placeholder="Lọc theo trạng thái"/>
      </a-col>
    </a-row>
    <a-skeleton active v-if="!this.data" />
    <a-table :columns="columns"
             :data-source="data"
             rowKey="id"
             :pagination="false"
             :scroll="{x: true}"
             @change="list"
    v-else>
      <span slot="avatar" slot-scope="image"><a-avatar icon="user" :src="image"/></span>
      <span slot="name" slot-scope="text">{{ text }}</span>
      <span slot="customTitle">Name</span>
      <span slot="statusTitle" slot-scope="status, item"
            :style="{color: status === CommonStatus.ACTIVE ? 'green' : 'red'}">{{ item.status_title }}</span>
      <span slot="action" slot-scope="action, item">
        <a-button icon="edit" size="small" @click="updateItem(item.id)"></a-button>
        <a-divider type="vertical"/>
        <a-popconfirm
            :title="`Bạn chắc chắn muốn xoá user ${item.name}?`"
            ok-text="OK"
            cancel-text="Huỷ"
            @confirm="deleteItem(item.id)"
        >
          <a-button icon="delete" size="small" type="danger"></a-button>
        </a-popconfirm>
      </span>
    </a-table>
    <CustomPagination v-model="meta" @change="onChangePage"/>
  </div>
</template>

<script>
import {list, deleteOne} from "@/modules/users/service";
import {CommonMixin} from "@/services/mixins";
import {params} from "@/modules/users/params";
import {debounce} from 'lodash'
import EnumSelector from "@/components/selectors/EnumSelector";
import CustomPagination from "@/components/CustomPagination";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Ảnh đại diện',
    dataIndex: 'avatar_url',
    align: 'center',
    scopedSlots: {customRender: 'avatar'},
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: {customRender: 'statusTitle'},
  },
  {
    title: 'Action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  components: {CustomPagination, EnumSelector},
  mixins: [CommonMixin],
  data() {
    return {
      data: undefined,
      columns,
      meta: {
        current_page: 1,
        limit: 10
      },
      params: params,
    };
  },
  created() {
    this.list(this.params);
  },
  methods: {
    async list(params) {
      try {
        const {data} = await list(params);
        this.data = data.data;
        this.meta = data.meta;
      } catch (e) {
        console.log(e);
      }
    },
    onChangePage({page, limit}) {
      this.list({
        ...this.params,
        page,
        limit
      })
    },
    handleChangeParams: debounce(function (val) {
      this.list({...val, page: 1})
    }, 300),
    updateItem(id) {
      this.$router.push({name: `userUpdate`, params: {id: id}});
    },
    async deleteItem(id) {
      try {
        await deleteOne(id);
        this.data = this.data.filter(item => item.id !== id);
        this.$message.success('Xoá user thành công');
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    params: {
      deep: true,
      handler: function (val) {
        this.handleChangeParams(val);
      }
    }
  }
}
</script>

<style scoped>
.ant-table td {
  white-space: nowrap;
}
</style>